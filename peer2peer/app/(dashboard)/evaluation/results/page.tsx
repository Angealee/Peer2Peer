"use client";

import { useState } from "react";
import styles from "./results.module.css";

export default function ResultsPage() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const sections = [
    {
      name: "BSIT 3A",
      totalStudents: 5,
      totalResponses: 20,
      students: [
        { name: "John Cruz", avg: 4.5 },
        { name: "Maria Santos", avg: 4.2 },
        { name: "Daniel Reyes", avg: 3.9 },
      ],
    },
    {
      name: "BSIT 3B",
      totalStudents: 4,
      totalResponses: 16,
      students: [
        { name: "Ana Lopez", avg: 4.7 },
        { name: "Kevin Tan", avg: 4.1 },
      ],
    },
  ];

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Evaluation Results</h1>

      {sections.map((section, index) => (
        <div key={index} className={styles.accordionCard}>
          <button
            className={styles.accordionHeader}
            onClick={() => toggleSection(index)}
          >
            <span>{section.name}</span>
            <span>{openSection === index ? "▲" : "▼"}</span>
          </button>

          {openSection === index && (
            <div className={styles.accordionContent}>
              {/* Section Stats */}
              <div className={styles.summaryGrid}>
                <div className={styles.card}>
                  <h3>Total Students</h3>
                  <p>{section.totalStudents}</p>
                </div>

                <div className={styles.card}>
                  <h3>Total Responses</h3>
                  <p>{section.totalResponses}</p>
                </div>
              </div>

              {/* Student Results Table */}
              <div className={styles.tableCard}>
                <h3>Student Results</h3>

                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Average Score</th>
                    </tr>
                  </thead>

                  <tbody>
                    {section.students.map((student, i) => (
                      <tr key={i}>
                        <td>{student.name}</td>
                        <td>{student.avg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}