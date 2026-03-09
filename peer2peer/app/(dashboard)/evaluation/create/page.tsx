"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./create.module.css";
import { api, Section } from "@/lib/api-client";

export default function CreateEvaluationPage() {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [criteria, setCriteria] = useState<string[]>(["", "", ""]);

  // Sections from DB
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionsLoading, setSectionsLoading] = useState(true);

  // Submit state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ── Fetch sections + student counts on mount ──────
  useEffect(() => {
    api.sections
      .list()
      .then(setSections)
      .catch(() => setError("Failed to load sections."))
      .finally(() => setSectionsLoading(false));
  }, []);

  // ── Criteria handlers ─────────────────────────────
  const handleAddCriteria = () => setCriteria((prev) => [...prev, ""]);

  const handleRemoveCriteria = (index: number) =>
    setCriteria((prev) => prev.filter((_, i) => i !== index));

  const handleCriteriaChange = (index: number, value: string) =>
    setCriteria((prev) => prev.map((c, i) => (i === index ? value : c)));

  // ── Submit ────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const cleanCriteria = criteria.map((c) => c.trim()).filter(Boolean);

    if (!title.trim()) { setError("Evaluation title is required."); return; }
    if (!selectedSectionId) { setError("Please select a section."); return; }
    if (cleanCriteria.length === 0) { setError("Add at least one criterion."); return; }

    setLoading(true);
    try {
      await api.evaluations.create({
        title: title.trim(),
        description: description.trim(),
        sectionId: Number(selectedSectionId),
        deadline: deadline || undefined,
        anonymous,
        criteria: cleanCriteria,
      });

      setSuccess("✅ Evaluation created successfully! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err: any) {
      setError(err.message ?? "Failed to create evaluation.");
    } finally {
      setLoading(false);
    }
  };

  const selectedSection = sections.find((s) => s.id === Number(selectedSectionId));

  // ── Render ────────────────────────────────────────
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Evaluation</h1>

      <form onSubmit={handleSubmit} className={styles.form}>

        {/* Title */}
        <div className={styles.formGroup}>
          <label>Evaluation Title</label>
          <input
            type="text"
            placeholder="e.g. Midterm Peer Evaluation"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label>Description <span style={{ fontWeight: 400, textTransform: "none", fontSize: "0.8rem", color: "#94a3b8" }}>(optional)</span></label>
          <input
            type="text"
            placeholder="Brief description of this evaluation"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Section Dropdown — live from DB */}
        <div className={styles.formGroup}>
          <label>Select Section</label>
          <select
            value={selectedSectionId}
            onChange={(e) => setSelectedSectionId(e.target.value)}
            disabled={loading || sectionsLoading}
            required
          >
            <option value="">
              {sectionsLoading ? "Loading sections..." : "— Select a Section —"}
            </option>
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s._count?.students ?? 0} student{s._count?.students !== 1 ? "s" : ""})
              </option>
            ))}
          </select>

          {/* No sections nudge */}
          {!sectionsLoading && sections.length === 0 && (
            <span style={{ fontSize: "0.8rem", color: "#f87171", marginTop: "6px" }}>
              No sections found.{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => router.push("/dashboard/section")}
              >
                Create one first →
              </span>
            </span>
          )}

          {/* Selected section student count badge */}
          {selectedSection && (
            <span style={{
              marginTop: "8px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(29, 207, 216, 0.1)",
              border: "1px solid rgba(29, 207, 216, 0.3)",
              borderRadius: "99px",
              padding: "3px 12px",
              fontSize: "0.8rem",
              color: "rgb(20, 184, 166)",
              fontWeight: 600,
              width: "fit-content",
            }}>
              👥 {selectedSection._count?.students ?? 0} student{selectedSection._count?.students !== 1 ? "s" : ""} will be evaluated
            </span>
          )}
        </div>

        {/* Deadline */}
        <div className={styles.formGroup}>
          <label>Deadline <span style={{ fontWeight: 400, textTransform: "none", fontSize: "0.8rem", color: "#94a3b8" }}>(optional)</span></label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Anonymous Toggle */}
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="anonymous"
            checked={anonymous}
            onChange={() => setAnonymous((prev) => !prev)}
            disabled={loading}
          />
          <label htmlFor="anonymous">Anonymous Evaluation</label>
        </div>

        {/* Criteria Builder */}
        <div className={styles.criteriaSection}>
          <label>Evaluation Criteria</label>

          {criteria.map((item, index) => (
            <div key={index} className={styles.criteriaRow}>
              <input
                type="text"
                placeholder={`Criterion ${index + 1} (e.g. Teamwork)`}
                value={item}
                onChange={(e) => handleCriteriaChange(index, e.target.value)}
                disabled={loading}
              />
              {criteria.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCriteria(index)}
                  className={styles.removeBtn}
                  disabled={loading}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddCriteria}
            className={styles.addBtn}
            disabled={loading}
          >
            + Add Criterion
          </button>
        </div>

        {/* Error / Success feedback */}
        {error && <p className={styles.errorText}>{error}</p>}
        {success && <p className={styles.successText}>{success}</p>}

        {/* Submit */}
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Creating..." : "Create Evaluation"}
        </button>

      </form>
    </div>
  );
}