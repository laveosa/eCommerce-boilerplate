import "express-session";
import type { UserModel } from "#src/const/scheme/UserScheme.js";

declare module "express-session" {
  interface SessionData {
    userId?: string | null;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: UserModel | null;
    }
  }
}
