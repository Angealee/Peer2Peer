"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./create.module.css";
import { api, Section, Evaluation } from "@/lib/api-client";

interface ScoreOption { value: number; label: string; }
interface CriterionDef { name: string; scoreOptions: ScoreOption[]; }

const DEFAULT_SCORE_OPTIONS: ScoreOption[] = [
  { value: 1, label: "Poor" },
  { value: 2, label: "Fair" },
  { value: 3, label: "Good" },
  { value: 4, label: "Great" },
  { value: 5, label: "Excellent" },
];

export default function CreateEvaluationPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [criteria, setCriteria] = useState<CriterionDef[]>([
    { name: "", scoreOptions: [...DEFAULT_SCORE_OPTIONS] },
    { name: "", scoreOptions: [...DEFAULT_SCORE_OPTIONS] },
    { name: "", scoreOptions: [...DEFAULT_SCORE_OPTIONS] },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [expandedCriterion, setExpandedCriterion] = useState<number | null>(null);

  const [sections, setSections] = useState<Section[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [sectionsLoading, setSectionsLoading] = useState(true);
  const [evalsLoading, setEvalsLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api.sections.list().then(setSections).catch(() => {}).finally(() => setSectionsLoading(false));
    api.evaluations.list().then(setEvaluations).catch(() => {}).finally(() => setEvalsLoading(false));
  }, []);

  // ── Criterion handlers ─────────────────────────────────────────────────────
  const addCriterion = () => setCriteria((p) => [...p, { name: "", scoreOptions: [...DEFAULT_SCORE_OPTIONS] }]);
  const removeCriterion = (i: number) => setCriteria((p) => p.filter((_, idx) => idx !== i));
  const changeCriterionName = (i: number, v: string) =>
    setCriteria((p) => p.map((c, idx) => idx === i ? { ...c, name: v } : c));

  // ── Score option handlers ─────────────────────────────────────────────────
  const addScoreOption = (ci: number) =>
    setCriteria((p) => p.map((c, idx) => {
      if (idx !== ci) return c;
      const maxVal = c.scoreOptions.length > 0 ? Math.max(...c.scoreOptions.map((o) => o.value)) : 0;
      return { ...c, scoreOptions: [...c.scoreOptions, { value: maxVal + 1, label: "" }] };
    }));

  const removeScoreOption = (ci: number, si: number) =>
    setCriteria((p) => p.map((c, idx) =>
      idx !== ci ? c : { ...c, scoreOptions: c.scoreOptions.filter((_, i) => i !== si) }
    ));

  const changeScoreOption = (ci: number, si: number, field: "value" | "label", val: string) =>
    setCriteria((p) => p.map((c, idx) =>
      idx !== ci ? c : {
        ...c,
        scoreOptions: c.scoreOptions.map((o, i) =>
          i !== si ? o : { ...o, [field]: field === "value" ? Number(val) : val }
        ),
      }
    ));

  // ── Reset form ─────────────────────────────────────────────────────────────
  const resetForm = () => {
    setTitle(""); setDescription(""); setSelectedSectionId("");
    setDeadline(""); setAnonymous(true);
    setCriteria([
      { name: "", scoreOptions: [...DEFAULT_SCORE_OPTIONS] },
      { name: "", scoreOptions: [...DEFAULT_SCORE_OPTIONS] },
      { name: "", scoreOptions: [...DEFAULT_SCORE_OPTIONS] },
    ]);
    setEditingId(null); setError(""); setSuccess(""); setExpandedCriterion(null);
  };

  // ── Load eval into form ────────────────────────────────────────────────────
  const handleEdit = (ev: Evaluation) => {
    setEditingId(ev.id);
    setTitle(ev.title);
    setDescription(ev.description ?? "");
    setSelectedSectionId(String(ev.sectionId));
    setDeadline(ev.deadline ? String(ev.deadline).slice(0, 16) : "");
    setAnonymous(ev.anonymous ?? true);
    setCriteria(
      ev.criteria?.length
        ? ev.criteria.map((c: any) => ({
            name: c.criterionName ?? c.name ?? c,
            scoreOptions: c.scoreOptions
              ? (typeof c.scoreOptions === "string" ? JSON.parse(c.scoreOptions) : c.scoreOptions)
              : [...DEFAULT_SCORE_OPTIONS],
          }))
        : [{ name: "", scoreOptions: [...DEFAULT_SCORE_OPTIONS] }]
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
    setError(""); setSuccess(""); setExpandedCriterion(null);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const cleanCriteria = criteria
      .filter((c) => c.name.trim())
      .map((c) => ({ name: c.name.trim(), scoreOptions: c.scoreOptions }));
    if (!title.trim()) { setError("Title is required."); return; }
    if (!selectedSectionId) { setError("Please select a section."); return; }
    if (cleanCriteria.length === 0) { setError("Add at least one criterion."); return; }
    for (const c of cleanCriteria) {
      if (c.scoreOptions.length < 2) { setError(`"${c.name}" needs at least 2 score options.`); return; }
    }

    setLoading(true);
    try {
      const payload = {
        title: title.trim(), description: description.trim(),
        sectionId: Number(selectedSectionId),
        deadline: deadline || undefined, anonymous,
        criteria: cleanCriteria.map((c) => c.name),
        scoreOptions: cleanCriteria.map((c) => c.scoreOptions),
      };

      if (editingId) {
        await fetch(`/api/evaluations/${editingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        });
        setEvaluations((prev) =>
          prev.map((ev) => ev.id === editingId
            ? { ...ev, title: title.trim(), description: description.trim() }
            : ev
          )
        );
        setSuccess("✅ Evaluation updated!");
      } else {
        const created = await api.evaluations.create(payload as any);
        setEvaluations((prev) => [created, ...prev]);
        setSuccess("✅ Evaluation created!");
      }
      resetForm();
    } catch (err: any) {
      setError(err.message ?? "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await fetch(`/api/evaluations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEvaluations((prev) => prev.filter((ev) => ev.id !== id));
      if (editingId === id) resetForm();
    } catch { alert("Failed to delete."); }
    finally { setDeletingId(null); setConfirmId(null); }
  };

  const selectedSection = sections.find((s) => s.id === Number(selectedSectionId));
  const getSectionName = (id: number) => sections.find((s) => s.id === id)?.name ?? `Section #${id}`;

  return (
    <div className={styles.container}>

      {/* Confirm delete modal */}
      {confirmId !== null && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
        }}>
          <div style={{
            background: "white", borderRadius: "14px", padding: "2rem",
            maxWidth: "400px", width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⚠️</div>
            <h3 style={{ fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}>Delete Evaluation?</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              This will permanently delete the evaluation and all responses. This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button onClick={() => setConfirmId(null)} style={{
                padding: "8px 18px", borderRadius: "8px", border: "1px solid #e2e8f0",
                background: "white", cursor: "pointer", fontWeight: 600,
              }}>Cancel</button>
              <button onClick={() => handleDelete(confirmId!)} disabled={deletingId === confirmId} style={{
                padding: "8px 18px", borderRadius: "8px", border: "none",
                background: "#ef4444", color: "white", cursor: "pointer", fontWeight: 600,
              }}>
                {deletingId === confirmId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Existing Evaluations ── */}
      <div>
        <h2 style={{
          fontSize: "2rem", fontWeight: 700, color: "#fdfdfd",
          marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px",
        }}>
          Existing Evaluations
          <span style={{ fontSize: "0.8rem", fontWeight: 400, color: "#94a3b8" }}>
            ({evaluations.length})
          </span>
        </h2>

        {evalsLoading ? (
          <p style={{ color: "#94a3b8" }}>Loading...</p>
        ) : evaluations.length === 0 ? (
          <div style={{
            background: "white", borderRadius: "12px", padding: "2rem",
            textAlign: "center", color: "#94a3b8", border: "1px solid #e2e8f0",
          }}>No evaluations yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {evaluations.map((ev) => (
              <div key={ev.id} style={{
                background: "white", borderRadius: "12px", padding: "1.1rem 1.4rem",
                border: editingId === ev.id ? "2px solid rgb(29,207,216)" : "1px solid #e2e8f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                display: "flex", alignItems: "center",
                justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem",
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>
                    {ev.title}
                  </div>
                  <div style={{
                    fontSize: "0.78rem", color: "#64748b", marginTop: "4px",
                    display: "flex", gap: "12px", flexWrap: "wrap",
                  }}>
                    <span>📁 {getSectionName(ev.sectionId)}</span>
                    {ev.deadline && <span>📅 {new Date(ev.deadline).toLocaleDateString()}</span>}
                    <span>{ev.anonymous ? "🔒 Anonymous" : "👁 Not Anonymous"}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => handleEdit(ev)} style={{
                    padding: "6px 14px", borderRadius: "7px",
                    border: "1px solid rgb(29,207,216)", background: "white",
                    color: "rgb(20,184,166)", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer",
                  }}>✏️ Edit</button>
                  <button onClick={() => setConfirmId(ev.id)} disabled={deletingId === ev.id} style={{
                    padding: "6px 14px", borderRadius: "7px",
                    border: "1px solid #fca5a5", background: "white",
                    color: "#ef4444", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer",
                  }}>
                    {deletingId === ev.id ? "..." : "🗑 Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <h1 className={styles.title}>{editingId ? "✏️ Edit Evaluation" : "Create New Evaluation"}</h1>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className={styles.form}>

        {editingId && (
          <div style={{
            background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "8px",
            padding: "10px 14px", fontSize: "0.85rem", color: "#92400e", marginBottom: "1rem",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span>✏️ Editing — section cannot be changed  <strong>Saving will delete all existing student responses.</strong></span>
            <button type="button" onClick={resetForm} style={{
              background: "none", border: "none", cursor: "pointer", color: "#92400e", fontWeight: 700,
            }}>✕ Cancel</button>
          </div>
        )}

        <div className={styles.formGroup}>
          <label>Evaluation Title</label>
          <input type="text" placeholder="e.g. Midterm Peer Evaluation"
            value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading} required />
        </div>

        <div className={styles.formGroup}>
          <label>Description <span style={{ fontWeight: 400, fontSize: "0.8rem", color: "#94a3b8", textTransform: "none" }}>(optional)</span></label>
          <input type="text" placeholder="Brief description"
            value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} />
        </div>

        <div className={styles.formGroup}>
          <label>Select Section</label>
          {editingId ? (
            <div style={{
              padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e2e8f0",
              background: "#f8fafc", fontSize: "0.93rem", color: "#64748b",
            }}>
              📁 {getSectionName(Number(selectedSectionId))}
              <span style={{ marginLeft: "8px", fontSize: "0.75rem", color: "#94a3b8" }}>
                (cannot be changed while editing)
              </span>
            </div>
          ) : (
            <select value={selectedSectionId} onChange={(e) => setSelectedSectionId(e.target.value)}
              disabled={loading || sectionsLoading} required>
              <option value="">{sectionsLoading ? "Loading..." : "— Select a Section —"}</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s._count?.students ?? 0} students)</option>
              ))}
            </select>
          )}
          {selectedSection && !editingId && (
            <span style={{
              marginTop: "8px", display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(29,207,216,0.1)", border: "1px solid rgba(29,207,216,0.3)",
              borderRadius: "99px", padding: "3px 12px", fontSize: "0.8rem",
              color: "rgb(20,184,166)", fontWeight: 600, width: "fit-content",
            }}>
              👥 {selectedSection._count?.students ?? 0} students will be evaluated
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Deadline <span style={{ fontWeight: 400, fontSize: "0.8rem", color: "#94a3b8", textTransform: "none" }}>(optional)</span></label>
          <input type="datetime-local" value={deadline}
            onChange={(e) => setDeadline(e.target.value)} disabled={loading} />
        </div>

        <div className={styles.checkboxGroup}>
          <input type="checkbox" id="anonymous" checked={anonymous}
            onChange={() => setAnonymous((p) => !p)} disabled={loading} />
          <label htmlFor="anonymous">Anonymous Evaluation</label>
        </div>

        {/* ── Criteria with custom score options ── */}
        <div className={styles.criteriaSection}>
          <label>Evaluation Criteria</label>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "12px", marginTop: "-4px" }}>
            Each criterion can have its own custom scoring scale. Click "⚙ Score Options" to customize.
          </p>

          {criteria.map((criterion, ci) => (
            <div key={ci} style={{
              border: "1.5px solid #e2e8f0", borderRadius: "10px",
              marginBottom: "10px", overflow: "hidden",
              background: expandedCriterion === ci ? "#fafcff" : "white",
            }}>
              {/* Criterion name row */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center", padding: "10px 12px" }}>
                <input
                  type="text"
                  placeholder={`Criterion ${ci + 1} (e.g. Teamwork)`}
                  value={criterion.name}
                  onChange={(e) => changeCriterionName(ci, e.target.value)}
                  disabled={loading}
                  style={{
                    flex: 1, padding: "8px 12px", borderRadius: "7px",
                    border: "1.5px solid #e2e8f0", fontSize: "0.9rem", outline: "none",
                    color: "#111827",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setExpandedCriterion(expandedCriterion === ci ? null : ci)}
                  style={{
                    padding: "7px 12px", borderRadius: "7px", fontSize: "0.78rem",
                    fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                    border: expandedCriterion === ci ? "1px solid #2563eb" : "1px solid #e2e8f0",
                    background: expandedCriterion === ci ? "#eff6ff" : "#f8fafc",
                    color: expandedCriterion === ci ? "#2563eb" : "#64748b",
                  }}
                >
                  ⚙ Score Options ({criterion.scoreOptions.length})
                </button>
                {criteria.length > 1 && (
                  <button type="button" onClick={() => removeCriterion(ci)}
                    className={styles.removeBtn} disabled={loading}>Remove</button>
                )}
              </div>

              {/* Score options panel */}
              {expandedCriterion === ci && (
                <div style={{
                  borderTop: "1px solid #e2e8f0", padding: "14px 12px",
                  background: "#f8faff",
                }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Score Options — students will see these as buttons
                  </div>

                  {/* Preview */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                    {criterion.scoreOptions.map((opt, si) => (
                      <div key={si} style={{
                        background: "#eff6ff", border: "1.5px solid #2563eb",
                        borderRadius: "8px", padding: "4px 10px",
                        fontSize: "12px", fontWeight: 700, color: "#2563eb",
                        display: "flex", alignItems: "center", gap: "4px",
                      }}>
                        {opt.value}{opt.label ? ` · ${opt.label}` : ""}
                      </div>
                    ))}
                  </div>

                  {/* Edit each option */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {criterion.scoreOptions.map((opt, si) => (
                      <div key={si} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <input
                          type="number"
                          value={opt.value}
                          onChange={(e) => changeScoreOption(ci, si, "value", e.target.value)}
                          style={{
                            width: "60px", padding: "6px 8px", borderRadius: "6px",
                            border: "1px solid #e2e8f0", fontSize: "13px", textAlign: "center",
                          }}
                          placeholder="Val"
                        />
                        <input
                          type="text"
                          value={opt.label}
                          onChange={(e) => changeScoreOption(ci, si, "label", e.target.value)}
                          style={{
                            flex: 1, padding: "6px 10px", borderRadius: "6px",
                            border: "1px solid #e2e8f0", fontSize: "13px",
                          }}
                          placeholder="Label (e.g. Poor, Good, Excellent)"
                        />
                        <button type="button" onClick={() => removeScoreOption(ci, si)}
                          disabled={criterion.scoreOptions.length <= 2}
                          style={{
                            padding: "5px 10px", borderRadius: "6px",
                            border: "1px solid #fca5a5", background: "white",
                            color: "#ef4444", fontSize: "12px", cursor: "pointer",
                          }}>✕</button>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                    <button type="button" onClick={() => addScoreOption(ci)} style={{
                      padding: "6px 14px", borderRadius: "6px", border: "1px solid #e2e8f0",
                      background: "white", color: "#374151", fontSize: "12px",
                      fontWeight: 600, cursor: "pointer",
                    }}>+ Add Option</button>
                    <button type="button" onClick={() =>
                      setCriteria((p) => p.map((c, idx) =>
                        idx !== ci ? c : { ...c, scoreOptions: [...DEFAULT_SCORE_OPTIONS] }
                      ))
                    } style={{
                      padding: "6px 14px", borderRadius: "6px", border: "1px solid #e2e8f0",
                      background: "white", color: "#94a3b8", fontSize: "12px", cursor: "pointer",
                    }}>↺ Reset to 1–5</button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button type="button" onClick={addCriterion} className={styles.addBtn} disabled={loading}>
            + Add Criterion
          </button>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}
        {success && <p className={styles.successText}>{success}</p>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Saving..." : editingId ? "Save Changes" : "Create Evaluation"}
        </button>
      </form>
    </div>
  );
}