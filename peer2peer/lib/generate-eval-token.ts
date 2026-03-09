// lib/generate-eval-token.ts
// Utility to generate evaluation links for students
// Usage: import { generateEvalToken, generateEvalLink } from "@/lib/generate-eval-token"

/**
 * Generates a base64 token encoding studentId + evaluationId
 */
export function generateEvalToken(studentId: number, evaluationId: number): string {
  const payload = JSON.stringify({ studentId, evaluationId });
  return Buffer.from(payload).toString("base64");
}

/**
 * Generates the full shareable link for a student
 * Use this in your instructor dashboard to copy/send links to students
 *
 * Example:
 *   const link = generateEvalLink(student.id, evaluation.id);
 *   // → "https://yourdomain.com/evaluate/eyJzdHVkZW50SWQiOjEsImV2YWx1YXRpb25JZCI6MX0="
 */
export function generateEvalLink(
  studentId: number,
  evaluationId: number,
  baseUrl?: string
): string {
  const token = generateEvalToken(studentId, evaluationId);
  const base = baseUrl ?? (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/evaluate/${token}`;
}

// ─── Example usage in your instructor results/section page ────────────────────
//
// import { generateEvalLink } from "@/lib/generate-eval-token";
//
// students.forEach((student) => {
//   const link = generateEvalLink(student.id, evaluationId);
//   console.log(`${student.name}: ${link}`);
// });