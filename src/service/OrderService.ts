import { getErrorModel } from "#src/util/helper/messages-helper.js";
import type { IOrderService } from "#src/const/interface/IOrderService.js";
import type { OrderModel } from "#src/const/scheme/OrderScheme.js";

export default class OrderService implements IOrderService {
  tableName: string = "orders";

  // --------------------------------------------- CRUD

  async set(data: OrderModel[]): Promise<OrderModel[]> {
    if (!data || !Array.isArray(data)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data payload`);
    }

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return this.get();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to set all");
    }
  }

  async get(): Promise<OrderModel[]> {
    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get all");
    }
  }

  async getOrder(id: number): Promise<OrderModel> {
    if (isNaN(id))
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get");
    }
  }

  async addOrder(data: OrderModel): Promise<OrderModel> {
    if (!data || typeof data !== "object") {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data: "${data}"`);
    }

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to add");
    }
  }

  async updateOrder(data: OrderModel): Promise<OrderModel> {
    if (!data || isNaN(data.id)) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${data?.id}"`,
      );
    }

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }
  }

  async deleteOrder(id: number): Promise<OrderModel> {
    if (isNaN(id)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);
    }

    const deleted: OrderModel = await this.getOrder(id);

    try {
      // TODO place db logic

      return deleted;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  // --------------------------------------------- EXTRA

  async addCartToOrder(cartId: number, orderId: number): Promise<OrderModel> {
    if (isNaN(cartId)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid cart id: "${cartId}"`);
    }

    if (isNaN(orderId)) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid order id: "${orderId}"`,
      );
    }

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  async removeCartFromOrder(
    cartId: number,
    orderId: number,
  ): Promise<OrderModel> {
    if (isNaN(cartId)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid cart id: "${cartId}"`);
    }

    if (isNaN(orderId)) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid order id: "${orderId}"`,
      );
    }

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  // ======================================== PRIVATE

  private async tableInitCheck() {
    try {
      // TODO place db logic
    } catch (err) {
      throw getErrorModel(
        500,
        err,
        `[SERVER_ERROR]: failed to initialize ${this.tableName} table`,
      );
    }
  }
}
