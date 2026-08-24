import { Router } from "express";

import apiCartRoute from "#src/route/api/api-cart-route.js";
import apiOrderRoute from "#src/route/api/api-order-route.js";
import apiProductRoute from "#src/route/api/api-product-route.js";
import apiUserRoute from "#src/route/api/api-user-route.js";
import apiAuthRoute from "#src/route/api/api-auth-route.js";

const apiMasterRoute = Router();

apiMasterRoute.use("/cart", apiCartRoute);
apiMasterRoute.use("/order", apiOrderRoute);
apiMasterRoute.use("/product", apiProductRoute);
apiMasterRoute.use("/user", apiUserRoute);
apiMasterRoute.use("/auth", apiAuthRoute);

export default apiMasterRoute;
