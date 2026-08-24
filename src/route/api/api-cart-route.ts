import { z } from "zod";
import { type Request, type Response, Router } from "express";

import ApiCartController from "#src/controller/api/ApiCartController.js";
import { validateBody } from "#src/util/middleware/validateBody.js";
import { CartScheme } from "#src/const/scheme/CartScheme.js";

const apiCartRoute = Router();

// --------------------------------------------- CRUD

apiCartRoute.get("/", (req: Request, res: Response) =>
  ApiCartController.getAllCarts(req, res),
);

apiCartRoute.get("/:id", (req: Request, res: Response) =>
  ApiCartController.getCart(req, res),
);

apiCartRoute.post(
  "/",
  validateBody(CartScheme),
  (req: Request, res: Response) => ApiCartController.addCart(req, res),
);

apiCartRoute.post(
  "/all",
  validateBody(z.array(CartScheme)),
  (req: Request, res: Response) => ApiCartController.setAllCarts(req, res),
);

apiCartRoute.put("/", validateBody(CartScheme), (req: Request, res: Response) =>
  ApiCartController.updateCart(req, res),
);

apiCartRoute.delete("/:id", (req: Request, res: Response) =>
  ApiCartController.deleteCart(req, res),
);

// --------------------------------------------- EXTRA

apiCartRoute.get("/by-user-id/:id", (req: Request, res: Response) =>
  ApiCartController.getCartByUserId(req, res),
);

apiCartRoute.post(
  "/add-product/:productId/:cartId",
  (req: Request, res: Response) => ApiCartController.addProductToCart(req, res),
);

apiCartRoute.delete(
  "/remove-product/:productId/:cartId",
  (req: Request, res: Response) =>
    ApiCartController.removeProductFromCart(req, res),
);

export default apiCartRoute;
