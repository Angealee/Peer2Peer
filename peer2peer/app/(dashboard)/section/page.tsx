"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import styles from "./section.module.css";
import { api, Section, Student, Evaluation } from "@/lib/api-client";

type ExcelPreviewRow = {
  name: string;
  email: string;
  studentId: string;
  valid: boolean;
  error?: string;
};

// ─── Token Generator ──────────────────────────────────────────────────────────

function generateEvalToken(studentId: number, evaluationId: number): string {
  const payload = JSON.stringify({ studentId, evaluationId });
  // URL-safe base64: handles special chars and won't break in URL
  return btoa(encodeURIComponent(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function generateEvalLink(studentId: number, evaluationId: number): string {
  const token = generateEvalToken(studentId, evaluationId);
  return `${window.location.origin}/evaluate/${token}`;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SectionPage() {
  // Section form
  const [sectionName, setSectionName] = useState("");
  const [sectionDesc, setSectionDesc] = useState("");
  const [sectionLoading, setSectionLoading] = useState(false);
  const [sectionError, setSectionError] = useState("");

  // Sections list
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionsLoading, setSectionsLoading] = useState(true);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [deletingSectionId, setDeletingSectionId] = useState<number | null>(null);

  // Students
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [deletingStudentId, setDeletingStudentId] = useState<number | null>(null);

  // Manual add
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [addStudentLoading, setAddStudentLoading] = useState(false);
  const [addStudentError, setAddStudentError] = useState("");

  // Excel import
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<ExcelPreviewRow[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [importResult, setImportResult] = useState<{ inserted: number; skipped: number } | null>(null);
  const [importError, setImportError] = useState("");

  // Confirm dialog
  const [confirmDelete, setConfirmDelete] = useState<{ type: "section" | "student"; id: number; name: string } | null>(null);

  // ── Eval link generator ────────────────────────────────────────────────────
  const [sectionEvaluations, setSectionEvaluations] = useState<Evaluation[]>([]);
  const [selectedEvalId, setSelectedEvalId] = useState<number | null>(null);
  const [copiedStudentId, setCopiedStudentId] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [linksKey, setLinksKey] = useState(0); // increment to force re-render of links

  // ── Load sections ──────────────────────────────────────────────────────────
  useEffect(() => {
    api.sections
      .list()
      .then(setSections)
      .catch(() => {})
      .finally(() => setSectionsLoading(false));
  }, []);

  // ── Load students + evaluations when section selected ─────────────────────
  useEffect(() => {
    if (!selectedSectionId) {
      setStudents([]);
      setSectionEvaluations([]);
      setSelectedEvalId(null);
      return;
    }
    setStudentsLoading(true);
    api.sections
      .students(selectedSectionId)
      .then(setStudents)
      .catch(() => {})
      .finally(() => setStudentsLoading(false));

    // Load evaluations for this section
    api.evaluations
      .list()
      .then((all) => {
        const filtered = all.filter((e) => e.sectionId === selectedSectionId);
        setSectionEvaluations(filtered);
        setSelectedEvalId(filtered[0]?.id ?? null);
      })
      .catch(() => {});
  }, [selectedSectionId]);

  const selectedSection = sections.find((s) => s.id === selectedSectionId);
  const selectedEval = sectionEvaluations.find((e) => e.id === selectedEvalId);

  // ── Copy single link ───────────────────────────────────────────────────────
  const handleCopyLink = (student: Student) => {
    if (!selectedEvalId) return;
    const link = generateEvalLink(student.id, selectedEvalId);
    navigator.clipboard.writeText(link).then(() => {
      setCopiedStudentId(student.id);
      setTimeout(() => setCopiedStudentId(null), 2000);
    });
  };

  // ── Copy all links ─────────────────────────────────────────────────────────
  const handleCopyAll = () => {
    if (!selectedEvalId || students.length === 0) return;
    const text = students
      .map((s) => `${s.name}: ${generateEvalLink(s.id, selectedEvalId)}`)
      .join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    });
  };

  // ── Create Section ─────────────────────────────────────────────────────────
  const handleCreateSection = async () => {
    setSectionError("");
    if (!sectionName.trim()) { setSectionError("Section name is required."); return; }
    setSectionLoading(true);
    try {
      const created = await api.sections.create(sectionName.trim(), sectionDesc.trim());
      setSections((prev) => [{ ...created, _count: { students: 0 } }, ...prev]);
      setSectionName("");
      setSectionDesc("");
    } catch (err: any) {
      setSectionError(err.message ?? "Failed to create section.");
    } finally {
      setSectionLoading(false);
    }
  };

  // ── Delete Section ─────────────────────────────────────────────────────────
  const handleDeleteSection = async (sectionId: number) => {
    setDeletingSectionId(sectionId);
    try {
      await api.sections.delete(sectionId);
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
      if (selectedSectionId === sectionId) {
        setSelectedSectionId(null);
        setStudents([]);
      }
    } catch (err: any) {
      alert(err.message ?? "Failed to delete section.");
    } finally {
      setDeletingSectionId(null);
      setConfirmDelete(null);
    }
  };

  // ── Add Student Manually ───────────────────────────────────────────────────
  const handleAddStudent = async () => {
    setAddStudentError("");
    if (!studentName.trim() || !studentEmail.trim()) {
      setAddStudentError("Name and email are required.");
      return;
    }
    if (!selectedSectionId) return;
    setAddStudentLoading(true);
    try {
      const student = await api.students.create({
        name: studentName.trim(),
        email: studentEmail.trim(),
        studentId: studentId.trim(),
        sectionId: selectedSectionId,
      });
      setStudents((prev) => [...prev, student]);
      setSections((prev) =>
        prev.map((s) =>
          s.id === selectedSectionId
            ? { ...s, _count: { students: (s._count?.students ?? 0) + 1 } }
            : s
        )
      );
      setStudentName("");
      setStudentEmail("");
      setStudentId("");
    } catch (err: any) {
      setAddStudentError(err.message ?? "Failed to add student.");
    } finally {
      setAddStudentLoading(false);
    }
  };

  // ── Delete Student ─────────────────────────────────────────────────────────
  const handleDeleteStudent = async (sid: number) => {
    setDeletingStudentId(sid);
    try {
      await api.students.delete(sid);
      setStudents((prev) => prev.filter((s) => s.id !== sid));
      setSections((prev) =>
        prev.map((s) =>
          s.id === selectedSectionId
            ? { ...s, _count: { students: Math.max(0, (s._count?.students ?? 1) - 1) } }
            : s
        )
      );
    } catch (err: any) {
      alert(err.message ?? "Failed to remove student.");
    } finally {
      setDeletingStudentId(null);
      setConfirmDelete(null);
    }
  };

  // ── Excel: Parse & Preview ─────────────────────────────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setExcelFile(file);
    setImportResult(null);
    setImportError("");
    setShowPreview(false);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet);

      const parsed: ExcelPreviewRow[] = rows.map((row) => {
        const keys = Object.keys(row);
        const get = (key: string) => {
          const match = keys.find((k) => k.toLowerCase() === key.toLowerCase());
          return match ? String(row[match] ?? "").trim() : "";
        };
        const name = get("name");
        const email = get("email");
        const sid = get("studentid") || get("student_id") || get("id") || "";
        const valid = !!name && !!email;
        const error = !name ? "Missing name" : !email ? "Missing email" : undefined;
        return { name, email, studentId: sid, valid, error };
      });

      setPreviewRows(parsed);
      setShowPreview(true);
    } catch {
      setImportError("Failed to read file. Make sure it is a valid .xlsx file.");
    }
  };

  // ── Excel: Confirm Import ──────────────────────────────────────────────────
  const handleConfirmImport = async () => {
    if (!excelFile || !selectedSectionId) return;
    setImportLoading(true);
    setImportError("");
    try {
      const result = await api.students.import(excelFile, selectedSectionId);
      setImportResult({ inserted: result.inserted, skipped: result.skipped });
      setShowPreview(false);
      setPreviewRows([]);
      setExcelFile(null);
      const updated = await api.sections.students(selectedSectionId);
      setStudents(updated);
      setSections((prev) =>
        prev.map((s) =>
          s.id === selectedSectionId
            ? { ...s, _count: { students: updated.length } }
            : s
        )
      );
    } catch (err: any) {
      setImportError(err.message ?? "Import failed.");
    } finally {
      setImportLoading(false);
    }
  };

  const validCount = previewRows.filter((r) => r.valid).length;
  const invalidCount = previewRows.filter((r) => !r.valid).length;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={styles.container}>

      {/* Confirm Dialog */}
      {confirmDelete && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
        }}>
          <div style={{
            background: "white", borderRadius: "14px", padding: "2rem",
            maxWidth: "420px", width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⚠️</div>
            <h3 style={{ fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}>
              {confirmDelete.type === "section" ? "Delete Section?" : "Remove Student?"}
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              {confirmDelete.type === "section"
                ? `This will permanently delete "${confirmDelete.name}" and all its students. This cannot be undone.`
                : `Remove "${confirmDelete.name}" from this section?`}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button className={styles.buttonSecondary} onClick={() => setConfirmDelete(null)}>
                Cancel
              </button>
              <button
                className={styles.buttonDanger}
                onClick={() =>
                  confirmDelete.type === "section"
                    ? handleDeleteSection(confirmDelete.id)
                    : handleDeleteStudent(confirmDelete.id)
                }
                disabled={deletingSectionId === confirmDelete.id || deletingStudentId === confirmDelete.id}
              >
                {deletingSectionId === confirmDelete.id || deletingStudentId === confirmDelete.id
                  ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.pageTitle}>Section Management</div>

      {/* Create Section */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Create New Section</div>
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="text"
            placeholder="Section name (e.g. BSCS 3A)"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Description (optional)"
            value={sectionDesc}
            onChange={(e) => setSectionDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleCreateSection} disabled={sectionLoading}>
            {sectionLoading ? "Creating..." : "Create"}
          </button>
        </div>
        {sectionError && <p className={styles.errorText}>{sectionError}</p>}
      </div>

      {/* Existing Sections */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          Existing Sections
          <span style={{ marginLeft: "0.5rem", color: "#94a3b8", fontWeight: 400, textTransform: "none", fontSize: "0.8rem" }}>
            — click a section to manage its students
          </span>
        </div>
        {sectionsLoading ? (
          <p className={styles.loadingText}>Loading sections...</p>
        ) : sections.length === 0 ? (
          <p className={styles.emptyState}>No sections yet. Create one above.</p>
        ) : (
          <div className={styles.sectionGrid}>
            {sections.map((section) => (
              <div
                key={section.id}
                className={`${styles.sectionCard} ${selectedSectionId === section.id ? styles.activeCard : ""}`}
                onClick={() => setSelectedSectionId(section.id)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div className={styles.sectionName}>{section.name}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDelete({ type: "section", id: section.id, name: section.name });
                    }}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "#94a3b8", fontSize: "1rem", padding: "0 0 0 8px",
                      lineHeight: 1, transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                    title="Delete section"
                  >
                    🗑
                  </button>
                </div>
                <div className={styles.sectionMeta}>
                  {section._count?.students ?? 0} student{section._count?.students !== 1 ? "s" : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Student Management */}
      {selectedSection && (
        <>
          {/* Manual Add Student */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Add Student to "{selectedSection.name}"</div>
            <div className={styles.inputRow}>
              <input className={styles.input} type="text" placeholder="Full name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
              <input className={styles.input} type="email" placeholder="Email address" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
              <input className={styles.input} type="text" placeholder="Student ID (optional)" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
              <button className={styles.button} onClick={handleAddStudent} disabled={addStudentLoading}>
                {addStudentLoading ? "Adding..." : "Add"}
              </button>
            </div>
            {addStudentError && <p className={styles.errorText}>{addStudentError}</p>}
          </div>

          {/* Excel Import */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Import Students via Excel</div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.82rem", color: "#64748b" }}>
              📋 Required columns: <strong>Name</strong>, <strong>Email</strong> — optional: <strong>StudentID</strong>
            </div>
            <label htmlFor="excel-upload" className={styles.uploadArea} style={{ marginTop: "0.75rem", display: "block", cursor: "pointer" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>📂</div>
              <p style={{ margin: 0 }}>{excelFile ? `✅ ${excelFile.name}` : "Click to choose an Excel file (.xlsx)"}</p>
              <input id="excel-upload" type="file" accept=".xlsx,.xls" onChange={handleFileChange} style={{ display: "none" }} />
            </label>
            {importError && <p className={styles.errorText} style={{ marginTop: "0.5rem" }}>{importError}</p>}
            {importResult && (
              <p className={styles.successText} style={{ marginTop: "0.5rem" }}>
                ✅ Import complete — {importResult.inserted} added, {importResult.skipped} skipped (duplicates)
              </p>
            )}
            {showPreview && previewRows.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ background: "#f0fdf4", color: "#059669", border: "1px solid #86efac", padding: "3px 12px", borderRadius: "99px", fontSize: "0.8rem", fontWeight: 600 }}>✅ {validCount} valid</span>
                  {invalidCount > 0 && <span style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fca5a5", padding: "3px 12px", borderRadius: "99px", fontSize: "0.8rem", fontWeight: 600 }}>⚠️ {invalidCount} invalid</span>}
                  <span style={{ background: "#f1f5f9", color: "#64748b", border: "1px solid #e2e8f0", padding: "3px 12px", borderRadius: "99px", fontSize: "0.8rem", fontWeight: 600 }}>{previewRows.length} total rows</span>
                </div>
                <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                    <thead>
                      <tr style={{ background: "#111827", color: "white" }}>
                        {["#", "NAME", "EMAIL", "STUDENT ID", "STATUS"].map((h) => (
                          <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.04em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewRows.map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? "white" : "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "9px 14px", color: "#94a3b8" }}>{i + 1}</td>
                          <td style={{ padding: "9px 14px", color: "#111827", fontWeight: 500 }}>{row.name || <span style={{ color: "#fca5a5" }}>—</span>}</td>
                          <td style={{ padding: "9px 14px", color: "#475569" }}>{row.email || <span style={{ color: "#fca5a5" }}>—</span>}</td>
                          <td style={{ padding: "9px 14px", color: "#475569" }}>{row.studentId || <span style={{ color: "#94a3b8" }}>—</span>}</td>
                          <td style={{ padding: "9px 14px" }}>
                            {row.valid
                              ? <span style={{ background: "#f0fdf4", color: "#059669", padding: "2px 10px", borderRadius: "99px", fontSize: "0.78rem", fontWeight: 600 }}>Ready</span>
                              : <span style={{ background: "#fef2f2", color: "#dc2626", padding: "2px 10px", borderRadius: "99px", fontSize: "0.78rem", fontWeight: 600 }}>{row.error}</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                  <button className={styles.button} onClick={handleConfirmImport} disabled={importLoading || validCount === 0}>
                    {importLoading ? "Importing..." : `Confirm & Import ${validCount} Students`}
                  </button>
                  <button className={styles.buttonSecondary} onClick={() => { setShowPreview(false); setPreviewRows([]); setExcelFile(null); }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Student List */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              Students in "{selectedSection.name}"
              <span style={{ marginLeft: "0.5rem", color: "#94a3b8", fontWeight: 400, textTransform: "none", fontSize: "0.8rem" }}>
                — {students.length} enrolled
              </span>
            </div>
            {studentsLoading ? (
              <p className={styles.loadingText}>Loading students...</p>
            ) : students.length === 0 ? (
              <p className={styles.emptyState}>No students yet. Add manually or import from Excel.</p>
            ) : (
              <div className={styles.studentList}>
                {students.map((s) => (
                  <div key={s.id} className={styles.studentItem}>
                    <div className={styles.studentAvatar}>{s.name.charAt(0).toUpperCase()}</div>
                    <span className={styles.studentName}>{s.name}</span>
                    <span className={styles.studentEmail}>{s.email}</span>
                    <button
                      onClick={() => setConfirmDelete({ type: "student", id: s.id, name: s.name })}
                      disabled={deletingStudentId === s.id}
                      style={{
                        marginLeft: "auto", background: "none", border: "none",
                        cursor: "pointer", color: "#94a3b8", fontSize: "1rem",
                        padding: "4px 6px", borderRadius: "6px", transition: "all 0.15s ease", flexShrink: 0,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "#fef2f2"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "none"; }}
                      title="Remove student"
                    >
                      {deletingStudentId === s.id ? "..." : "🗑"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Generate Evaluation Links ───────────────────────────────────────── */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>🔗 Generate Evaluation Links</div>

            {sectionEvaluations.length === 0 ? (
              <div style={{
                background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px",
                padding: "14px 16px", fontSize: "0.875rem", color: "#92400e",
              }}>
                ⚠️ No evaluations found for this section. Create one first from the <strong>Evaluations</strong> page.
              </div>
            ) : (
              <>
                {/* Evaluation picker */}
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.4rem" }}>
                    Select Evaluation
                  </label>
                  <select
                    value={selectedEvalId ?? ""}
                    onChange={(e) => setSelectedEvalId(Number(e.target.value))}
                    style={{
                      width: "100%", maxWidth: 420, padding: "9px 12px",
                      borderRadius: "8px", border: "1px solid #e2e8f0",
                      fontSize: "0.9rem", color: "#111827", background: "#fff",
                      outline: "none", cursor: "pointer",
                    }}
                  >
                    {sectionEvaluations.map((ev) => (
                      <option key={ev.id} value={ev.id}>{ev.title}</option>
                    ))}
                  </select>
                </div>

                {students.length === 0 ? (
                  <p className={styles.emptyState}>Add students to this section first.</p>
                ) : (
                  <>
                    {/* Info banner */}
                    <div style={{
                      background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px",
                      padding: "12px 16px", fontSize: "0.82rem", color: "#1d4ed8", marginBottom: "1rem",
                    }}>
                      📋 Each link is unique per student. Share it directly — students don't need to log in.
                    </div>

                    {/* Copy All + Refresh buttons */}
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <button
                        onClick={() => setLinksKey((k) => k + 1)}
                        title="Regenerate all links"
                        style={{
                          padding: "8px 14px", borderRadius: "8px", border: "1px solid #e2e8f0",
                          background: "#f8fafc", color: "#374151",
                          fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        🔄 Refresh Links
                      </button>
                      <button
                        onClick={handleCopyAll}
                        style={{
                          padding: "8px 18px", borderRadius: "8px", border: "1px solid #e2e8f0",
                          background: copiedAll ? "#f0fdf4" : "#f8fafc",
                          color: copiedAll ? "#16a34a" : "#374151",
                          fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {copiedAll ? "✅ Copied all!" : "📋 Copy All Links"}
                      </button>
                    </div>

                    {/* Student links table */}
                    <div key={linksKey} style={{ borderRadius: "10px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                        <thead>
                          <tr style={{ background: "#111827", color: "white" }}>
                            {["STUDENT", "EMAIL", "EVAL LINK", ""].map((h) => (
                              <th key={h} style={{
                                padding: "10px 14px", textAlign: "left",
                                fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.04em",
                              }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((s, i) => {
                            const link = selectedEvalId ? generateEvalLink(s.id, selectedEvalId) : "";
                            const isCopied = copiedStudentId === s.id;
                            return (
                              <tr key={s.id} style={{ background: i % 2 === 0 ? "white" : "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                                <td style={{ padding: "10px 14px", fontWeight: 600, color: "#111827" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{
                                      width: 28, height: 28, borderRadius: "50%",
                                      background: "#eff6ff", color: "#2563eb",
                                      display: "flex", alignItems: "center", justifyContent: "center",
                                      fontSize: "0.8rem", fontWeight: 700, flexShrink: 0,
                                    }}>
                                      {s.name.charAt(0).toUpperCase()}
                                    </div>
                                    {s.name}
                                  </div>
                                </td>
                                <td style={{ padding: "10px 14px", color: "#475569", fontSize: "0.82rem" }}>{s.email}</td>
                                <td style={{ padding: "10px 14px", maxWidth: 220 }}>
                                  <div style={{
                                    fontSize: "0.78rem", color: "#6b7280",
                                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                    fontFamily: "monospace", background: "#f1f5f9",
                                    padding: "4px 8px", borderRadius: "6px",
                                  }}>
                                    {link}
                                  </div>
                                </td>
                                <td style={{ padding: "10px 14px" }}>
                                  <button
                                    onClick={() => handleCopyLink(s)}
                                    style={{
                                      padding: "6px 14px", borderRadius: "7px",
                                      border: "1px solid",
                                      borderColor: isCopied ? "#86efac" : "#e2e8f0",
                                      background: isCopied ? "#f0fdf4" : "#fff",
                                      color: isCopied ? "#16a34a" : "#374151",
                                      fontWeight: 600, fontSize: "0.8rem",
                                      cursor: "pointer", whiteSpace: "nowrap",
                                      transition: "all 0.2s ease",
                                    }}
                                  >
                                    {isCopied ? "✅ Copied!" : "Copy Link"}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}