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

  const [modalStudent, setModalStudent] =
    useState<StudentResult | null>(null);

  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    Promise.all([
      api.sections.list(),
      api.evaluations.list(),
    ])
      .then(([secs, evals]) => {
        setSections(secs);
        setEvaluations(evals);
      })
      .catch(() =>
        setError("Failed to load data.")
      )
      .finally(() => setLoading(false));
  }, []);

  const getSectionName = (
    evaluation?: Evaluation
  ) => {
    if (!evaluation?.sections?.length)
      return "No section";

    const first =
      evaluation.sections[0]?.section;

    return first?.name ?? "No section";
  };

  const handleSelectEval = async (
    evalId: number
  ) => {
    if (selectedEvalId === evalId) {
      setSelectedEvalId(null);
      setResults(null);
      return;
    }

    setSelectedEvalId(evalId);
    setResults(null);
    setResultsLoading(true);

    try {
      const evalObj =
        evaluations.find(
          e => e.id === evalId
        );

      const sectionId =
        evalObj?.sections?.[0]?.section
          ?.id;

      setResults(
        await api.evaluations.results(
          evalId,
          sectionId
        )
      );
    } catch {
      setResults(null);
    } finally {
      setResultsLoading(false);
    }
  };

  const handleExport = async () => {
    if (!results || !selectedEvalId)
      return;

    setExporting(true);

    try {
      const evalObj =
        evaluations.find(
          e =>
            e.id === selectedEvalId
        );

      const sectionName =
        getSectionName(evalObj);

      exportResultsToExcel(
        results,
        sectionName
      );
    } catch {
      alert("Failed to export.");
    } finally {
      setExporting(false);
    }
  };

  if (loading)
    return (
      <div className={styles.container}>
        <p className={styles.loadingText}>
          Loading...
        </p>
      </div>
    );

  if (error)
    return (
      <div className={styles.container}>
        <p className={styles.errorText}>
          {error}
        </p>
      </div>
    );

  const selectedEval =
    evaluations.find(
      e => e.id === selectedEvalId
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Evaluation Results
      </h1>

      {/* Evaluation cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(270px, 1fr))",
          gap: "14px",
          marginBottom: "1.5rem",
        }}
      >
        {evaluations.map(ev => {
          const isSelected =
            selectedEvalId === ev.id;

          return (
            <div
              key={ev.id}
              onClick={() =>
                handleSelectEval(
                  ev.id
                )
              }
              style={{
                background: isSelected
                  ? "linear-gradient(135deg,#0f172a,#1e293b)"
                  : "white",

                borderRadius: "14px",
                padding: "1.25rem",

                border: isSelected
                  ? "2px solid rgb(29,207,216)"
                  : "1px solid #e2e8f0",

                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                {ev.title}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#64748b",
                }}
              >
                📁{" "}
                {getSectionName(
                  ev
                )}

                {ev.deadline && (
                  <div>
                    📅{" "}
                    {new Date(
                      ev.deadline
                    ).toLocaleDateString()}
                  </div>
                )}

                {ev.anonymous && (
                  <div>
                    🔒 Anonymous
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* RESULTS PANEL */}

      {selectedEvalId && (
        <div
          className={
            styles.tableCard
          }
        >
          <div
            className={
              styles.resultsHeader
            }
          >
            <div>
              {
                selectedEval?.title
              }
            </div>

            <div
              style={{
                fontSize: 12,
                opacity: 0.6,
              }}
            >
              {getSectionName(
                selectedEval
              )}
            </div>

            {results && (
              <button
                onClick={
                  handleExport
                }
              >
                Export
              </button>
            )}
          </div>

          <div
            className={
              styles.resultsContent
            }
          >
            {resultsLoading && (
              <p>
                Loading...
              </p>
            )}

            {!results ||
            results.results
              .length === 0 ? (
              <p>
                No submissions yet.
              </p>
            ) : (
              <div
                className={
                  styles.tableWrapper
                }
              >
                <table
                  className={
                    styles.table
                  }
                >
                  <thead>
                    <tr>
                      <th>
                        Student
                      </th>

                      {results.results[0]?.scores.map(
                        sc => (
                          <th
                            key={
                              sc.criterion
                            }
                          >
                            {
                              sc.criterion
                            }
                          </th>
                        )
                      )}

                      <th>
                        Avg
                      </th>

                      <th>
                        Comments
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.results.map(
                      r => (
                        <tr
                          key={
                            r.student
                              .id
                          }
                          onClick={() =>
                            setModalStudent(
                              r
                            )
                          }
                          style={{
                            cursor:
                              "pointer",
                          }}
                        >
                          <td>
                            {
                              r
                                .student
                                .name
                            }
                          </td>

                          {r.scores.map(
                            sc => (
                              <td
                                key={
                                  sc.criterion
                                }
                              >
                                {sc.average.toFixed(
                                  2
                                )}
                              </td>
                            )
                          )}

                          <td>
                            {r.overallAverage.toFixed(
                              2
                            )}
                          </td>

                          <td>
                            {
                              r
                                .comments
                                .length
                            }
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL */}

      {modalStudent && (

  <div
    className={styles.modalOverlay}
    onClick={() => setModalStudent(null)}
  >

    <div
      className={styles.modal}
      onClick={(e) => e.stopPropagation()}
    >

      {/* HEADER */}

      <div className={styles.modalHeader}>

        <div>

          <div className={styles.modalTitle}>
            Student Comments
          </div>

          <div className={styles.modalSubtitle}>
            {modalStudent.student.name}
          </div>

        </div>

        <button
          className={styles.modalClose}
          onClick={() => setModalStudent(null)}
        >
          ✕
        </button>

      </div>


      {/* BODY */}

      <div className={styles.modalBody}>

        {modalStudent.comments.length === 0 ? (

          <div className={styles.noComments}>
            No comments submitted.
          </div>

        ) : (

          modalStudent.comments.map((c, i) => (

            <div
              key={i}
              className={styles.commentCard}
            >

              <div className={styles.commentAuthor}>
                {c.evaluatorName}
              </div>

              <div className={styles.commentText}>
                {c.text}
              </div>

            </div>

          ))

        )}

      </div>

    </div>

  </div>

)}
    </div>
  );
}