import type { Request, Response } from "express";

import CartService from "#src/service/CartService.js";
import { isApiError } from "#src/util/helper/messages-helper.js";
import type { IApiCartController } from "#src/const/interface/IApiCartController.js";
import type { CartModel } from "#src/const/scheme/CartScheme.js";

class ApiCartController {
  private static cartService = new CartService();

  // --------------------------------------------- CRUD

  static async setAllCarts(req: Request, res: Response) {
    try {
      const carts: CartModel[] = await this.cartService.set(req.body);
      return res.status(200).send(carts);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async getAllCarts(req: Request, res: Response) {
    try {
      const carts: CartModel[] = await this.cartService.get();
      return res.status(200).send(carts);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async getCart(req: Request, res: Response) {
    const cartId = Number(req.params.id);

    try {
      const cart: CartModel = await this.cartService.getCart(cartId);
      return res.status(200).send(cart);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async addCart(req: Request, res: Response) {
    try {
      const cart: CartModel = await this.cartService.addCart(req.body);
      return res.status(200).send(cart);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async updateCart(req: Request, res: Response) {
    try {
      const cart: CartModel = await this.cartService.updateCart(req.body);
      return res.status(200).send(cart);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async deleteCart(req: Request, res: Response) {
    const cartId = Number(req.params.id);

    try {
      const cart: CartModel = await this.cartService.deleteCart(cartId);
      return res.status(200).send(cart);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  // --------------------------------------------- EXTRA

  static async getCartByUserId(req: Request, res: Response) {
    const userId = Number(req.params.id);

    try {
      const cart: CartModel = await this.cartService.getCartByUserId(userId);
      return res.status(200).send(cart);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async addProductToCart(req: Request, res: Response) {
    const productId = Number(req.params.productId);
    const cartId = Number(req.params.cartId);

    try {
      const cart: CartModel = await this.cartService.addProductToCart(
        productId,
        cartId,
      );
      return res.status(200).send(cart);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async removeProductFromCart(req: Request, res: Response) {
    const productId = Number(req.params.productId);
    const cartId = Number(req.params.cartId);

    try {
      const cart: CartModel = await this.cartService.removeProductFromCart(
        productId,
        cartId,
      );
      return res.status(200).send(cart);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }
}

export default ApiCartController satisfies IApiCartController;
