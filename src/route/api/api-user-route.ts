import { z } from "zod";
import { type Request, type Response, Router } from "express";

import ApiUserController from "#src/controller/api/ApiUserController.js";
import { validateBody } from "#src/util/middleware/validateBody.js";
import { UserScheme } from "#src/const/scheme/UserScheme.js";
import { UserPasswordUpdateScheme } from "#src/const/scheme/UserPasswordUpdateScheme.js";

const apiUserRoute = Router();

// --------------------------------------------- CRUD

apiUserRoute.get("/", (req: Request, res: Response) =>
  ApiUserController.getAllUsers(req, res),
);

apiUserRoute.get("/:id", (req: Request, res: Response) =>
  ApiUserController.getUser(req, res),
);

apiUserRoute.post(
  "/",
  validateBody(UserScheme),
  (req: Request, res: Response) => ApiUserController.addUser(req, res),
);

apiUserRoute.post(
  "/all",
  validateBody(z.array(UserScheme)),
  (req: Request, res: Response) => ApiUserController.setAllUsers(req, res),
);

apiUserRoute.put("/", validateBody(UserScheme), (req: Request, res: Response) =>
  ApiUserController.updateUser(req, res),
);

apiUserRoute.delete("/", (req: Request, res: Response) =>
  ApiUserController.deleteUser(req, res),
);

// --------------------------------------------- EXTRA

apiUserRoute.put(
  "/update-password",
  validateBody(UserPasswordUpdateScheme),
  (req: Request, res: Response) => ApiUserController.updatePassword(req, res),
);

export default apiUserRoute;
