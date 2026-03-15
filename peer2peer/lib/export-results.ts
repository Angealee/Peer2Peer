import * as XLSX from "xlsx";

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

export function exportResultsToExcel(
  results: EvaluationResults,
  sectionName: string
) {
  const wb = XLSX.utils.book_new();

  // ── Sheet 1: Scores ──────────────────────────────────────────────────────
  const criteria = results.results[0]?.scores.map((s) => s.criterion) ?? [];

  const headers = ["Student Name", "Email", ...criteria, "Overall Average"];

  const rows = results.results
    .slice()
    .sort((a, b) => b.overallAverage - a.overallAverage)
    .map((r) => [
      r.student.name,
      r.student.email,
      ...criteria.map((c) => {
        const sc = r.scores.find((s) => s.criterion === c);
        return sc ? sc.average : 0;
      }),
      r.overallAverage,
    ]);

  const scoresSheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

  // Column widths
  scoresSheet["!cols"] = [
    { wch: 28 }, // Student Name
    { wch: 30 }, // Email
    ...criteria.map(() => ({ wch: 14 })),
    { wch: 16 }, // Overall Average
  ];

  XLSX.utils.book_append_sheet(wb, scoresSheet, "Scores");

  // ── Sheet 2: Comments ────────────────────────────────────────────────────
  const commentRows: (string | number)[][] = [
    ["Student Name", "Email", "From", "Comment"],
  ];

  for (const r of results.results) {
    if (r.comments.length === 0) {
      commentRows.push([r.student.name, r.student.email, "—", "No comments"]);
    } else {
      for (const c of r.comments) {
        commentRows.push([r.student.name, r.student.email, c.evaluatorName, c.text]);
      }
    }
  }

  const commentsSheet = XLSX.utils.aoa_to_sheet(commentRows);
  commentsSheet["!cols"] = [
    { wch: 28 },
    { wch: 30 },
    { wch: 20 },
    { wch: 60 },
  ];

  XLSX.utils.book_append_sheet(wb, commentsSheet, "Comments");

  // ── Sheet 3: Summary ─────────────────────────────────────────────────────
  const totalResponses = results.results.reduce(
    (sum, r) => sum + r.scores.reduce((s, sc) => s + sc.count, 0), 0
  );
  const classAvg =
    results.results.length > 0
      ? results.results.reduce((s, r) => s + r.overallAverage, 0) / results.results.length
      : 0;

  const summaryData = [
    ["Evaluation", results.title],
    ["Section", sectionName],
    ["Total Students", results.results.length],
    ["Total Responses", totalResponses],
    ["Class Average", Math.round(classAvg * 100) / 100],
    [],
    ["--- Criterion Averages ---"],
    ...criteria.map((c) => {
      const allScores = results.results.flatMap((r) =>
        r.scores.filter((s) => s.criterion === c)
      );
      const avg =
        allScores.length > 0
          ? allScores.reduce((s, sc) => s + sc.average, 0) / allScores.length
          : 0;
      return [c, Math.round(avg * 100) / 100];
    }),
  ];

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  summarySheet["!cols"] = [{ wch: 24 }, { wch: 30 }];
  XLSX.utils.book_append_sheet(wb, summarySheet, "Summary");

  // ── Download ─────────────────────────────────────────────────────────────
  const filename = `${results.title} - ${sectionName} - Results.xlsx`
    .replace(/[/\\?%*:|"<>]/g, "-");

  XLSX.writeFile(wb, filename);
}