"use client";

import { useEffect, useState } from "react";
import styles from "./links.module.css";

interface Section { id: number; name: string; }
interface Evaluation { id: number; title: string; sectionId: number; }
interface Student { id: number; name: string; email: string; studentId: string; }
interface StudentLink { student: Student; link: string; nonce: string; }

function makeToken(studentId: number, evaluationId: number | "", nonce: string): string {
  return btoa(encodeURIComponent(JSON.stringify({ studentId, evaluationId, nonce })))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function makeNonce() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export default function GenerateLinksPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [filteredEvals, setFilteredEvals] = useState<Evaluation[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [studentLinks, setStudentLinks] = useState<StudentLink[]>([]);

  const [selectedSection, setSelectedSection] = useState<number | "">("");
  const [selectedEval, setSelectedEval] = useState<number | "">("");
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [refreshedIds, setRefreshedIds] = useState<Set<number>>(new Set());
  const [resettingIds, setResettingIds] = useState<Set<number>>(new Set());
  const [allRefreshed, setAllRefreshed] = useState(false);
  const [allResetting, setAllResetting] = useState(false);

  // Confirm modals
  const [confirmReset, setConfirmReset] = useState<{ studentId: number; name: string } | null>(null);
  const [confirmResetAll, setConfirmResetAll] = useState(false);

  const authToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = { Authorization: `Bearer ${authToken}`, "Content-Type": "application/json" };

  useEffect(() => {
    fetch("/api/sections", { headers })
      .then((r) => r.json())
      .then((data) => setSections(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    fetch("/api/evaluations", { headers })
      .then((r) => r.json())
      .then((data) => setEvaluations(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    if (selectedSection === "") {
      setFilteredEvals(evaluations);
    } else {
      setFilteredEvals(evaluations.filter((e) => e.sectionId === Number(selectedSection)));
    }
    setSelectedEval("");
    setStudentLinks([]);
  }, [selectedSection, evaluations]);

  useEffect(() => {
    if (selectedSection === "") { setStudents([]); setStudentLinks([]); return; }
    fetch(`/api/sections/${selectedSection}/students`, { headers })
      .then((r) => r.json())
      .then((data) => setStudents(Array.isArray(data) ? data : []));
  }, [selectedSection]);

  useEffect(() => {
    if (selectedEval === "" || students.length === 0) { setStudentLinks([]); return; }
    initLinks();
  }, [selectedEval, students]);

  // ── Initial link generation (no reset) ────────────────────────────────────
  function initLinks() {
    if (selectedEval === "" || students.length === 0) return;
    const base = window.location.origin;
    setStudentLinks(students.map((s) => {
      const nonce = makeNonce();
      return { student: s, nonce, link: `${base}/evaluate/${makeToken(s.id, selectedEval, nonce)}` };
    }));
  }

  // ── Reset ALL: delete all responses + new links ────────────────────────────
  async function resetAll() {
    if (selectedEval === "" || students.length === 0) return;
    setConfirmResetAll(false);
    setAllResetting(true);

    try {
      // Reset each student's responses in parallel
      await Promise.all(
        students.map((s) =>
          fetch(`/api/evaluations/${selectedEval}/reset`, {
            method: "POST",
            headers,
            body: JSON.stringify({ evaluatorId: s.id }),
          })
        )
      );

      // Generate fresh links for all
      const base = window.location.origin;
      setStudentLinks(students.map((s) => {
        const nonce = makeNonce();
        return { student: s, nonce, link: `${base}/evaluate/${makeToken(s.id, selectedEval, nonce)}` };
      }));

      // Flash all rows
      const allIds = new Set(students.map((s) => s.id));
      setRefreshedIds(allIds);
      setAllRefreshed(true);
      setTimeout(() => { setRefreshedIds(new Set()); setAllRefreshed(false); }, 1800);
    } catch {
      alert("Failed to reset all responses. Please try again.");
    } finally {
      setAllResetting(false);
    }
  }

  // ── Reset ONE: delete responses + new link ─────────────────────────────────
  async function resetOne(studentId: number) {
    if (selectedEval === "") return;
    setResettingIds((prev) => new Set([...prev, studentId]));

    try {
      await fetch(`/api/evaluations/${selectedEval}/reset`, {
        method: "POST",
        headers,
        body: JSON.stringify({ evaluatorId: studentId }),
      });

      const base = window.location.origin;
      const nonce = makeNonce();
      const newLink = `${base}/evaluate/${makeToken(studentId, selectedEval, nonce)}`;

      setStudentLinks((prev) =>
        prev.map((sl) =>
          sl.student.id === studentId ? { ...sl, nonce, link: newLink } : sl
        )
      );

      setRefreshedIds((prev) => new Set([...prev, studentId]));
      setTimeout(() => {
        setRefreshedIds((prev) => { const n = new Set(prev); n.delete(studentId); return n; });
      }, 1800);
    } catch {
      alert("Failed to reset student responses.");
    } finally {
      setResettingIds((prev) => { const n = new Set(prev); n.delete(studentId); return n; });
      setConfirmReset(null);
    }
  }

  function copyAll() {
    const text = studentLinks.map((sl) => `${sl.student.name} <${sl.student.email}>\n${sl.link}`).join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function copyOne(link: string, studentId: number) {
    navigator.clipboard.writeText(link);
    setCopiedId(studentId);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className={styles.container}>

      {/* ── Confirm Reset ALL Modal ── */}
      {confirmResetAll && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
        }}>
          <div style={{
            background: "white", borderRadius: "14px", padding: "2rem",
            maxWidth: "440px", width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>⚠️</div>
            <h3 style={{ fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem", fontSize: "1.1rem" }}>
              Refresh and Reset All Evaluations?
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "0.75rem", lineHeight: 1.6 }}>
              This will <strong style={{ color: "#ef4444" }}>permanently delete all submitted scores and comments</strong> from every student in this evaluation and generate fresh links for all {students.length} students.
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginBottom: "1.5rem" }}>
              This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button onClick={() => setConfirmResetAll(false)} style={{
                padding: "9px 20px", borderRadius: "8px", border: "1px solid #e2e8f0",
                background: "white", cursor: "pointer", fontWeight: 600, color: "#374151", fontSize: "0.9rem",
              }}>
                Cancel
              </button>
              <button onClick={resetAll} style={{
                padding: "9px 20px", borderRadius: "8px", border: "none",
                background: "#ef4444", color: "white", cursor: "pointer",
                fontWeight: 700, fontSize: "0.9rem",
              }}>
                Yes, Refresh and Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Reset ONE Modal ── */}
      {confirmReset && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
        }}>
          <div style={{
            background: "white", borderRadius: "14px", padding: "2rem",
            maxWidth: "400px", width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⚠️</div>
            <h3 style={{ fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}>
              Reset Evaluation?
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              This will <strong>delete all previous scores and comments</strong> submitted by{" "}
              <strong>{confirmReset.name}</strong> and generate a fresh link. This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button onClick={() => setConfirmReset(null)} style={{
                padding: "8px 18px", borderRadius: "8px", border: "1px solid #e2e8f0",
                background: "white", cursor: "pointer", fontWeight: 600, color: "#374151",
              }}>
                Cancel
              </button>
              <button
                onClick={() => resetOne(confirmReset.studentId)}
                disabled={resettingIds.has(confirmReset.studentId)}
                style={{
                  padding: "8px 18px", borderRadius: "8px", border: "none",
                  background: "#ef4444", color: "white", cursor: "pointer", fontWeight: 600,
                }}
              >
                {resettingIds.has(confirmReset.studentId) ? "Resetting..." : "Yes, Reset & Refresh"}
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className={styles.pageTitle}>🔗 Evaluation Tokens/Links</h1>

      <div className={styles.card}>
        <p className={styles.cardTitle}>FILTER</p>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Section</label>
            <select className={styles.select} value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value === "" ? "" : Number(e.target.value))}>
              <option value="">— Select a section —</option>
              {sections.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Evaluation</label>
            <select className={styles.select} value={selectedEval}
              onChange={(e) => setSelectedEval(e.target.value === "" ? "" : Number(e.target.value))}
              disabled={selectedSection === ""}>
              <option value="">— Select an evaluation —</option>
              {filteredEvals.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
            </select>
          </div>
        </div>
      </div>

      {studentLinks.length > 0 && (
        <div className={styles.card}>
          <div className={styles.tableHeader}>
            <p className={styles.cardTitle}>
              STUDENT LINKS{" "}
              <span className={styles.count}>{studentLinks.length} students</span>
            </p>
            <div className={styles.actions}>
              <button
                className={allRefreshed ? styles.refreshOneBtnDone : styles.refreshBtn}
                onClick={() => setConfirmResetAll(true)}
                disabled={allResetting}
              >
                {allResetting ? "Resetting…" : allRefreshed ? "✓ All Reset!" : "↻ Refresh All"}
              </button>
              <button className={styles.copyAllBtn} onClick={copyAll}>
                {copied ? "✓ Copied!" : "⎘ Copy All Links"}
              </button>
            </div>
          </div>

          <p className={styles.hint}>
            📋 Clicking ↻ on a student <strong>deletes their previous responses</strong> and generates a fresh link so they can re-evaluate.
          </p>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>STUDENT</th>
                <th>EMAIL</th>
                <th>EVAL LINK</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {studentLinks.map(({ student, link }) => {
                const justRefreshed = refreshedIds.has(student.id);
                const isResetting = resettingIds.has(student.id);
                return (
                  <tr key={student.id} className={justRefreshed ? styles.rowFlash : ""}>
                    <td>
                      <span className={styles.avatar}>
                        {student.name.charAt(0).toUpperCase()}
                      </span>
                      {student.name.toUpperCase()}
                      {justRefreshed && <span className={styles.newBadge}>NEW</span>}
                    </td>
                    <td>{student.email}</td>
                    <td>
                      <span className={styles.linkText}>{link}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                        <button
                          className={justRefreshed ? styles.refreshOneBtnDone : styles.refreshOneBtn}
                          onClick={() => setConfirmReset({ studentId: student.id, name: student.name })}
                          disabled={isResetting || allResetting}
                          title="Reset responses and generate new link"
                        >
                          {isResetting ? "…" : justRefreshed ? "✓" : "↻"}
                        </button>
                        <button
                          className={copiedId === student.id ? styles.copyBtnDone : styles.copyBtn}
                          onClick={() => copyOne(link, student.id)}
                        >
                          {copiedId === student.id ? "✓" : "Copy"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedSection !== "" && selectedEval !== "" && studentLinks.length === 0 && (
        <div className={styles.empty}>No students found in this section.</div>
      )}
      {selectedSection === "" && (
        <div className={styles.empty}>Select a section and evaluation to generate links.</div>
      )}
    </div>
  );
}