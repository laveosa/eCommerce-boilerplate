import type { Request, Response } from "express";

import UserService from "#src/service/UserService.js";
import ProductService from "#src/service/ProductService.js";
import CartService from "#src/service/CartService.js";
import OrderService from "#src/service/OrderService.js";
import layoutService from "#src/util/service/layout-service.js";
import { pathResolve } from "#src/util/helper/path-helper.js";
import { isApiError } from "#src/util/helper/messages-helper.js";
import { WebUrlEnum, WebUrlEnum as wu } from "#src/const/enum/WebUrlEnum.js";
import type { IPageInfoAction } from "#src/const/interface/IPageInfoAction.js";
import type { CartModel } from "#src/const/scheme/CartScheme.js";
import type { ProductModel } from "#src/const/scheme/ProductScheme.js";
import type { OrderModel } from "#src/const/scheme/OrderScheme.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";
import type { IPaginatedResult } from "#src/const/interface/IPaginatedResult.js";

const rootPath = "./src/view/page";

export default class WebPageController {
  private static userService = new UserService();
  private static productService = new ProductService();
  private static cartService = new CartService();
  private static orderService = new OrderService();

  static async authPage(req: Request, res: Response) {
    const condition = req.query.condition;

    try {
      res.render(
        pathResolve([rootPath, "/auth-page/auth.ejs"]),
        await this.generatePageData("Auth", wu.AUTH, {
          user: req.user,
          condition: condition ? condition : "signin",
        }),
      );
    } catch (error: any) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async cartPage(req: Request, res: Response) {
    try {
      const cart: CartModel = await this.cartService.getCartByUserId(
        req.user.id,
      );
      const order: OrderModel = await this.orderService.getOrderByUserId(
        req.user.id,
      );

      res.render(
        pathResolve([rootPath, "/cart-page/cart.ejs"]),
        await this.generatePageData("Cart", wu.CART, {
          user: req.user,
          cart,
          order,
        }),
      );
    } catch (error: any) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async orderPage(req: Request, res: Response) {
    try {
      const order: OrderModel = await this.orderService.getOrderByUserId(
        req.user.id,
      );

      res.render(
        pathResolve([rootPath, "/order-page/order.ejs"]),
        await this.generatePageData("Order", wu.ORDER, {
          user: req.user,
          order,
        }),
      );
    } catch (error: any) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async productListPage(req: Request, res: Response) {
    try {
      const products: ProductModel[] = await this.productService.get();

      // TODO replace with valid db data
      const result: IPaginatedResult<ProductModel> = {
        data: products,
        pagination: {
          current: 1,
          total: 10,
          prevPage: null,
          nextPage: 2,
        },
        filters: {
          search: "some search text",
        },
      };

      res.render(
        pathResolve([rootPath, "/product-list-page/product-list.ejs"]),
        await this.generatePageData("Product List", wu.PRODUCT_LIST, {
          user: req.user,
          products,
          pagination: result.pagination,
          search: result.filters.search,
        }),
      );
    } catch (error: any) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async productAdminPage(req: Request, res: Response) {
    try {
      const products: ProductModel[] = await this.productService.get();

      // TODO replace with valid db data
      const result: IPaginatedResult<ProductModel> = {
        data: products,
        pagination: {
          current: 1,
          total: 10,
          prevPage: null,
          nextPage: 2,
        },
        filters: {
          search: "some search text",
        },
      };

      // const products: ProductModel[] = await this.productService.get();

      res.render(
        pathResolve([rootPath, "/product-admin-page/product-admin.ejs"]),
        await this.generatePageData("Product Admin", wu.PRODUCT_ADMIN, {
          user: req.user,
          products,
          pagination: result.pagination,
          search: result.filters.search,
        }),
      );
    } catch (error: any) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async addProductPage(req: Request, res: Response) {
    try {
      res.render(
        pathResolve([rootPath, "/add-product-page/add-product.ejs"]),
        await this.generatePageData("Add Product", wu.ADD_PRODUCT, {
          user: req.user,
        }),
      );
    } catch (error: any) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async editProductPage(req: Request, res: Response) {
    const productId = req.params.id.toString();

    try {
      const product: ProductModel =
        await this.productService.getProduct(productId);

      res.render(
        pathResolve([rootPath, "/edit-product-page/edit-product.ejs"]),
        await this.generatePageData("Edit Page", wu.EDIT_PRODUCT, {
          user: req.user,
          product,
        }),
      );
    } catch (error: any) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async productDetailsPage(req: Request, res: Response) {
    const productId = req.params.id.toString();

    try {
      const product: ProductModel =
        await this.productService.getProduct(productId);

      res.render(
        pathResolve([rootPath, "/product-details-page/product-details.ejs"]),
        await this.generatePageData("Product Details", wu.PRODUCT_DETAILS, {
          user: req.user,
          product,
        }),
      );
    } catch (error: any) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async userPage(req: Request, res: Response) {
    try {
      const user: UserModel = await this.userService.getUser(req.user.id);
      res.render(
        pathResolve([rootPath, "/user-page/user.ejs"]),
        await this.generatePageData("User", wu.USER, { user }),
      );
    } catch (error: any) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async pageNotFound(req: Request, res: Response) {
    try {
      res.render(
        pathResolve([rootPath, "/page-not-found/page-not-found.ejs"]),
        await this.generatePageData("404", wu.NOT_FOUND, {
          user: req.user,
          author: "Nik",
        }),
      );
    } catch (error: any) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  // =================================================== PRIVATE

  private static async generatePageData(
    title: string,
    path: WebUrlEnum,
    extraData: any,
  ) {
    const user: UserModel = extraData.user;
    let cart: CartModel = null;

    if (user) {
      cart = await this.cartService.getCartByUserId(user.id);
    }

    return {
      user,
      cart,
      pageTitle: title,
      pagePath: path,
      navList: path ? layoutService.getNavigationList(path) : null,
      pageInfo: this.getPageInfoData(path),
      ...extraData,
    };
  }

  private static getPageInfoData(path: WebUrlEnum): IPageInfoAction {
    switch (path) {
      case WebUrlEnum.ADD_PRODUCT:
        return {
          label: "admin",
          title: "new product",
        };
      case WebUrlEnum.EDIT_PRODUCT:
        return {
          label: "admin",
          title: "edit product",
        };
      case WebUrlEnum.PRODUCT_LIST:
        return {
          label: "collection",
          title: "all products",
          showSearch: true,
        };
      case WebUrlEnum.PRODUCT_ADMIN:
        return {
          label: "admin",
          title: "manage products",
          showSearch: true,
          showCreateBtn: true,
          showDeleteAllBtn: true,
        };
      case WebUrlEnum.CART:
        return {
          label: "cart",
          title: "your bag",
        };
      case WebUrlEnum.ORDER:
        return {
          label: "order",
          title: "your order",
        };
      case WebUrlEnum.USER:
        return {
          label: "account",
          title: "your profile",
        };
      default:
        return {
          label: "no label",
          title: "no title",
        };
    }
  }
}
