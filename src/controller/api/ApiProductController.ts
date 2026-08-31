import type { Request, Response } from "express";

import ProductService from "#src/service/ProductService.js";
import { isApiError } from "#src/util/helper/messages-helper.js";
import { getStubProducts } from "#src/util/service/stub-data-provider-service.js";
import type { IApiProductController } from "#src/const/interface/IApiProductController.js";
import type { ProductModel } from "#src/const/scheme/ProductScheme.js";
import type { IPaginatedResult } from "#src/const/interface/IPaginatedResult.js";

class ApiProductController {
  private static productService = new ProductService();

  // --------------------------------------------- CRUD

  static async setAllProducts(req: Request, res: Response) {
    try {
      const products: ProductModel[] = await this.productService.set(req.body);
      return res.status(200).send(products);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async getAllProducts(req: Request, res: Response) {
    const search = typeof req.query.search === "string" ? req.query.search : "";
    const page =
      typeof req.query.page === "string" ? parseInt(req.query.page, 10) : 1;
    const perPage =
      typeof req.query.perPage === "string"
        ? parseInt(req.query.perPage, 10)
        : 6;

    try {
      const result: IPaginatedResult<ProductModel> =
        await this.productService.get(search, page, perPage);
      return res.status(200).send(result);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async getProduct(req: Request, res: Response) {
    const productId = req.params.id.toString();

    try {
      const product: ProductModel =
        await this.productService.getProduct(productId);
      return res.status(200).send(product);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async addProduct(req: Request, res: Response) {
    try {
      const product: ProductModel = await this.productService.addProduct(
        req.body,
      );
      return res.status(200).send(product);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const product: ProductModel = await this.productService.updateProduct(
        req.body,
      );
      return res.status(200).send(product);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    const productId = req.params.id.toString();

    try {
      const product: ProductModel =
        await this.productService.deleteProduct(productId);
      return res.status(200).send(product);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async deleteAllProducts(req: Request, res: Response) {
    try {
      const products: ProductModel[] =
        await this.productService.deleteAllProducts();
      return res.status(200).send(products);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  // --------------------------------------------- EXTRA

  static async generateProducts(req: Request, res: Response) {
    try {
      const products: ProductModel[] = await getStubProducts();
      const response: ProductModel[] = await this.productService.set(products);
      return res.status(200).send(response);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }
}

export default ApiProductController satisfies IApiProductController;
