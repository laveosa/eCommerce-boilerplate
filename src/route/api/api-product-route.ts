import { z } from "zod";
import { type Request, type Response, Router } from "express";

import ApiProductController from "#src/controller/api/ApiProductController.js";
import { validateBody } from "#src/util/middleware/validateBody.js";
import { ProductScheme } from "#src/const/scheme/ProductScheme.js";

const apiProductRoute = Router();

// --------------------------------------------- CRUD

apiProductRoute.get("/", (req: Request, res: Response) =>
  ApiProductController.getAllProducts(req, res),
);

apiProductRoute.get("/:id", (req: Request, res: Response) =>
  ApiProductController.getProduct(req, res),
);

apiProductRoute.post(
  "/",
  validateBody(ProductScheme),
  (req: Request, res: Response) => ApiProductController.addProduct(req, res),
);

apiProductRoute.post(
  "/all",
  validateBody(z.array(ProductScheme)),
  (req: Request, res: Response) =>
    ApiProductController.setAllProducts(req, res),
);

apiProductRoute.put(
  "/",
  validateBody(ProductScheme),
  (req: Request, res: Response) => ApiProductController.updateProduct(req, res),
);

apiProductRoute.delete("/all", (req: Request, res: Response) =>
  ApiProductController.deleteAllProducts(req, res),
);

apiProductRoute.delete("/:id", (req: Request, res: Response) =>
  ApiProductController.deleteProduct(req, res),
);

// --------------------------------------------- EXTRA

apiProductRoute.post("/generate-products", (req: Request, res: Response) =>
  ApiProductController.generateProducts(req, res),
);

export default apiProductRoute;
