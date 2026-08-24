import type { Request, Response } from "express";

import ProductService from "#src/service/ProductService.js";
import { isApiError } from "#src/util/helper/messages-helper.js";
import type { IApiProductController } from "#src/const/interface/IApiProductController.js";
import type { ProductModel } from "#src/const/scheme/ProductScheme.js";

class ApiProductController {
  private static productService = new ProductService();

  // --------------------------------------------- CRUD

  static async setAllProducts(req: Request, res: Response) {
    try {
      const products: ProductModel[] = await this.productService.set(req.body);
      return res.status(200).send(products);
    } catch (error) {
      isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async getAllProducts(req: Request, res: Response) {
    try {
      const products: ProductModel[] = await this.productService.get();
      return res.status(200).send(products);
    } catch (error) {
      isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async getProduct(req: Request, res: Response) {
    const productId = Number(req.params.id);

    try {
      const product: ProductModel =
        await this.productService.getProduct(productId);
      return res.status(200).send(product);
    } catch (error) {
      isApiError(error)
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
      isApiError(error)
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
      isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    const productId = Number(req.params.id);

    try {
      const product: ProductModel =
        await this.productService.deleteProduct(productId);
      return res.status(200).send(product);
    } catch (error) {
      isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  // --------------------------------------------- EXTRA
}

export default ApiProductController satisfies IApiProductController;
