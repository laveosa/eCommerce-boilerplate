import type { Request, Response } from "express";

import OrderService from "#src/service/OrderService.js";
import { isApiError } from "#src/util/helper/messages-helper.js";
import type { IApiOrderController } from "#src/const/interface/IApiOrderController.js";
import type { OrderModel } from "#src/const/scheme/OrderScheme.js";

class ApiOrderController {
  private static orderService = new OrderService();

  // --------------------------------------------- CRUD

  static async setAllOrders(req: Request, res: Response) {
    try {
      const orders: OrderModel[] = await this.orderService.set(req.body);
      return res.status(200).send(orders);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async getAllOrders(req: Request, res: Response) {
    try {
      const orders: OrderModel[] = await this.orderService.get();
      return res.status(200).send(orders);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async getOrder(req: Request, res: Response) {
    const orderId = Number(req.params.orderId);

    try {
      const order: OrderModel = await this.orderService.getOrder(orderId);
      return res.status(200).send(order);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async addOrder(req: Request, res: Response) {
    try {
      const order: OrderModel = await this.orderService.addOrder(req.body);
      return res.status(200).send(order);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async updateOrder(req: Request, res: Response) {
    try {
      const order: OrderModel = await this.orderService.updateOrder(req.body);
      return res.status(200).send(order);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async deleteOrder(req: Request, res: Response) {
    const orderId = Number(req.params.orderId);

    try {
      const order: OrderModel = await this.orderService.deleteOrder(orderId);
      return res.status(200).send(order);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  // --------------------------------------------- EXTRA

  static async addCartToOrder(req: Request, res: Response) {
    const cartId = Number(req.params.cartId);
    const orderId = Number(req.params.orderId);

    try {
      const order: OrderModel = await this.orderService.addCartToOrder(
        cartId,
        orderId,
      );
      return res.status(200).send(order);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async removeCartFromOrder(req: Request, res: Response) {
    const cartId = Number(req.params.cartId);
    const orderId = Number(req.params.orderId);

    try {
      const order: OrderModel = await this.orderService.removeCartFromOrder(
        cartId,
        orderId,
      );
      return res.status(200).send(order);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }
}

export default ApiOrderController satisfies IApiOrderController;
