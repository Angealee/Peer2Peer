"use client";

import styles from "./dashboard.module.css";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const router = useRouter();

  // Mock data (replace with API later)
  const kpis = {
    activeEvaluations: 4,
    closingSoon: 2,
    completionRate: 78,
    avgScore: 4.2,
  };

  const classProgress = [
    { name: "BSCS 3A", percent: 82 },
    { name: "BSCS 3B", percent: 56 },
    { name: "BSIT 2A", percent: 34 },
  ];

  const activityFeed = [
    "Group 3 submitted evaluation",
    "John D. completed peer review",
    "BSCS 3B has 5 pending responses",
  ];

  const completionTrend = [
    { week: "Week 1", rate: 20 },
    { week: "Week 2", rate: 45 },
    { week: "Week 3", rate: 65 },
    { week: "Week 4", rate: 78 },
  ];

  return (
    <div className={styles.layout}>
      

      {/* Scrollable Content */}
      <div className={styles.content}>
            <h1 className={styles.title}>Dashboard Overview</h1>

            {/* KPI Section */}
            <div className={styles.kpiGrid}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>Active Evaluations</div>
                <div className={styles.cardValue}>{kpis.activeEvaluations}</div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>Closing Soon</div>
                <div className={styles.cardValue}>{kpis.closingSoon}</div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>Completion Rate</div>
                <div className={styles.cardValue}>{kpis.completionRate}%</div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>Avg Peer Score</div>
                <div className={styles.cardValue}>{kpis.avgScore}</div>
              </div>
            </div>

            {/* Chart Section */}
            <div className={styles.section}>
              <h2>Completion Trend</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={completionTrend}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Class Progress Section */}
            <div className={styles.section}>
              <h2>Class Completion Progress</h2>
              {classProgress.map((cls, index) => (
                <div key={index} className={styles.progressItem}>
                  <div className={styles.progressLabel}>
                    {cls.name} – {cls.percent}%
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${cls.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Feed */}
            <div className={styles.section}>
              <h2>Recent Activity</h2>
              <ul className={styles.activityList}>
                {activityFeed.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className={styles.section}>
              <h2>Quick Actions</h2>
              <div className={styles.buttonRow}>
                <button onClick={() => router.push("/evaluation/create")}>
                  Create Evaluation
                </button>
                <button onClick={() => router.push("/evaluation/results")}>
                  View Results
                </button>
              </div>
            </div>
          </div>
        </div>
  );
}