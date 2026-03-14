"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Criterion { id: number; name: string; }
interface Peer { id: number; name: string; }
interface EvaluationData {
  student: { id: number; name: string; email: string };
  evaluation: {
    id: number; title: string; description?: string;
    deadline?: string; anonymous: boolean; criteria: Criterion[];
  };
  peers: Peer[];
  alreadySubmitted: boolean;
  isExpired: boolean;
}

function ScoreButton({ value, selected, onClick }: { value: number; selected: boolean; onClick: () => void; }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 40, borderRadius: "50%",
      border: selected ? "2px solid #2563eb" : "2px solid #e2e8f0",
      background: selected ? "#2563eb" : "#fff",
      color: selected ? "#fff" : "#374151",
      fontWeight: 700, fontSize: 15, cursor: "pointer",
      transition: "all 0.15s ease", display: "flex",
      alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      {value}
    </button>
  );
}

function PeerCard({
  peer, criteria, scores, comment, onScore, onComment, isActive, onActivate,
}: {
  peer: Peer; criteria: Criterion[];
  scores: Record<number, number>; comment: string;
  onScore: (criterionId: number, score: number) => void;
  onComment: (comment: string) => void;
  isActive: boolean; onActivate: () => void;
}) {
  const filled = criteria.filter((c) => scores[c.id] !== undefined).length;
  const complete = filled === criteria.length;

  return (
    <div style={{
      border: isActive ? "2px solid #2563eb" : "2px solid #e2e8f0",
      borderRadius: 16, marginBottom: 12, overflow: "hidden",
      transition: "border-color 0.2s ease", background: "#fff",
      boxShadow: isActive ? "0 4px 20px rgba(37,99,235,0.10)" : "0 1px 4px rgba(0,0,0,0.05)",
    }}>
      <button onClick={onActivate} style={{
        width: "100%", padding: "16px 20px", display: "flex",
        alignItems: "center", gap: 14, background: "none",
        border: "none", cursor: "pointer", textAlign: "left",
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: "50%",
          background: complete ? "#dcfce7" : "#f1f5f9",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 17, fontWeight: 700,
          color: complete ? "#16a34a" : "#64748b",
          flexShrink: 0, transition: "all 0.2s",
        }}>
          {complete ? "✓" : peer.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>{peer.name}</div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
            {filled}/{criteria.length} criteria rated
            {comment && <span style={{ marginLeft: 8, color: "#2563eb" }}>· comment added ✓</span>}
          </div>
        </div>
        <div style={{ width: 80 }}>
          <div style={{ height: 6, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${(filled / criteria.length) * 100}%`,
              background: complete ? "#22c55e" : "#2563eb",
              borderRadius: 99, transition: "width 0.3s ease",
            }} />
          </div>
        </div>
        <div style={{ color: "#94a3b8", fontSize: 18, marginLeft: 4 }}>
          {isActive ? "▲" : "▼"}
        </div>
      </button>

      {isActive && (
        <div style={{ padding: "4px 20px 20px" }}>
          <div style={{ height: 1, background: "#f1f5f9", marginBottom: 16 }} />
          {criteria.map((criterion) => (
            <div key={criterion.id} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 10 }}>
                {criterion.name}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: "#9ca3af", marginRight: 4 }}>Poor</span>
                {[1, 2, 3, 4, 5].map((score) => (
                  <ScoreButton key={score} value={score}
                    selected={scores[criterion.id] === score}
                    onClick={() => onScore(criterion.id, score)} />
                ))}
                <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 4 }}>Excellent</span>
              </div>
            </div>
          ))}

          {/* Comment box */}
          <div style={{
            marginTop: 12, padding: "14px 16px",
            background: "#f8fafc", borderRadius: 10,
            border: "1px solid #e2e8f0",
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
              💬 Give comment to your peer:
              <span style={{ fontWeight: 400, color: "#9ca3af", marginLeft: 6 }}>(optional)</span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => onComment(e.target.value)}
              placeholder={`Share your opinion, feedback, comment about ${peer.name}...`}
              rows={3}
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 8,
                border: "1.5px solid #e2e8f0", fontSize: 13, color: "#374151",
                fontFamily: "inherit", resize: "vertical", outline: "none",
                background: "white", boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#2563eb"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function EvaluatePage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  const [data, setData] = useState<EvaluationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePeerId, setActivePeerId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<number, Record<number, number>>>({});
  const [comments, setComments] = useState<Record<number, string>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/evaluate/${token}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed to load");
        setData(json);
        if (json.peers?.length > 0) setActivePeerId(json.peers[0].id);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchData();
  }, [token]);

  function handleScore(peerId: number, criterionId: number, score: number) {
    setScores((prev) => ({ ...prev, [peerId]: { ...(prev[peerId] ?? {}), [criterionId]: score } }));
  }

  function handleComment(peerId: number, comment: string) {
    setComments((prev) => ({ ...prev, [peerId]: comment }));
  }

  const totalCriteria = data ? data.peers.length * data.evaluation.criteria.length : 0;
  const totalFilled = data
    ? data.peers.reduce((sum, peer) =>
        sum + data.evaluation.criteria.filter((c) => scores[peer.id]?.[c.id] !== undefined).length, 0)
    : 0;
  const allDone = totalFilled === totalCriteria && totalCriteria > 0;

  async function handleSubmit() {
    if (!data || !allDone) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const responses: { evaluatedId: number; criterionId: number; score: number; comment?: string }[] = [];
      data.peers.forEach((peer) => {
        data.evaluation.criteria.forEach((criterion) => {
          responses.push({
            evaluatedId: peer.id,
            criterionId: criterion.id,
            score: scores[peer.id][criterion.id],
            comment: comments[peer.id] ?? "",
          });
        });
      });

      const res = await fetch(`/api/evaluations/${data.evaluation.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ evaluatorId: data.student.id, responses }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed");
      router.push("/evaluate/done");
    } catch (e: any) {
      setSubmitError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return (
    <div style={pageStyle}><div style={cardStyle}>
      <div style={{ textAlign: "center", padding: 40 }}>
        <div style={spinnerStyle} />
        <p style={{ color: "#6b7280", marginTop: 16 }}>Loading your evaluation…</p>
      </div>
    </div></div>
  );

  if (error) return (
    <div style={pageStyle}><div style={{ ...cardStyle, textAlign: "center", padding: 48 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <h2 style={{ color: "#111827", marginBottom: 8 }}>Link Error</h2>
      <p style={{ color: "#6b7280" }}>{error}</p>
    </div></div>
  );

  if (!data) return null;

  if (data.isExpired) return (
    <div style={pageStyle}><div style={{ ...cardStyle, textAlign: "center", padding: 48 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
      <h2 style={{ color: "#111827", marginBottom: 8 }}>Evaluation Closed</h2>
      <p style={{ color: "#6b7280" }}>The deadline for this evaluation has passed.</p>
    </div></div>
  );

  if (data.alreadySubmitted) return (
    <div style={pageStyle}><div style={{ ...cardStyle, textAlign: "center", padding: 48 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
      <h2 style={{ color: "#111827", marginBottom: 8 }}>Already Submitted</h2>
      <p style={{ color: "#6b7280" }}>You have already submitted your evaluation. Thank you!</p>
    </div></div>
  );

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={{ marginBottom: 28 }}>
          <div style={{
            display: "inline-block", background: "#eff6ff", color: "#2563eb",
            fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 99,
            marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase",
          }}>Peer Evaluation</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
            {data.evaluation.title}
          </h1>
          {data.evaluation.description && (
            <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
              {data.evaluation.description}
            </p>
          )}
          <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
            <div style={pillStyle}>👤 {data.student.name}</div>
            {data.evaluation.deadline && (
              <div style={{ ...pillStyle, color: "#b45309", background: "#fffbeb" }}>
                ⏰ Due: {new Date(data.evaluation.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            )}
            {data.evaluation.anonymous && (
              <div style={{ ...pillStyle, color: "#7c3aed", background: "#f5f3ff" }}>🔒 Anonymous</div>
            )}
          </div>
        </div>

        <div style={{ background: "#f8fafc", borderRadius: 12, padding: "14px 18px", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "#6b7280" }}>
            <span>Overall progress</span>
            <span style={{ fontWeight: 600, color: "#111827" }}>{totalFilled} / {totalCriteria} scores</span>
          </div>
          <div style={{ height: 8, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${totalCriteria > 0 ? (totalFilled / totalCriteria) * 100 : 0}%`,
              background: allDone ? "#22c55e" : "#2563eb",
              borderRadius: 99, transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
          Rate each classmate on a scale of <strong>1–5</strong> for every criterion. Click a name to expand.
        </p>

        {data.peers.map((peer) => (
          <PeerCard
            key={peer.id} peer={peer}
            criteria={data.evaluation.criteria}
            scores={scores[peer.id] ?? {}}
            comment={comments[peer.id] ?? ""}
            onScore={(cId, score) => handleScore(peer.id, cId, score)}
            onComment={(c) => handleComment(peer.id, c)}
            isActive={activePeerId === peer.id}
            onActivate={() => setActivePeerId((prev) => (prev === peer.id ? null : peer.id))}
          />
        ))}

        {submitError && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca",
            borderRadius: 10, padding: "12px 16px", color: "#dc2626", fontSize: 14, marginTop: 16,
          }}>{submitError}</div>
        )}

        <button onClick={handleSubmit} disabled={!allDone || submitting} style={{
          width: "100%", marginTop: 24, padding: "14px 0", borderRadius: 12, border: "none",
          background: allDone ? "#2563eb" : "#e2e8f0",
          color: allDone ? "#fff" : "#9ca3af",
          fontWeight: 700, fontSize: 16,
          cursor: allDone ? "pointer" : "not-allowed", transition: "all 0.2s ease",
        }}>
          {submitting ? "Submitting…" : allDone
            ? "Submit Evaluation"
            : `Rate all peers to submit (${totalFilled}/${totalCriteria})`}
        </button>
      </div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh", background: "#f8fafc", display: "flex",
  alignItems: "flex-start", justifyContent: "center",
  padding: "40px 16px 80px", fontFamily: "'Geist', 'Inter', sans-serif",
};
const cardStyle: React.CSSProperties = {
  width: "100%", maxWidth: 640, background: "#fff",
  borderRadius: 20, padding: "32px 28px", boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
};
const pillStyle: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "4px 12px", borderRadius: 99, fontSize: 13,
  fontWeight: 500, background: "#f1f5f9", color: "#374151",
};
const spinnerStyle: React.CSSProperties = {
  width: 36, height: 36, border: "3px solid #e2e8f0",
  borderTop: "3px solid #2563eb", borderRadius: "50%",
  animation: "spin 0.8s linear infinite", margin: "0 auto",
};