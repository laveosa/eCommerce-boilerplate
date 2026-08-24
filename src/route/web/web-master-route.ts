import { type Request, type Response, Router } from "express";

import WebPageController from "#src/controller/web/WebPageController.js";
import { isAuth } from "#src/util/middleware/is-auth.js";
import { WebUrlEnum as wu } from "#src/const/enum/WebUrlEnum.js";

const webMasterRoute = Router();

webMasterRoute.get("/", isAuth, (req: Request, res: Response) =>
  res.redirect(wu.PRODUCT_LIST),
);

webMasterRoute.use(wu.AUTH, isAuth, (req: Request, res: Response) =>
  WebPageController.authPage(req, res),
);

webMasterRoute.use(wu.CART, isAuth, (req: Request, res: Response) =>
  WebPageController.cartPage(req, res),
);

webMasterRoute.use(wu.ORDER, isAuth, (req: Request, res: Response) =>
  WebPageController.orderPage(req, res),
);

webMasterRoute.use(wu.PRODUCT_LIST, isAuth, (req: Request, res: Response) =>
  WebPageController.productListPage(req, res),
);

webMasterRoute.use(wu.PRODUCT_ADMIN, isAuth, (req: Request, res: Response) =>
  WebPageController.productAdminPage(req, res),
);

webMasterRoute.use(wu.ADD_PRODUCT, isAuth, (req: Request, res: Response) =>
  WebPageController.addProductPage(req, res),
);

webMasterRoute.use(wu.EDIT_PRODUCT, isAuth, (req: Request, res: Response) =>
  WebPageController.editProductPage(req, res),
);

webMasterRoute.use(wu.PRODUCT_DETAILS, isAuth, (req: Request, res: Response) =>
  WebPageController.productDetailsPage(req, res),
);

webMasterRoute.use(wu.USER, isAuth, (req: Request, res: Response) =>
  WebPageController.userPage(req, res),
);

webMasterRoute.use(wu.NOT_FOUND, (req: Request, res: Response) =>
  WebPageController.pageNotFound(req, res),
);

export default webMasterRoute;
