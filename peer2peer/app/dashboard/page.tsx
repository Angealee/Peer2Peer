"use client";

import styles from "./dashboard.module.css";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className={styles.layout}>

      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>Peer2Peer Evaluation</div>

        <div
          className={styles.navItem}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </div>

        <div
          className={styles.navItem}
          onClick={() => router.push("/evaluation/create")}
        >
          Create Evaluation
        </div>

        <div
          className={styles.navItem}
          onClick={() => router.push("/evaluation/results")}
        >
          Results
        </div>

        <div
          className={styles.navItem}
          onClick={() => router.push("/login")}
        >
          Logout
        </div>
      </div>

      {/* Main Area */}
      <div className={styles.main}>
        <div className={styles.header}>
          <div>Welcome back, User</div>
          <div>Academic Year 2025–2026</div>
        </div>

        <div className={styles.content}>
          <h2>Dashboard Overview</h2>

          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Total Evaluations</div>
              <div className={styles.cardValue}>12</div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Pending Reviews</div>
              <div className={styles.cardValue}>5</div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Completed</div>
              <div className={styles.cardValue}>7</div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Active Classes</div>
              <div className={styles.cardValue}>3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}