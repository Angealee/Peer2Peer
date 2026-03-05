// lib/auth.ts
// JWT signing, verification, and request extraction helpers

import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN = "7d";

// Define a proper type for your JWT payload
export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

// Sign a token for a user
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

// Verify and decode a token
export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, SECRET) as JWTPayload;
}

// Extract the authenticated user from a Next.js request (Authorization: Bearer <token>)
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

// Require authentication — returns user or throws a 401 response body
export function requireAuth(req: NextRequest): JWTPayload {
  const user = getUserFromRequest(req);
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

// Require admin role
export function requireAdmin(req: NextRequest): AuthUser {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;

  if (decoded.role.toLowerCase() !== "admin") {
    throw new Error("Forbidden");
  }

  return decoded;
}

// lib/auth.ts - when creating the token, make sure role is included
export function generateToken(user: { id: number; email: string; role: string }) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,   // ← make sure this field is actually included
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
}