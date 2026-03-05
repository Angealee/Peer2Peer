"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../results/result.module.css";
import { api, EvaluationResults } from "@/lib/api-client";

export default function ResultsPage() {
  const router = useRouter();

  const [evaluations, setEvaluations] = useState<{ id: number; title: string; section: { name: string } }[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [results, setResults] = useState<EvaluationResults | null>(null);
  const [loadingEvals, setLoadingEvals] = useState(true);
  const [loadingResults, setLoadingResults] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ name: string } | null>(null);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Load evaluations list
  useEffect(() => {
    api.evaluations
      .list()
      .then((data) => setEvaluations(data as any))
      .catch(() => setError("Failed to load evaluations."))
      .finally(() => setLoadingEvals(false));
  }, []);

  // Load results when an evaluation is selected
  useEffect(() => {
    if (!selectedId) return;
    setLoadingResults(true);
    setResults(null);
    api.evaluations
      .results(selectedId)
      .then(setResults)
      .catch(() => setError("Failed to load results."))
      .finally(() => setLoadingResults(false));
  }, [selectedId]);

  const handleLogout = () => {
    localStorage.clear();
    router.replace("/login");
  };

  // Compute overall stats
  const totalStudents = results?.results.length ?? 0;
  const avgScore =
    results && results.results.length > 0
      ? (
          results.results.reduce((sum, r) => sum + r.overallAverage, 0) /
          results.results.length
        ).toFixed(2)
      : "—";
  const topStudent = results?.results[0] ?? null;

  return (
    <div className={styles.layout}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>📊 Peer2Peer</div>
        <div className={styles.navItem} onClick={() => router.push("/dashboard")}>
          🏠 Dashboard
        </div>
        <div className={styles.navItem} onClick={() => router.push("/dashboard/section")}>
          📁 Sections
        </div>
        <div className={styles.navItem} onClick={() => router.push("/dashboard/create")}>
          ✏️ Create Evaluation
        </div>
        <div
          className={styles.navItem}
          style={{ backgroundColor: "#1f2937" }}
          onClick={() => router.push("/dashboard/results")}
        >
          📈 Results
        </div>
        <div
          className={styles.navItem}
          style={{ marginTop: "auto", color: "#f87171" }}
          onClick={handleLogout}
        >
          🚪 Logout
        </div>
      </aside>

      {/* ── Main ── */}
      <div className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <span>Evaluation Results</span>
          <span style={{ fontSize: "0.9rem" }}>{user?.name ?? "Instructor"}</span>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h1 className={styles.title}>📈 Evaluation Results</h1>

          {error && (
            <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
          )}

          {/* Evaluation Selector */}
          <div className={styles.section}>
            <h2>Select Evaluation</h2>
            {loadingEvals ? (
              <p style={{ color: "#6b7280" }}>Loading evaluations...</p>
            ) : evaluations.length === 0 ? (
              <p style={{ color: "#6b7280" }}>No evaluations found.</p>
            ) : (
              <div className={styles.buttonRow}>
                {evaluations.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => setSelectedId(ev.id)}
                    style={{
                      padding: "10px 18px",
                      backgroundColor: selectedId === ev.id ? "rgb(29, 207, 216)" : "#111827",
                      color: selectedId === ev.id ? "#111827" : "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: selectedId === ev.id ? "bold" : "normal",
                      transition: "0.2s ease",
                    }}
                  >
                    {ev.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Loading results */}
          {loadingResults && (
            <p style={{ color: "#6b7280" }}>Loading results...</p>
          )}

          {/* Results */}
          {results && (
            <>
              {/* KPI Cards */}
              <div className={styles.kpiGrid}>
                <div className={styles.card}>
                  <div className={styles.cardTitle}>Students Evaluated</div>
                  <div className={styles.cardValue}>{totalStudents}</div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardTitle}>Class Average Score</div>
                  <div className={styles.cardValue}>{avgScore}</div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardTitle}>Top Student</div>
                  <div className={styles.cardValue} style={{ fontSize: "1.2rem" }}>
                    {topStudent ? topStudent.student.name : "—"}
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardTitle}>Top Score</div>
                  <div className={styles.cardValue}>
                    {topStudent ? topStudent.overallAverage : "—"}
                  </div>
                </div>
              </div>

              {/* Score Breakdown per Student */}
              <div className={styles.section}>
                <h2>Student Score Breakdown</h2>
                {results.results.map((r, idx) => (
                  <div key={r.student.id} style={{ marginBottom: "1.5rem" }}>
                    {/* Student header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontWeight: "bold", color: "#111827" }}>
                        #{idx + 1} {r.student.name}
                        <span
                          style={{
                            marginLeft: "0.5rem",
                            fontSize: "0.8rem",
                            color: "#6b7280",
                          }}
                        >
                          {r.student.email}
                        </span>
                      </span>
                      <span
                        style={{
                          background: "rgb(29, 207, 216)",
                          padding: "2px 10px",
                          borderRadius: "20px",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          color: "#111827",
                        }}
                      >
                        Avg: {r.overallAverage}
                      </span>
                    </div>

                    {/* Progress bar per criterion */}
                    {r.scores.map((s) => (
                      <div key={s.criterion} className={styles.progressItem}>
                        <div className={styles.progressLabel}>
                          {s.criterion}
                          <span
                            style={{
                              float: "right",
                              fontSize: "0.85rem",
                              color: "#6b7280",
                            }}
                          >
                            {s.average} / 10 ({s.count} rating{s.count !== 1 ? "s" : ""})
                          </span>
                        </div>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: `${(s.average / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}

                    {/* Divider */}
                    {idx < results.results.length - 1 && (
                      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", marginTop: "1rem" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Leaderboard */}
              <div className={styles.section}>
                <h2>🏆 Leaderboard</h2>
                <ul className={styles.activityList}>
                  {results.results.map((r, idx) => (
                    <li key={r.student.id}>
                      <span style={{ marginRight: "0.75rem" }}>
                        {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                      </span>
                      <strong>{r.student.name}</strong>
                      <span
                        style={{
                          float: "right",
                          fontWeight: "bold",
                          color: "rgb(29, 207, 216)",
                        }}
                      >
                        {r.overallAverage}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Empty state */}
          {!loadingResults && !results && selectedId && (
            <div className={styles.section} style={{ textAlign: "center", color: "#6b7280" }}>
              No responses submitted yet for this evaluation.
            </div>
          )}

          {!selectedId && !loadingEvals && evaluations.length > 0 && (
            <div className={styles.section} style={{ textAlign: "center", color: "#6b7280" }}>
              👆 Select an evaluation above to view its results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}