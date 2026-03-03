"use client";

import { useState } from "react";
import styles from "./section.module.css";
import * as XLSX from "xlsx"; 




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
  const [excelFile, setExcelFile] = useState<File | null>(null);
const [importedStudents, setImportedStudents] = useState<string[]>([]);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setExcelFile(file);
  }
};

const handleImportExcel = async () => {
  if (!excelFile) return;

  const data = await excelFile.arrayBuffer();
  const workbook = XLSX.read(data);

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
  });

  // Assuming names are in first column
  const students = jsonData
    .map((row) => row[0])
    .filter((name) => typeof name === "string");

  setImportedStudents(students);

  // TODO: merge into section state
  console.log("Imported Students:", students);
};

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

          <div className="mt-6 border-t pt-4">
            <p className="text-sm font-semibold mb-2">Import from Excel</p>

            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileChange}
              className="mb-3"
            />
            <button className={styles.button} onClick={() => setExcelFile(null)}>
              Add Students
            </button>

            <button
              onClick={handleImportExcel}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Import Excel
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