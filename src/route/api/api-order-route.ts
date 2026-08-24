import { z } from "zod";
import { type Request, type Response, Router } from "express";

import ApiOrderController from "#src/controller/api/ApiOrderController.js";
import { validateBody } from "#src/util/middleware/validateBody.js";
import { OrderScheme } from "#src/const/scheme/OrderScheme.js";

const apiOrderRoute = Router();

// --------------------------------------------- CRUD

apiOrderRoute.get("/", (req: Request, res: Response) =>
  ApiOrderController.getAllOrders(req, res),
);

apiOrderRoute.get("/:id", (req: Request, res: Response) =>
  ApiOrderController.getOrder(req, res),
);

apiOrderRoute.post(
  "/",
  validateBody(OrderScheme),
  (req: Request, res: Response) => ApiOrderController.addOrder(req, res),
);

apiOrderRoute.post(
  "/all",
  validateBody(z.array(OrderScheme)),
  (req: Request, res: Response) => ApiOrderController.setAllOrders(req, res),
);

apiOrderRoute.put(
  "/",
  validateBody(OrderScheme),
  (req: Request, res: Response) => ApiOrderController.updateOrder(req, res),
);

apiOrderRoute.delete("/", (req: Request, res: Response) =>
  ApiOrderController.deleteOrder(req, res),
);

// --------------------------------------------- EXTRA

apiOrderRoute.post("/add-cart", (req: Request, res: Response) =>
  ApiOrderController.addCartToOrder(req, res),
);

apiOrderRoute.delete("/remove-cart", (req: Request, res: Response) =>
  ApiOrderController.removeCartFromOrder(req, res),
);

export default apiOrderRoute;
