// lib/api-client.ts
// Typed fetch wrappers for all backend endpoints
// Usage: import { api } from "@/lib/api-client"

const BASE = "/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }

  return res.json();
}

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: { id: number; name: string; email: string; role: string } }>(
        "/auth/login",
        { method: "POST", body: JSON.stringify({ email, password }) }
      ),

    register: (name: string, email: string, password: string) =>
      request<{ token: string; user: { id: number; name: string; email: string; role: string } }>(
        "/auth/register",
        { method: "POST", body: JSON.stringify({ name, email, password }) }
      ),
  },

  // ─── SECTIONS ──────────────────────────────────────────────────────────────

  sections: {
    list: () => request<Section[]>("/sections"),

    get: (id: number) => request<Section>(`/sections/${id}`),

    create: (name: string, description?: string) =>
      request<Section>("/sections", { method: "POST", body: JSON.stringify({ name, description }) }),

    students: (sectionId: number) =>
      request<Student[]>(`/sections/${sectionId}/students`),
  },

  // ─── STUDENTS ──────────────────────────────────────────────────────────────

  students: {
    create: (data: { name: string; email: string; studentId?: string; sectionId: number }) =>
      request<Student>("/students", { method: "POST", body: JSON.stringify(data) }),

    import: async (file: File, sectionId: number) => {
      const token = getToken();
      const form = new FormData();
      form.append("file", file);
      form.append("sectionId", String(sectionId));

      const res = await fetch(`${BASE}/students/import`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: form,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Import failed" }));
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }

      return res.json() as Promise<{ message: string; inserted: number; skipped: number }>;
    },
  },

  // ─── EVALUATIONS ───────────────────────────────────────────────────────────

  evaluations: {
    list: () => request<Evaluation[]>("/evaluations"),

    get: (id: number) => request<Evaluation>(`/evaluations/${id}`),

    create: (data: { title: string; description?: string; sectionId: number; criteria: string[] }) =>
      request<Evaluation>("/evaluations", { method: "POST", body: JSON.stringify(data) }),

    submit: (
      id: number,
      evaluatorId: number,
      responses: { evaluatedId: number; criterionId: number; score: number }[]
    ) =>
      request(`/evaluations/${id}/submit`, {
        method: "POST",
        body: JSON.stringify({ evaluatorId, responses }),
      }),

    results: (id: number) => request<EvaluationResults>(`/evaluations/${id}/results`),
  },
};

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface Section {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  _count?: { students: number };
}

export interface Student {
  id: number;
  name: string;
  email: string;
  studentId: string;
  sectionId: number;
}

export interface Evaluation {
  id: number;
  title: string;
  description?: string;
  sectionId: number;
  createdAt: string;
  criteria: { id: number; criterionName: string }[];
}

export interface EvaluationResults {
  evaluationId: number;
  title: string;
  results: {
    student: { id: number; name: string; email: string };
    scores: { criterion: string; average: number; count: number }[];
    overallAverage: number;
  }[];
}
