"use client";

import { useEffect, useState } from "react";
import styles from "./links.module.css";

interface Section {
  id: number;
  name: string;
}

interface Evaluation {
  id: number;
  title: string;
  sectionId: number;
}

interface Student {
  id: number;
  name: string;
  email: string;
  studentId: string;
}

interface StudentLink {
  student: Student;
  link: string;
}

export default function GenerateLinksPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [filteredEvals, setFilteredEvals] = useState<Evaluation[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [studentLinks, setStudentLinks] = useState<StudentLink[]>([]);

  const [selectedSection, setSelectedSection] = useState<number | "">("");
  const [selectedEval, setSelectedEval] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  // Load sections
  useEffect(() => {
    fetch("/api/sections", { headers })
      .then((r) => r.json())
      .then((data) => setSections(Array.isArray(data) ? data : []));
  }, []);

  // Load evaluations
  useEffect(() => {
    fetch("/api/evaluations", { headers })
      .then((r) => r.json())
      .then((data) => setEvaluations(Array.isArray(data) ? data : []));
  }, []);

  // Filter evaluations by selected section
  useEffect(() => {
    if (selectedSection === "") {
      setFilteredEvals(evaluations);
    } else {
      setFilteredEvals(evaluations.filter((e) => e.sectionId === Number(selectedSection)));
    }
    setSelectedEval("");
    setStudentLinks([]);
  }, [selectedSection, evaluations]);

  // Load students when section is selected
  useEffect(() => {
    if (selectedSection === "") {
      setStudents([]);
      setStudentLinks([]);
      return;
    }
    fetch(`/api/sections/${selectedSection}/students`, { headers })
      .then((r) => r.json())
      .then((data) => setStudents(Array.isArray(data) ? data : []));
  }, [selectedSection]);

  // Generate links when eval is selected
  useEffect(() => {
    if (selectedEval === "" || students.length === 0) {
      setStudentLinks([]);
      return;
    }
    generateLinks();
  }, [selectedEval, students]);

  function generateLinks() {
    if (selectedEval === "" || students.length === 0) return;
    const base = window.location.origin;
    const links = students.map((s) => ({
      student: s,
      link: `${base}/evaluate/${btoa(`${s.id}:${selectedEval}`)}`,
    }));
    setStudentLinks(links);
  }

  function copyAll() {
    const text = studentLinks
      .map((sl) => `${sl.student.name} <${sl.student.email}>\n${sl.link}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function copyOne(link: string) {
    navigator.clipboard.writeText(link);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>🔗 Generate Evaluation Links</h1>

      <div className={styles.card}>
        <p className={styles.cardTitle}>FILTER</p>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Section</label>
            <select
              className={styles.select}
              value={selectedSection}
              onChange={(e) =>
                setSelectedSection(e.target.value === "" ? "" : Number(e.target.value))
              }
            >
              <option value="">— Select a section —</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.label}>Evaluation</label>
            <select
              className={styles.select}
              value={selectedEval}
              onChange={(e) =>
                setSelectedEval(e.target.value === "" ? "" : Number(e.target.value))
              }
              disabled={selectedSection === ""}
            >
              <option value="">— Select an evaluation —</option>
              {filteredEvals.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
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
              <button className={styles.refreshBtn} onClick={generateLinks}>
                ↻ Refresh Links
              </button>
              <button className={styles.copyAllBtn} onClick={copyAll}>
                {copied ? "✓ Copied!" : "⎘ Copy All Links"}
              </button>
            </div>
          </div>

          <p className={styles.hint}>
            📋 Each link is unique per student. Share it directly — students don't need to log in.
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
              {studentLinks.map(({ student, link }) => (
                <tr key={student.id}>
                  <td>
                    <span className={styles.avatar}>
                      {student.name.charAt(0).toUpperCase()}
                    </span>
                    {student.name.toUpperCase()}
                  </td>
                  <td>{student.email}</td>
                  <td>
                    <span className={styles.linkText}>{link}</span>
                  </td>
                  <td>
                    <button
                      className={styles.copyBtn}
                      onClick={() => copyOne(link)}
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
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