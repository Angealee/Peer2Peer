// lib/auth.ts
// JWT signing, verification, and request extraction helpers

import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN = "7d";

// ── Payload stored inside the JWT ─────────────────────
export interface JWTPayload {
  userId: any;
  id: number;
  email: string;
  role: string;
}

// ── Sign a token ──────────────────────────────────────
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

// Alias — use either name, both do the same thing
export const generateToken = signToken;

// ── Verify and decode a token ─────────────────────────
export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, SECRET) as JWTPayload;
}

// ── Extract user from request header ─────────────────
export function getUserFromRequest(req: NextRequest): JWTPayload | null {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;
    const token = authHeader.split(" ")[1];
    return verifyToken(token);
  } catch {
    return null;
  }
}

// ── Require any authenticated user ───────────────────
export function requireAuth(req: NextRequest): JWTPayload {
  const user = getUserFromRequest(req);
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

// ── Require admin role ────────────────────────────────
export function requireAdmin(req: NextRequest): JWTPayload {
  const user = getUserFromRequest(req);
  if (!user) throw new Error("UNAUTHORIZED");
  if (user.role.toLowerCase() !== "admin") throw new Error("FORBIDDEN");
  return user;
}