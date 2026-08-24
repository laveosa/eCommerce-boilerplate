import { type Request, type Response, Router } from "express";

import ApiAuthController from "#src/controller/api/ApiAuthController.js";
import { validateBody } from "#src/util/middleware/validateBody.js";
import { UserScheme } from "#src/const/scheme/UserScheme.js";

const apiAuthRoute = Router();

apiAuthRoute.post(
  "/register",
  validateBody(UserScheme),
  (req: Request, res: Response) => ApiAuthController.register(req, res),
);

apiAuthRoute.post(
  "/sign-in",
  validateBody(UserScheme),
  (req: Request, res: Response) => ApiAuthController.signIn(req, res),
);

apiAuthRoute.post("/sign-out", (req: Request, res: Response) =>
  ApiAuthController.signOut(req, res),
);

export default apiAuthRoute;
