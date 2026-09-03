import cookieSession from "cookie-session";

export const cookieSessionMiddleware = cookieSession({
  name: "session",
  keys: [
    process.env.SESSION_SECRET_1 || "your-secret-key-1",
    process.env.SESSION_SECRET_2 || "your-secret-key-2",
  ],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours persistence
  httpOnly: true,
  sameSite: "lax",
});
