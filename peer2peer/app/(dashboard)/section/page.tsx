"use client";

import { useState } from "react";
import styles from "./section.module.css";

type Student = {
  id: string;
  name: string;
};

type Section = {
  id: string;
  name: string;
  students: Student[];
};

export default function SectionPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionName, setSectionName] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState("");

  const handleCreateSection = () => {
    if (!sectionName.trim()) return;

    const newSection: Section = {
      id: crypto.randomUUID(),
      name: sectionName,
      students: [],
    };

    setSections((prev) => [...prev, newSection]);
    setSectionName("");
  };

  const handleAddStudent = () => {
    if (!studentName.trim() || !selectedSectionId) return;

    setSections((prev) =>
      prev.map((section) =>
        section.id === selectedSectionId
          ? {
              ...section,
              students: [
                ...section.students,
                { id: crypto.randomUUID(), name: studentName },
              ],
            }
          : section
      )
    );

    setStudentName("");
  };

  const selectedSection = sections.find(
    (section) => section.id === selectedSectionId
  );

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>Section Management</div>

      {/* Create Section */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Create Section</div>
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter section name"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
          />
          <button className={styles.button} onClick={handleCreateSection}>
            Create
          </button>
        </div>
      </div>

      {/* Add Student */}
      {selectedSection && (
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            Add Students to "{selectedSection.name}"
          </div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <button className={styles.button} onClick={handleAddStudent}>
              Add
            </button>
          </div>

          {selectedSection.students.length > 0 && (
            <div className={styles.studentList}>
              {selectedSection.students.map((student) => (
                <div key={student.id}>• {student.name}</div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Section List */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Existing Sections</div>

        {sections.length === 0 && (
          <div style={{ fontSize: "14px", color: "#64748b" }}>
            No sections created yet.
          </div>
        )}

        <div className={styles.sectionGrid}>
          {sections.map((section) => (
            <div
              key={section.id}
              className={`${styles.sectionCard} ${
                selectedSectionId === section.id ? styles.activeCard : ""
              }`}
              onClick={() => setSelectedSectionId(section.id)}
            >
              <div className={styles.sectionName}>{section.name}</div>
              <div className={styles.sectionMeta}>
                {section.students.length} students
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}