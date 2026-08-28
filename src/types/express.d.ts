import type { UserModel } from "#src/const/scheme/UserScheme.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserModel | null;
    }
  }
}
