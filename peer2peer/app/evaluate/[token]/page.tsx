"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./token.module.css";

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

// ── Score Button ──────────────────────────────────────────────────────────────
function ScoreButton({ value, selected, onClick }: {
  value: number; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={selected ? styles.scoreBtnSelected : styles.scoreBtn}
    >
      {value}
    </button>
  );
}

// ── Peer Card ─────────────────────────────────────────────────────────────────
function PeerCard({ peer, criteria, scores, comment, onScore, onComment, isActive, onActivate }: {
  peer: Peer; criteria: Criterion[];
  scores: Record<number, number>; comment: string;
  onScore: (criterionId: number, score: number) => void;
  onComment: (comment: string) => void;
  isActive: boolean; onActivate: () => void;
}) {
  const filled = criteria.filter((c) => scores[c.id] !== undefined).length;
  const complete = filled === criteria.length;
  const pct = criteria.length > 0 ? (filled / criteria.length) * 100 : 0;

  return (
    <div className={isActive ? styles.peerCardActive : styles.peerCard}>

      {/* Header */}
      <button onClick={onActivate} className={styles.peerHeader}>
        <div className={complete ? styles.peerAvatarDone : styles.peerAvatar}>
          {complete ? "✓" : peer.name.charAt(0).toUpperCase()}
        </div>

        <div className={styles.peerInfo}>
          <div className={styles.peerName}>{peer.name}</div>
          <div className={styles.peerMeta}>
            {filled}/{criteria.length} criteria rated
            {comment && <span className={styles.peerCommentTag}>· comment added ✓</span>}
          </div>
        </div>

        <div className={styles.peerProgressBar}>
          <div className={styles.peerProgressTrack}>
            <div
              className={complete ? styles.peerProgressFillDone : styles.peerProgressFill}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className={styles.chevron}>{isActive ? "▲" : "▼"}</div>
      </button>

      {/* Expanded body */}
      {isActive && (
        <div className={styles.peerBody}>
          <div className={styles.divider} />

          {criteria.map((criterion) => (
            <div key={criterion.id} className={styles.criterionRow}>
              <div className={styles.criterionName}>{criterion.name}</div>
              <div className={styles.scoreRow}>
                <span className={styles.scoreLabel}>Poor</span>
                {[1, 2, 3, 4, 5].map((score) => (
                  <ScoreButton
                    key={score}
                    value={score}
                    selected={scores[criterion.id] === score}
                    onClick={() => onScore(criterion.id, score)}
                  />
                ))}
                <span className={styles.scoreLabel}>Excellent</span>
              </div>
            </div>
          ))}

          {/* Comment box */}
          <div className={styles.commentBox}>
            <div className={styles.commentLabel}>
              💬 Give comment to your peer:
              <span className={styles.commentOptional}>(optional)</span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => onComment(e.target.value)}
              placeholder={`Share your opinion, feedback, comment about ${peer.name}...`}
              rows={3}
              className={styles.commentTextarea}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
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

  function handleComment(peerId: number, c: string) {
    setComments((prev) => ({ ...prev, [peerId]: c }));
  }

  const totalCriteria = data ? data.peers.length * data.evaluation.criteria.length : 0;
  const totalFilled = data
    ? data.peers.reduce((sum, peer) =>
        sum + data.evaluation.criteria.filter((c) => scores[peer.id]?.[c.id] !== undefined).length, 0)
    : 0;
  const allDone = totalFilled === totalCriteria && totalCriteria > 0;
  const pct = totalCriteria > 0 ? (totalFilled / totalCriteria) * 100 : 0;

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

  // ── Loading ──
  if (loading) return (
    <div className={styles.page}>
      <div className={styles.stateCard}>
        <div className={styles.spinner} />
        <p className={styles.spinnerText}>Loading your evaluation…</p>
      </div>
    </div>
  );

  // ── Error ──
  if (error) return (
    <div className={styles.page}>
      <div className={styles.stateCard}>
        <div className={styles.stateIcon}>🔒</div>
        <h2 className={styles.stateTitle}>Link Error</h2>
        <p className={styles.stateMsg}>{error}</p>
      </div>
    </div>
  );

  if (!data) return null;

  // ── Expired ──
  if (data.isExpired) return (
    <div className={styles.page}>
      <div className={styles.stateCard}>
        <div className={styles.stateIcon}>⏰</div>
        <h2 className={styles.stateTitle}>Evaluation Closed</h2>
        <p className={styles.stateMsg}>The deadline for this evaluation has passed.</p>
      </div>
    </div>
  );

  // ── Already submitted ──
  if (data.alreadySubmitted) return (
    <div className={styles.page}>
      <div className={styles.stateCard}>
        <div className={styles.stateIcon}>✅</div>
        <h2 className={styles.stateTitleSuccess}>Already Submitted</h2>
        <p className={styles.stateMsg}>You have already submitted your evaluation. Thank you!</p>
      </div>
    </div>
  );

  // ── Main ──
  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Header */}
        <div className={styles.header}>
          <div className="evalHeader">
            <h1 className={styles.evalTitle}>{data.evaluation.title}</h1>
            <div className={styles.evalBadge}>Peer Evaluation</div>
          </div>
          
          {data.evaluation.description && (
            <p className={styles.evalDesc}>{data.evaluation.description}</p>
          )}
          <div className={styles.pillRow}>
            <div className={styles.pill}>👤 {data.student.name}</div>
            {data.evaluation.deadline && (
              <div className={styles.pillDeadline}>
                ⏰ Due: {new Date(data.evaluation.deadline).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </div>
            )}
            {data.evaluation.anonymous && (
              <div className={styles.pillAnon}>🔒 Anonymous</div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className={styles.progressBox}>
          <div className={styles.progressTop}>
            <span>Overall progress</span>
            <span className={styles.progressCount}>{totalFilled} / {totalCriteria} scores</span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={allDone ? styles.progressFillDone : styles.progressFill}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <p className={styles.instruction}>
          Rate each classmate on a scale of <strong>1–5</strong> for every criterion.
          Click a name to expand.
        </p>

        {/* Peer cards */}
        {data.peers.map((peer) => (
          <PeerCard
            key={peer.id}
            peer={peer}
            criteria={data.evaluation.criteria}
            scores={scores[peer.id] ?? {}}
            comment={comments[peer.id] ?? ""}
            onScore={(cId, score) => handleScore(peer.id, cId, score)}
            onComment={(c) => handleComment(peer.id, c)}
            isActive={activePeerId === peer.id}
            onActivate={() => setActivePeerId((prev) => (prev === peer.id ? null : peer.id))}
          />
        ))}

        {/* Error */}
        {submitError && (
          <div className={styles.errorBanner}>{submitError}</div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!allDone || submitting}
          className={allDone ? styles.submitBtnReady : styles.submitBtn}
        >
          {submitting ? "Submitting…"
            : allDone ? "Submit Evaluation"
            : `Rate all peers to submit (${totalFilled}/${totalCriteria})`}
        </button>

      </div>
    </div>
  );
}