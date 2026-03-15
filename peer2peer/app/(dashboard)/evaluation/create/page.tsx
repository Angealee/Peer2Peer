"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./create.module.css";
import { api, Section, Evaluation } from "@/lib/api-client";

export default function CreateEvaluationPage() {
  const router = useRouter();

  // ── Form state ────────────────────────────────────
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSectionIds, setSelectedSectionIds] = useState<number[]>([]);
  const [deadline, setDeadline] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [criteria, setCriteria] = useState<string[]>(["", "", ""]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // ── Data ──────────────────────────────────────────
  const [sections, setSections] = useState<Section[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [sectionsLoading, setSectionsLoading] = useState(true);
  const [evalsLoading, setEvalsLoading] = useState(true);

  // ── UI state ──────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ── Load data ─────────────────────────────────────
  useEffect(() => {
    api.sections.list()
      .then(setSections).catch(() => {})
      .finally(() => setSectionsLoading(false));
    api.evaluations.list()
      .then(setEvaluations).catch(() => {})
      .finally(() => setEvalsLoading(false));
  }, []);

  // ── Section checkbox toggle ───────────────────────
  const toggleSection = (id: number) => {
    if (editingId) return; // can't change section while editing
    setSelectedSectionIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectAllSections = () => {
    if (editingId) return;
    setSelectedSectionIds(sections.map((s) => s.id));
  };

  const clearAllSections = () => {
    if (editingId) return;
    setSelectedSectionIds([]);
  };

  // ── Criteria helpers ──────────────────────────────
  const addCriteria = () => setCriteria((p) => [...p, ""]);
  const removeCriteria = (i: number) => setCriteria((p) => p.filter((_, idx) => idx !== i));
  const changeCriteria = (i: number, v: string) =>
    setCriteria((p) => p.map((c, idx) => (idx === i ? v : c)));

  // ── Reset form ────────────────────────────────────
  const resetForm = () => {
    setTitle(""); setDescription(""); setSelectedSectionIds([]);
    setDeadline(""); setAnonymous(true); setCriteria(["", "", ""]);
    setEditingId(null); setError(""); setSuccess("");
  };

  // ── Load eval into form for editing ──────────────
  const handleEdit = (ev: Evaluation) => {
    setEditingId(ev.id);
    setTitle(ev.title);
    setDescription(ev.description ?? "");
    setSelectedSectionIds([ev.sectionId]); // single section in edit mode
    setDeadline(ev.deadline ? String(ev.deadline).slice(0, 16) : "");
    setAnonymous(ev.anonymous ?? true);
    setCriteria(
      ev.criteria?.length
        ? ev.criteria.map((c: any) => c.criterionName ?? c.name ?? c)
        : ["", ""]
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
    setError(""); setSuccess("");
  };

  // ── Submit ────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const clean = criteria.map((c) => c.trim()).filter(Boolean);
    if (!title.trim()) { setError("Title is required."); return; }
    if (selectedSectionIds.length === 0) { setError("Please select at least one section."); return; }
    if (clean.length === 0) { setError("Add at least one criterion."); return; }

    setLoading(true);
    try {
      if (editingId) {
        // Update single evaluation
        await fetch(`/api/evaluations/${editingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: title.trim(), description: description.trim(),
            deadline: deadline || undefined, anonymous, criteria: clean,
          }),
        });
        setEvaluations((prev) =>
          prev.map((ev) => ev.id === editingId
            ? { ...ev, title: title.trim(), description: description.trim() }
            : ev
          )
        );
        setSuccess("✅ Evaluation updated!");
        resetForm();
      } else {
        // Create one evaluation per selected section
        const created = await Promise.all(
          selectedSectionIds.map((sectionId) =>
            api.evaluations.create({
              title: title.trim(),
              description: description.trim(),
              sectionId,
              deadline: deadline || undefined,
              anonymous,
              criteria: clean,
            })
          )
        );
        setEvaluations((prev) => [...created, ...prev]);
        setSuccess(
          selectedSectionIds.length === 1
            ? `✅ Evaluation created for ${sections.find((s) => s.id === selectedSectionIds[0])?.name}!`
            : `✅ ${selectedSectionIds.length} evaluations created across ${selectedSectionIds.length} sections!`
        );
        resetForm();
      }
    } catch (err: any) {
      setError(err.message ?? "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  // ── Delete ────────────────────────────────────────
  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await fetch(`/api/evaluations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEvaluations((prev) => prev.filter((ev) => ev.id !== id));
      if (editingId === id) resetForm();
    } catch {
      alert("Failed to delete.");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  const getSectionName = (id: number) => sections.find((s) => s.id === id)?.name ?? `Section #${id}`;

  return (
    <div className={styles.container}>

      {/* ── Confirm Delete Modal ── */}
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
              This will permanently delete the evaluation and all its responses. Cannot be undone.
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
          fontSize: "1.1rem", fontWeight: 700, color: "#fdfdfd",
          marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px",
        }}>
          Evaluation/s
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
          }}>
            No evaluations yet.
          </div>
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
                    {ev.anonymous && <span>🔒 Anonymous</span>}
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

      <h1 className={styles.title}>
        {editingId ? "✏️ Edit Evaluation" : "Create New Evaluation"}
      </h1>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className={styles.form}>

        {editingId && (
          <div style={{
            background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "8px",
            padding: "10px 14px", fontSize: "0.85rem", color: "#92400e", marginBottom: "1rem",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span>✏️ Editing — section cannot be changed while editing</span>
            <button type="button" onClick={resetForm} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#92400e", fontWeight: 700,
            }}>✕ Cancel</button>
          </div>
        )}

        <div className={styles.formGroup}>
          <label>Evaluation Title</label>
          <input type="text" placeholder="e.g. Midterm Peer Evaluation"
            value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading} required />
        </div>

        <div className={styles.formGroup}>
          <label>
            Description
            <span style={{ fontWeight: 400, fontSize: "0.8rem", color: "#94a3b8", textTransform: "none", marginLeft: "6px" }}>
              (optional)
            </span>
          </label>
          <input type="text" placeholder="Brief description"
            value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} />
        </div>

        {/* ── Section Selector ── */}
        <div className={styles.formGroup}>
          <label>
            Select Sections
            {!editingId && selectedSectionIds.length > 0 && (
              <span style={{
                marginLeft: "8px", fontSize: "0.75rem", fontWeight: 600,
                color: "rgb(20,184,166)", background: "rgba(20,184,166,0.1)",
                padding: "2px 8px", borderRadius: "99px",
              }}>
                {selectedSectionIds.length} selected
              </span>
            )}
          </label>

          {sectionsLoading ? (
            <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Loading sections...</p>
          ) : sections.length === 0 ? (
            <p style={{ color: "#f87171", fontSize: "0.85rem" }}>
              No sections found.{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => router.push("/dashboard/section")}>
                Create one first →
              </span>
            </p>
          ) : (
            <>
              {/* Select all / clear buttons */}
              {!editingId && (
                <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                  <button type="button" onClick={selectAllSections} style={{
                    padding: "4px 12px", borderRadius: "6px", border: "1px solid #e2e8f0",
                    background: "white", fontSize: "0.78rem", fontWeight: 600,
                    color: "#475569", cursor: "pointer",
                  }}>Select All</button>
                  <button type="button" onClick={clearAllSections} style={{
                    padding: "4px 12px", borderRadius: "6px", border: "1px solid #e2e8f0",
                    background: "white", fontSize: "0.78rem", fontWeight: 600,
                    color: "#475569", cursor: "pointer",
                  }}>Clear</button>
                </div>
              )}

              {/* Section checkboxes */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "10px",
              }}>
                {sections.map((s) => {
                  const isChecked = selectedSectionIds.includes(s.id);
                  const isDisabled = !!editingId && !isChecked;
                  return (
                    <div
                      key={s.id}
                      onClick={() => !isDisabled && toggleSection(s.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "10px 14px", borderRadius: "10px",
                        border: isChecked ? "2px solid rgb(20,184,166)" : "1.5px solid #e2e8f0",
                        background: isChecked ? "rgba(20,184,166,0.06)" : "#f8fafc",
                        cursor: isDisabled ? "default" : "pointer",
                        opacity: isDisabled ? 0.5 : 1,
                        transition: "all 0.15s ease",
                        userSelect: "none",
                      }}
                    >
                      {/* Custom checkbox */}
                      <div style={{
                        width: 18, height: 18, borderRadius: "5px", flexShrink: 0,
                        border: isChecked ? "2px solid rgb(20,184,166)" : "2px solid #d1d5db",
                        background: isChecked ? "rgb(20,184,166)" : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.15s ease",
                      }}>
                        {isChecked && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontWeight: 600, fontSize: "0.875rem",
                          color: isChecked ? "rgb(15,23,42)" : "#374151",
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                          {s.name}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                          {s._count?.students ?? 0} student{s._count?.students !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary of selected */}
              {!editingId && selectedSectionIds.length > 0 && (
                <div style={{
                  marginTop: "10px", padding: "10px 14px",
                  background: "rgba(20,184,166,0.08)",
                  border: "1px solid rgba(20,184,166,0.3)",
                  borderRadius: "8px", fontSize: "0.82rem", color: "rgb(15,118,110)",
                }}>
                  📋 Will create <strong>{selectedSectionIds.length}</strong> evaluation{selectedSectionIds.length > 1 ? "s" : ""} for:{" "}
                  {selectedSectionIds.map((id) => getSectionName(id)).join(", ")}
                </div>
              )}
            </>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>
            Deadline
            <span style={{ fontWeight: 400, fontSize: "0.8rem", color: "#94a3b8", textTransform: "none", marginLeft: "6px" }}>
              (optional)
            </span>
          </label>
          <input type="datetime-local" value={deadline}
            onChange={(e) => setDeadline(e.target.value)} disabled={loading} />
        </div>

        <div className={styles.checkboxGroup}>
          <input type="checkbox" id="anonymous" checked={anonymous}
            onChange={() => setAnonymous((p) => !p)} disabled={loading} />
          <label htmlFor="anonymous">Anonymous Evaluation</label>
        </div>

        <div className={styles.criteriaSection}>
          <label>Evaluation Criteria</label>
          {criteria.map((item, index) => (
            <div key={index} className={styles.criteriaRow}>
              <input type="text" placeholder={`Criterion ${index + 1} (e.g. Teamwork)`}
                value={item} onChange={(e) => changeCriteria(index, e.target.value)} disabled={loading} />
              {criteria.length > 1 && (
                <button type="button" onClick={() => removeCriteria(index)}
                  className={styles.removeBtn} disabled={loading}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addCriteria} className={styles.addBtn} disabled={loading}>
            + Add Criterion
          </button>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}
        {success && <p className={styles.successText}>{success}</p>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading
            ? "Saving..."
            : editingId
            ? "Save Changes"
            : selectedSectionIds.length > 1
            ? `Create ${selectedSectionIds.length} Evaluations`
            : "Create Evaluation"}
        </button>
      </form>
    </div>
  );
}