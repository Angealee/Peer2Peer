"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./create.module.css";

export default function CreateEvaluationPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [deadline, setDeadline] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [criteria, setCriteria] = useState<string[]>([""]);

  const handleAddCriteria = () => {
    setCriteria([...criteria, ""]);
  };

  const handleRemoveCriteria = (index: number) => {
    const updated = [...criteria];
    updated.splice(index, 1);
    setCriteria(updated);
  };

  const handleCriteriaChange = (index: number, value: string) => {
    const updated = [...criteria];
    updated[index] = value;
    setCriteria(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      selectedClass,
      deadline,
      anonymous,
      criteria,
    };

    console.log("Evaluation Created:", payload);

    // TODO: Replace with API call
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <h1>Create New Evaluation</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Title */}
        <div className={styles.formGroup}>
          <label>Evaluation Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Class Selection */}
        <div className={styles.formGroup}>
          <label>Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            required
          >
            <option value="">-- Select Section --</option>
            <option value="BSCS 3A">BSCS 3A</option>
            <option value="BSCS 3B">BSCS 3B</option>
            <option value="BSIT 2A">BSIT 2A</option>
          </select>
        </div>

        {/* Deadline */}
        <div className={styles.formGroup}>
          <label>Deadline</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        {/* Anonymous Toggle */}
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          <label>Anonymous Evaluation</label>
        </div>

        {/* Criteria Builder */}
        <div className={styles.criteriaSection}>
          <h3>Evaluation Criteria</h3>

          {criteria.map((item, index) => (
            <div key={index} className={styles.criteriaRow}>
              <input
                type="text"
                placeholder={`Criterion ${index + 1}`}
                value={item}
                onChange={(e) =>
                  handleCriteriaChange(index, e.target.value)
                }
                required
              />
              {criteria.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCriteria(index)}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddCriteria}
            className={styles.addBtn}
          >
            + Add Criterion
          </button>
        </div>

        {/* Submit */}
        <button type="submit" className={styles.submitBtn}>
          Create Evaluation
        </button>
      </form>
    </div>
  );
}