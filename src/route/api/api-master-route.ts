import { Router } from "express";

import apiCartRoute from "#src/route/api/api-cart-route.js";
import apiOrderRoute from "#src/route/api/api-order-route.js";
import apiProductRoute from "#src/route/api/api-product-route.js";
import apiUserRoute from "#src/route/api/api-user-route.js";
import apiAuthRoute from "#src/route/api/api-auth-route.js";
import { isAuth } from "#src/util/middleware/is-auth.js";

const apiMasterRoute = Router();

apiMasterRoute.use("/auth", apiAuthRoute);
apiMasterRoute.use("/cart", isAuth, apiCartRoute);
apiMasterRoute.use("/order", isAuth, apiOrderRoute);
apiMasterRoute.use("/product", isAuth, apiProductRoute);
apiMasterRoute.use("/user", isAuth, apiUserRoute);

export default apiMasterRoute;
