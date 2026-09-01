import { type Request, type Response, Router } from "express";

import ApiAuthController from "#src/controller/api/ApiAuthController.js";
import { validateBody } from "#src/util/middleware/validateBody.js";
import { AuthScheme } from "#src/const/scheme/AuthScheme.js";

const apiAuthRoute = Router();

apiAuthRoute.post(
  "/register",
  validateBody(AuthScheme),
  (req: Request, res: Response) => ApiAuthController.register(req, res),
);

apiAuthRoute.post(
  "/sign-in",
  validateBody(AuthScheme),
  (req: Request, res: Response) => ApiAuthController.signIn(req, res),
);

apiAuthRoute.post("/sign-out", (req: Request, res: Response) =>
  ApiAuthController.signOut(req, res),
);

export default apiAuthRoute;
