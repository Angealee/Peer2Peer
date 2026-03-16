"use client";

import { useState, useEffect } from "react";
import styles from "./results.module.css";
import { api, Section, Evaluation } from "@/lib/api-client";
import { exportResultsToExcel } from "@/lib/export-results";

interface StudentResult {
  student: { id: number; name: string; email: string };
  scores: { criterion: string; average: number; count: number }[];
  overallAverage: number;
  comments: { evaluatorName: string; text: string }[];
}

interface EvaluationResults {
  evaluationId: number;
  title: string;
  results: StudentResult[];
}

export default function ResultsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedEvalId, setSelectedEvalId] = useState<number | null>(null);
  const [results, setResults] = useState<EvaluationResults | null>(null);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [modalStudent, setModalStudent] = useState<StudentResult | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    Promise.all([api.sections.list(), api.evaluations.list()])
      .then(([secs, evals]) => { setSections(secs); setEvaluations(evals); })
      .catch(() => setError("Failed to load data."))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectEval = async (evalId: number) => {
    if (selectedEvalId === evalId) { setSelectedEvalId(null); setResults(null); return; }
    setSelectedEvalId(evalId);
    setResults(null);
    setResultsLoading(true);
    try { setResults(await api.evaluations.results(evalId)); }
    catch { setResults(null); }
    finally { setResultsLoading(false); }
  };

  const handleExport = async () => {
    if (!results || !selectedEvalId) return;
    setExporting(true);
    try {
      const evalObj = evaluations.find((e) => e.id === selectedEvalId);
      const sectionName = evalObj
  ? getSectionName(evalObj)
  : "Section";
      exportResultsToExcel(results, sectionName);
    } catch {
      alert("Failed to export. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const getSectionName = (evaluation: Evaluation) => {
  if (!evaluation.sections?.length) return "No section";

  const first = evaluation.sections[0]?.section;

  return first?.name ?? `Section #${first?.id ?? 0}`;
};

  if (loading) return <div className={styles.container}><p className={styles.loadingText}>Loading...</p></div>;
  if (error) return <div className={styles.container}><p className={styles.errorText}>{error}</p></div>;

  const selectedEval = evaluations.find((e) => e.id === selectedEvalId);

  return (
    <div className={styles.container}>

      {/* ── Comments Modal ── */}
      {modalStudent && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 100, padding: "20px",
        }}>
          <div style={{
            background: "white", borderRadius: "16px", padding: "2rem",
            maxWidth: "520px", width: "100%",
            boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
            maxHeight: "80vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "linear-gradient(135deg, rgb(29,207,216), rgb(20,184,166))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", flexShrink: 0,
                }}>
                  {modalStudent.student.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a" }}>
                    {modalStudent.student.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{modalStudent.student.email}</div>
                </div>
              </div>
              <button onClick={() => setModalStudent(null)} style={{
                background: "#f1f5f9", border: "none", borderRadius: "8px",
                padding: "6px 12px", cursor: "pointer", fontWeight: 600,
                color: "#475569", fontSize: "0.82rem",
              }}>✕ Close</button>
            </div>

            {/* Scores */}
            <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "12px 14px", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Scores
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {modalStudent.scores.map((sc) => (
                  <div key={sc.criterion} style={{
                    background: "white", border: "1px solid #e2e8f0",
                    borderRadius: "8px", padding: "6px 12px", fontSize: "0.8rem",
                  }}>
                    <span style={{ color: "#64748b" }}>{sc.criterion}: </span>
                    <span style={{
                      fontWeight: 700,
                      color: sc.average >= 4 ? "#059669" : sc.average >= 3 ? "#d97706" : "#dc2626",
                    }}>
                      {sc.average.toFixed(2)}
                    </span>
                    <span style={{ color: "#94a3b8", fontSize: "0.72rem", marginLeft: "4px" }}>
                      ({sc.count} {sc.count === 1 ? "vote" : "votes"})
                    </span>
                  </div>
                ))}
                <div style={{
                  background: "linear-gradient(135deg, rgb(29,207,216), rgb(20,184,166))",
                  borderRadius: "8px", padding: "6px 12px", fontSize: "0.8rem",
                  color: "#0f172a", fontWeight: 800,
                }}>
                  Overall: {modalStudent.overallAverage.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                💬 Comments ({modalStudent.comments.length})
              </div>
              {modalStudent.comments.length === 0 ? (
                <div style={{
                  textAlign: "center", padding: "24px", color: "#94a3b8",
                  fontSize: "0.875rem", background: "#f8fafc", borderRadius: "10px",
                  border: "1px dashed #e2e8f0",
                }}>
                  No comments left for this student.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {modalStudent.comments.map((c, i) => (
                    <div key={i} style={{
                      background: "#f8fafc", borderRadius: "10px",
                      padding: "12px 14px", border: "1px solid #e2e8f0",
                    }}>
                      <div style={{
                        fontSize: "0.75rem", fontWeight: 700, color: "#475569",
                        marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px",
                      }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: "50%",
                          background: "#e2e8f0", display: "flex", alignItems: "center",
                          justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: "#64748b",
                        }}>
                          {c.evaluatorName === "Anonymous" ? "?" : c.evaluatorName.charAt(0).toUpperCase()}
                        </div>
                        {c.evaluatorName}
                      </div>
                      <p style={{ margin: 0, fontSize: "0.875rem", color: "#374151", lineHeight: 1.6, fontStyle: "italic" }}>
                        "{c.text}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <h1 className={styles.title}>Evaluation Results</h1>

      {evaluations.length === 0 ? (
        <div className={styles.emptyState}>No evaluations found. Create one first.</div>
      ) : (
        <>
          {/* Evaluation Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
            gap: "14px", marginBottom: "1.5rem",
          }}>
            {evaluations.map((ev) => {
              const isSelected = selectedEvalId === ev.id;
              return (
                <div key={ev.id} onClick={() => handleSelectEval(ev.id)} style={{
                  background: isSelected ? "linear-gradient(135deg, #0f172a, #1e293b)" : "white",
                  borderRadius: "14px", padding: "1.25rem 1.4rem",
                  border: isSelected ? "2px solid rgb(29,207,216)" : "1px solid #e2e8f0",
                  cursor: "pointer",
                  boxShadow: isSelected ? "0 8px 24px rgba(29,207,216,0.2)" : "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.18s ease", position: "relative", overflow: "hidden",
                }}>
                  {isSelected && (
                    <div style={{
                      position: "absolute", top: 0, right: 0,
                      background: "rgb(29,207,216)", color: "#0f172a",
                      fontSize: "0.68rem", fontWeight: 700,
                      padding: "3px 10px", borderRadius: "0 14px 0 8px",
                    }}>VIEWING</div>
                  )}
                  <div style={{
                    fontWeight: 700, fontSize: "1rem", marginBottom: "8px",
                    color: isSelected ? "white" : "#0f172a",
                    paddingRight: isSelected ? "60px" : 0,
                  }}>
                    {ev.title}
                  </div>
                  <div style={{
                    display: "flex", flexDirection: "column", gap: "3px",
                    fontSize: "0.78rem", color: isSelected ? "rgba(255,255,255,0.6)" : "#64748b",
                  }}>
                    <span>📁 {getSectionName(ev)}</span>
                    {ev.deadline && <span>📅 Due {new Date(ev.deadline).toLocaleDateString()}</span>}
                    {ev.anonymous && <span>🔒 Anonymous</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Results Panel */}
          {selectedEvalId && (
            <div style={{
              background: "white", borderRadius: "14px",
              border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}>
              <div style={{
                background: "#0f172a", padding: "1rem 1.5rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                flexWrap: "wrap", gap: "10px",
              }}>
                <div>
                  <div style={{ color: "white", fontWeight: 700, fontSize: "1rem" }}>
                    {selectedEval?.title}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginTop: "2px" }}>
                    {selectedEval ? getSectionName(selectedEval) : ""} · Click a student row to view comments
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {results && results.results.length > 0 && (
                    <button onClick={handleExport} disabled={exporting} style={{
                      padding: "7px 16px", borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: exporting ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)",
                      color: "white", fontWeight: 600, fontSize: "0.82rem",
                      cursor: exporting ? "not-allowed" : "pointer",
                      transition: "all 0.15s ease",
                      display: "flex", alignItems: "center", gap: "6px",
                    }}>
                      {exporting ? "⏳ Exporting..." : "📥 Export to Excel"}
                    </button>
                  )}
                  <button onClick={() => { setSelectedEvalId(null); setResults(null); }} style={{
                    background: "rgba(255,255,255,0.1)", border: "none", color: "white",
                    borderRadius: "8px", padding: "6px 14px", cursor: "pointer",
                    fontSize: "0.82rem", fontWeight: 600,
                  }}>✕ Close</button>
                </div>
              </div>

              <div style={{ padding: "1.5rem" }}>
                {resultsLoading ? (
                  <p className={styles.loadingText}>Loading results...</p>
                ) : !results || results.results.length === 0 ? (
                  <div className={styles.emptyState}>No submissions yet.</div>
                ) : (
                  <>
                    <div className={styles.summaryGrid}>
                      <div className={styles.card}>
                        <h3>Total Students</h3>
                        <p>{results.results.length}</p>
                      </div>
                      <div className={styles.card}>
                        <h3>Total Responses</h3>
                        <p>{results.results.reduce((sum, r) =>
                          sum + r.scores.reduce((s, sc) => s + sc.count, 0), 0)}</p>
                      </div>
                      <div className={styles.card}>
                        <h3>Class Average</h3>
                        <p>{(
                          results.results.reduce((sum, r) => sum + r.overallAverage, 0) /
                          results.results.length
                        ).toFixed(2)}</p>
                      </div>
                    </div>

                    <div className={styles.tableCard}>
                      <h3 style={{ marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>
                        Student Results
                        <span style={{ marginLeft: "8px", fontSize: "0.75rem", fontWeight: 400, color: "#94a3b8" }}>
                          — click a row to view comments
                        </span>
                      </h3>
                      <div style={{ overflowX: "auto" }}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <th>Student Name</th>
                              {results.results[0]?.scores.map((sc) => (
                                <th key={sc.criterion}>{sc.criterion}</th>
                              ))}
                              <th>Overall Avg</th>
                              <th>Comments</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.results
                              .slice().sort((a, b) => b.overallAverage - a.overallAverage)
                              .map((r) => (
                                <tr key={r.student.id}
                                  onClick={() => setModalStudent(r)}
                                  style={{ cursor: "pointer" }}
                                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                                  onMouseLeave={(e) => e.currentTarget.style.background = ""}
                                >
                                  <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                      <div style={{
                                        width: 28, height: 28, borderRadius: "50%",
                                        background: "linear-gradient(135deg, rgb(29,207,216), rgb(20,184,166))",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "0.72rem", fontWeight: 700, color: "#0f172a", flexShrink: 0,
                                      }}>
                                        {r.student.name.charAt(0).toUpperCase()}
                                      </div>
                                      {r.student.name}
                                    </div>
                                  </td>
                                  {r.scores.map((sc) => (
                                    <td key={sc.criterion}>
                                      <span style={{
                                        fontWeight: 600,
                                        color: sc.average >= 4 ? "#059669" : sc.average >= 3 ? "#d97706" : "#dc2626",
                                      }}>{sc.average.toFixed(2)}</span>
                                      <span style={{ fontSize: "0.75rem", color: "#94a3b8", marginLeft: "4px" }}>
                                        ({sc.count})
                                      </span>
                                    </td>
                                  ))}
                                  <td>
                                    <span style={{
                                      background: "linear-gradient(135deg, rgb(29,207,216), rgb(20,184,166))",
                                      color: "#0f172a", fontWeight: 800, fontSize: "0.88rem",
                                      padding: "2px 10px", borderRadius: "99px",
                                    }}>
                                      {r.overallAverage.toFixed(2)}
                                    </span>
                                  </td>
                                  <td>
                                    <span style={{
                                      background: r.comments.length > 0 ? "#eff6ff" : "#f8fafc",
                                      color: r.comments.length > 0 ? "#2563eb" : "#94a3b8",
                                      border: `1px solid ${r.comments.length > 0 ? "#bfdbfe" : "#e2e8f0"}`,
                                      padding: "2px 10px", borderRadius: "99px",
                                      fontSize: "0.78rem", fontWeight: 600,
                                    }}>
                                      💬 {r.comments.length}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}