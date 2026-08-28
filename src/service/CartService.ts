import mongoose from "mongoose";

import { Cart } from "#src/const/model/CartModel.js";
import { getErrorModel } from "#src/util/helper/messages-helper.js";
import type { ICartService } from "#src/const/interface/ICartService.js";
import type { CartModel } from "#src/const/scheme/CartScheme.js";

export default class CartService implements ICartService {
  async set(data: CartModel[]): Promise<CartModel[]> {
    if (!data || !Array.isArray(data)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data payload`);
    }

    try {
      await Cart.deleteMany({});
      await Cart.insertMany(data);
      return this.get();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to set all");
    }
  }

  async get(): Promise<CartModel[]> {
    try {
      const cart = await Cart.find();
      return cart.map((c) => c.toObject<CartModel>());
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get all");
    }
  }

  async getCart(id: string): Promise<CartModel> {
    if (!id || id.length === 0)
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);

    try {
      const cart = await Cart.findById(id);

      if (!cart) {
        throw getErrorModel(404, "[SERVER_ERROR]: cart not found!");
      }

      return cart.toObject<CartModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get");
    }
  }

  async addCart(data: CartModel): Promise<CartModel> {
    if (!data || typeof data !== "object") {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data: "${data}"`);
    }

    try {
      const cart = await Cart.create(data);
      return cart.toObject<CartModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to add");
    }
  }

  async updateCart(data: CartModel): Promise<CartModel> {
    if (!data || typeof data !== "object" || !data.id || data.id.length === 0) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${data?.id}"`,
      );
    }

    try {
      const updated = await Cart.findByIdAndUpdate(data.id, data, {
        returnDocument: "after",
        runValidators: true,
      });

      if (!updated) {
        throw getErrorModel(404, "[SERVER_ERROR]: cart not found!");
      }

      return updated.toObject<CartModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }
  }

  async deleteCart(id: string): Promise<CartModel> {
    if (!id || id.length === 0) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);
    }

    try {
      const deleted = await Cart.findByIdAndDelete(id, {
        returnDocument: "after",
      });

      if (!deleted) {
        throw getErrorModel(404, "[SERVER_ERROR]: cart not found!");
      }

      return deleted.toObject<CartModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  // --------------------------------------------- EXTRA

  async getCartByUserId(userId: string): Promise<CartModel> {
    if (!userId || userId.length === 0) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${userId}"`);
    }

    try {
      const cart = await Cart.findOne({
        userId,
      });

      if (!cart) {
        throw getErrorModel(404, "[SERVER_ERROR]: cart not found!");
      }

      return cart.toObject<CartModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  async addProductToCart(
    productId: string,
    cartId: string,
    userId: string,
  ): Promise<CartModel> {
    if (!productId || !userId) {
      throw getErrorModel(400, "[SERVER_ERROR]: invalid productId or userId");
    }

    try {
      const cart = await Cart.findOneAndUpdate(
        { cartId },
        {
          $setOnInsert: {
            userId,
            registerDate: new Date(),
            products: [],
            totalItems: 0,
            totalPrice: 0,
          },
        },
        {
          returnDocument: "after",
          upsert: true,
          runValidators: true,
        },
      );

      return cart.toObject<CartModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  async removeProductFromCart(
    productId: string,
    cartId: string,
  ): Promise<CartModel> {
    if (!productId || !cartId) {
      throw getErrorModel(400, "[SERVER_ERROR]: invalid productId or cartId");
    }

    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        cartId,
        [
          {
            $set: {
              products: {
                $filter: {
                  input: "$products",
                  as: "item",
                  cond: {
                    $ne: ["$$item._id", new mongoose.Types.ObjectId(productId)],
                  },
                },
              },
            },
          },
          {
            $set: {
              totalItems: { $size: "$products" },
              totalPrice: { $sum: "$products.price" },
            },
          },
        ],
        { returnDocument: "after", runValidators: true },
      );

      if (!updatedCart) {
        throw getErrorModel(404, "[SERVER_ERROR]: cart not found");
      }

      return updatedCart.toObject<CartModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }
}
