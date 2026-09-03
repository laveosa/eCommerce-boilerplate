import { doubleCsrf } from "csrf-csrf";
import type { Request } from "express";

const isProduction = process.env.NODE_ENV === "production";
const COOKIE_SECRET = process.env.SESSION_SECRET || "your-secret-key-1";

export const { doubleCsrfProtection, generateCsrfToken } = doubleCsrf({
  getSecret: () => COOKIE_SECRET,
  getSessionIdentifier: (req: Request) => {
    if (!req.session) return "";
    return req.session.id || req.session.userId || "";
  },
  cookieName: isProduction ? "__Host-ps.x-csrf-token" : "ps.x-csrf-token",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: isProduction,
  },
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  getCsrfTokenFromRequest: (req: Request) =>
    (req.headers["x-csrf-token"] as string) || req.body?._csrf,
});

export const csrfProtection = doubleCsrfProtection;
export const getCsrfToken = generateCsrfToken;
