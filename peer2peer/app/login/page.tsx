"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { api } from "@/lib/api-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token, user } = await api.auth.login(email, password);

      // Store auth data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/peer2peerlogo.png" alt="Logo" className={styles.logo} />
        <h2 className={styles.title}>Peer 2 Peer Evaluation</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          {/* Error message — only shows on failed login */}
          {error && (
            <p style={{ color: "red", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
              {error}
            </p>
          )}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link to register page */}
        <p style={{ marginTop: "1rem", fontSize: "0.85rem", textAlign: "center" }}>
          No account yet?{" "}
          <a href="/register" style={{ color: "#0070f3" }}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
