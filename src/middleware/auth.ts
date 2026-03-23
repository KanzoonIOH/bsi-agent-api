import { Request, Response, NextFunction } from "express";

// ─── Auth Middleware (Stub) ───────────────────────────────────────────────────
// Currently operates in PASSTHROUGH mode — no token validation is performed.
//
// To enable real JWT validation (e.g. for n8n or LangGraph integration):
//   1. Set ENABLE_AUTH=true in your .env
//   2. Set JWT_SECRET=<your-secret> in your .env
//   3. The middleware will validate Bearer tokens on every request
//
// n8n / LangGraph usage:
//   Pass header:  Authorization: Bearer <token>
//   The agent receives req.user with { userId, sessionId } after auth is enabled.

const ENABLE_AUTH = process.env.ENABLE_AUTH === "true";

export interface AuthUser {
  userId: string;
  sessionId: string;
}

// Extend Express Request to carry authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!ENABLE_AUTH) {
    // Passthrough: attach a mock identity so downstream code works unchanged
    req.user = {
      userId: "MOCK_USER_001",
      sessionId: "MOCK_SESSION_" + Date.now(),
    };
    next();
    return;
  }

  // ── Real JWT validation (activated when ENABLE_AUTH=true) ────────────────
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      timestamp: new Date().toISOString(),
      error: {
        code: "UNAUTHORIZED",
        message: "Missing or invalid Authorization header. Expected: Bearer <token>",
      },
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    // TODO: Replace with real JWT verification
    // import jwt from 'jsonwebtoken';
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    // req.user = decoded;

    // Placeholder decode — swap with real library
    const decoded = Buffer.from(token, "base64").toString("utf8");
    const payload = JSON.parse(decoded) as AuthUser;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({
      success: false,
      timestamp: new Date().toISOString(),
      error: {
        code: "INVALID_TOKEN",
        message: "Token is invalid or expired.",
      },
    });
  }
}
