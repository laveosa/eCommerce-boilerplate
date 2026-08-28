import { Order } from "#src/const/model/OrderModel.js";
import { getErrorModel } from "#src/util/helper/messages-helper.js";
import type { IOrderService } from "#src/const/interface/IOrderService.js";
import type { OrderModel } from "#src/const/scheme/OrderScheme.js";

export default class OrderService implements IOrderService {
  async set(data: OrderModel[]): Promise<OrderModel[]> {
    if (!data || !Array.isArray(data)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data payload`);
    }

    try {
      await Order.deleteMany({});
      await Order.insertMany(data);
      return this.get();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to set all");
    }
  }

  async get(): Promise<OrderModel[]> {
    try {
      const order = await Order.find();
      return order.map((o) => o.toObject<OrderModel>());
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get all");
    }
  }

  async getOrder(id: string): Promise<OrderModel> {
    if (!id || id.length === 0) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);
    }

    try {
      const order = await Order.findById(id);

      if (!order) {
        throw getErrorModel(404, "[SERVER_ERROR]: cart not found!");
      }

      return order.toObject<OrderModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get");
    }
  }

  async addOrder(data: OrderModel): Promise<OrderModel> {
    if (!data || typeof data !== "object") {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data: "${data}"`);
    }

    try {
      const order = await Order.create(data);

      console.log("ORDER: ", order);

      return order.toObject<OrderModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to add");
    }
  }

  async updateOrder(data: OrderModel): Promise<OrderModel> {
    if (!data || typeof data !== "object" || !data.id || data.id.length === 0) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${data?.id}"`,
      );
    }

    try {
      const updated = await Order.findByIdAndUpdate(data.id, data, {
        returnDocument: "after",
        runValidators: true,
      });

      if (!updated) {
        throw getErrorModel(404, "[SERVER_ERROR]: cart not found!");
      }

      return updated.toObject<OrderModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }
  }

  async deleteOrder(id: string): Promise<OrderModel> {
    if (!id || id.length === 0) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);
    }

    try {
      const deleted = await Order.findByIdAndDelete(id);

      if (!deleted) {
        throw getErrorModel(404, "[SERVER_ERROR]: cart not found!");
      }

      return deleted.toObject<OrderModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  // --------------------------------------------- EXTRA

  async getOrderByUserId(userId: string): Promise<OrderModel> {
    if (!userId || userId.length === 0) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${userId}"`);
    }

    try {
      const order = await Order.findOne({
        userId,
      });

      if (!order) {
        // throw getErrorModel(404, "[SERVER_ERROR]: order not found!");
        console.log("[SERVER_ERROR]: order not found!");
        return null;
      }

      return order.toObject<OrderModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  async addCartToOrder(
    cartId: string,
    orderId: string,
    userId: string,
  ): Promise<OrderModel> {
    if (!userId || !cartId) {
      throw getErrorModel(400, "[SERVER_ERROR]: invalid userId or cartId");
    }

    try {
      const order = await Order.findOneAndUpdate(
        { orderId },
        {
          $setOnInsert: {
            cartId,
            userId,
            registerDate: new Date(),
          },
        },
        {
          returnDocument: "after",
          runValidators: true,
          upsert: true,
        },
      );

      return order.toObject<OrderModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  async removeCartFromOrder(
    _cartId: string,
    orderId: string,
  ): Promise<OrderModel> {
    if (!orderId || !_cartId) {
      throw getErrorModel(400, "[SERVER_ERROR]: invalid orderId or cartId");
    }

    try {
      const updateOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          $set: {
            cartId: {
              $cond: {
                if: { $eq: ["$cartId", _cartId] },
                then: null,
                else: "$cartId",
              },
            },
          },
        },
        {
          returnDocument: "after",
          runValidators: true,
        },
      );

      if (!updateOrder) {
        throw getErrorModel(404, "[SERVER_ERROR]: order not found");
      }

      return updateOrder.toObject<OrderModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }
}
