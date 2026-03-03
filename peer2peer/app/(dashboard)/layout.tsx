"use client";

import styles from "./dashboard/dashboard.module.css";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>Peer2Peer Evaluation</div>

        <div onClick={() => router.push("/dashboard")} className={styles.navItem}>
          Dashboard
        </div>

        <div onClick={() => router.push("/evaluation/create")} className={styles.navItem}>
          Create Evaluation
        </div>

        <div onClick={() => router.push("/evaluation/results")} className={styles.navItem}>
          Results
        </div>

        <div onClick={() => router.push("/login")} className={styles.navItem}>
          Logout
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <div>Welcome back, User</div>
          <div>Academic Year 2025–2026</div>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}