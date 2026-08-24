import { getErrorModel } from "#src/util/helper/messages-helper.js";
import type { ICartService } from "#src/const/interface/ICartService.js";
import type { CartModel } from "#src/const/scheme/CartScheme.js";

export default class CartService implements ICartService {
  tableName: string = "carts";

  // --------------------------------------------- CRUD

  async set(data: CartModel[]): Promise<CartModel[]> {
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

  async get(): Promise<CartModel[]> {
    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get all");
    }
  }

  async getCart(id: number): Promise<CartModel> {
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

  async addCart(data: CartModel): Promise<CartModel> {
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

  async updateCart(data: CartModel): Promise<CartModel> {
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

  async deleteCart(id: number): Promise<CartModel> {
    if (isNaN(id)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);
    }

    const deleted: CartModel = await this.getCart(id);

    try {
      // TODO place db logic

      return deleted;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  // --------------------------------------------- EXTRA

  async getCartByUserId(userId: number): Promise<CartModel> {
    if (isNaN(userId)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${userId}"`);
    }

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  async addProductToCart(
    productId: number,
    cartId: number,
  ): Promise<CartModel> {
    if (isNaN(productId)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${productId}"`);
    }

    try {
      // create cart if there is none and place there new product
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  async removeProductFromCart(
    productId: number,
    cartId: number,
  ): Promise<CartModel> {
    if (isNaN(productId)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${productId}"`);
    }

    if (isNaN(cartId)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${cartId}"`);
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
      // check if there is a table and create if there is none
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
