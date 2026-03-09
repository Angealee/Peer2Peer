"use client";

import { useState, useEffect } from "react";
import styles from "./results.module.css";
import { api, Section, Evaluation, EvaluationResults } from "@/lib/api-client";

// ── Types ──────────────────────────────────────────────
type SectionWithEvals = Section & { evaluations: Evaluation[] };

export default function ResultsPage() {
  const [sections, setSections] = useState<SectionWithEvals[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Which section accordion is open
  const [openSection, setOpenSection] = useState<number | null>(null);
  // Which evaluation is selected per section (sectionId → evalId)
  const [selectedEval, setSelectedEval] = useState<Record<number, number>>({});
  // Cached results per evalId
  const [resultsCache, setResultsCache] = useState<Record<number, EvaluationResults>>({});
  const [resultsLoading, setResultsLoading] = useState<Record<number, boolean>>({});

  // ── Load sections + evaluations on mount ──────────
  useEffect(() => {
    const load = async () => {
      try {
        const [secs, evals] = await Promise.all([
          api.sections.list(),
          api.evaluations.list(),
        ]);

        // Group evaluations under their section
        const grouped: SectionWithEvals[] = secs.map((s) => ({
          ...s,
          evaluations: evals.filter((e) => e.sectionId === s.id),
        }));

        setSections(grouped);
      } catch {
        setError("Failed to load results.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Fetch results when an evaluation is selected ──
  const handleSelectEval = async (sectionId: number, evalId: number) => {
    setSelectedEval((prev) => ({ ...prev, [sectionId]: evalId }));
    if (resultsCache[evalId]) return; // already cached

    setResultsLoading((prev) => ({ ...prev, [evalId]: true }));
    try {
      const data = await api.evaluations.results(evalId);
      setResultsCache((prev) => ({ ...prev, [evalId]: data }));
    } catch {
      // no submissions yet — leave cache empty
    } finally {
      setResultsLoading((prev) => ({ ...prev, [evalId]: false }));
    }
  };

  const toggleSection = (id: number) =>
    setOpenSection((prev) => (prev === id ? null : id));

  // ── Render ────────────────────────────────────────
  if (loading) return (
    <div className={styles.container}>
      <p className={styles.loadingText}>Loading results...</p>
    </div>
  );

  if (error) return (
    <div className={styles.container}>
      <p className={styles.errorText}>{error}</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Evaluation Results</h1>

      {sections.length === 0 && (
        <div className={styles.emptyState}>
          No sections found. Create a section and add students first.
        </div>
      )}

      {sections.map((section) => {
        const isOpen = openSection === section.id;
        const activeEvalId = selectedEval[section.id];
        const activeResults = activeEvalId ? resultsCache[activeEvalId] : null;
        const isResultsLoading = activeEvalId ? resultsLoading[activeEvalId] : false;

        return (
          <div key={section.id} className={styles.accordionCard}>

            {/* ── Header ── */}
            <button
              className={styles.accordionHeader}
              onClick={() => toggleSection(section.id)}
            >
              <span>
                {section.name}
                <span style={{ marginLeft: "0.75rem", fontSize: "0.78rem", color: "#94a3b8", fontWeight: 400 }}>
                  {section._count?.students ?? 0} students · {section.evaluations.length} evaluation{section.evaluations.length !== 1 ? "s" : ""}
                </span>
              </span>
              <span>{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* ── Body ── */}
            {isOpen && (
              <div className={styles.accordionContent}>

                {section.evaluations.length === 0 ? (
                  <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                    No evaluations created for this section yet.
                  </p>
                ) : (
                  <>
                    {/* Evaluation picker */}
                    <div style={{ marginBottom: "1.25rem" }}>
                      <p style={{
                        fontSize: "0.75rem", fontWeight: 700, color: "#64748b",
                        textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.6rem"
                      }}>
                        Select Evaluation
                      </p>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {section.evaluations.map((ev) => {
                          const isActive = activeEvalId === ev.id;
                          return (
                            <button
                              key={ev.id}
                              onClick={() => handleSelectEval(section.id, ev.id)}
                              style={{
                                padding: "7px 16px",
                                borderRadius: "8px",
                                border: isActive ? "1.5px solid rgb(29,207,216)" : "1.5px solid #e2e8f0",
                                background: isActive
                                  ? "linear-gradient(135deg, rgb(29,207,216), rgb(20,184,166))"
                                  : "#f8fafc",
                                color: isActive ? "#0f172a" : "#475569",
                                fontWeight: isActive ? 700 : 500,
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                boxShadow: isActive ? "0 4px 12px rgba(29,207,216,0.25)" : "none",
                                transition: "all 0.15s ease",
                              }}
                            >
                              {ev.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Results */}
                    {activeEvalId && (
                      isResultsLoading ? (
                        <p className={styles.loadingText}>Loading results...</p>
                      ) : !activeResults || activeResults.results.length === 0 ? (
                        <div className={styles.emptyState}>
                          No submissions yet for this evaluation.
                        </div>
                      ) : (
                        <>
                          {/* KPI cards */}
                          <div className={styles.summaryGrid}>
                            <div className={styles.card}>
                              <h3>Total Students</h3>
                              <p>{activeResults.results.length}</p>
                            </div>
                            <div className={styles.card}>
                              <h3>Total Responses</h3>
                              <p>
                                {activeResults.results.reduce(
                                  (sum, r) => sum + r.scores.reduce((s, sc) => s + sc.count, 0), 0
                                )}
                              </p>
                            </div>
                            <div className={styles.card}>
                              <h3>Class Average</h3>
                              <p>
                                {(
                                  activeResults.results.reduce((sum, r) => sum + r.overallAverage, 0) /
                                  activeResults.results.length
                                ).toFixed(2)}
                              </p>
                            </div>
                          </div>

                          {/* Student results table */}
                          <div className={styles.tableCard}>
                            <h3 style={{ marginBottom: "0.75rem", fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>
                              Student Results
                            </h3>
                            <table className={styles.table}>
                              <thead>
                                <tr>
                                  <th>Student Name</th>
                                  {activeResults.results[0]?.scores.map((sc) => (
                                    <th key={sc.criterion}>{sc.criterion}</th>
                                  ))}
                                  <th>Overall Avg</th>
                                </tr>
                              </thead>
                              <tbody>
                                {activeResults.results
                                  .slice()
                                  .sort((a, b) => b.overallAverage - a.overallAverage)
                                  .map((r) => (
                                    <tr key={r.student.id}>
                                      <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                          <div style={{
                                            width: "28px", height: "28px", borderRadius: "50%",
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
                                          }}>
                                            {sc.average.toFixed(2)}
                                          </span>
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
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}