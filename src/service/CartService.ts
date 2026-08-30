import mongoose from "mongoose";

import { Cart } from "#src/const/model/CartModel.js";
import { Product } from "#src/const/model/ProductModel.js";
import { Order } from "#src/const/model/OrderModel.js";
import { getErrorModel } from "#src/util/helper/messages-helper.js";
import ProductService from "#src/service/ProductService.js";
import type { ICartService } from "#src/const/interface/ICartService.js";
import type { CartModel } from "#src/const/scheme/CartScheme.js";
import type { ProductModel } from "#src/const/scheme/ProductScheme.js";

export default class CartService implements ICartService {
  private productService = new ProductService();

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

    let cart;

    try {
      cart = await Cart.findById(id);
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get");
    }

    if (!cart) {
      throw getErrorModel(404, "[SERVER_ERROR]: cart not found!");
    }

    return cart.toObject<CartModel>();
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

    let updated;

    try {
      updated = await Cart.findByIdAndUpdate(data.id, data, {
        returnDocument: "after",
        runValidators: true,
      });
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }

    if (!updated) {
      throw getErrorModel(404, "[SERVER_ERROR]: cart not found!");
    }

    return updated.toObject<CartModel>();
  }

  async deleteCart(id: string): Promise<CartModel> {
    if (!id || id.length === 0) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);
    }

    let cart;

    try {
      cart = await Cart.findById(id);
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get cart");
    }

    if (!cart) {
      throw getErrorModel(404, "[SERVER_ERROR]: cart not found!");
    }

    if (cart.products && cart.products.length > 0) {
      try {
        const productIds = cart.products
          .map((p) => p.id || (p as any)._id)
          .filter((id): id is string => Boolean(id));

        if (productIds.length > 0) {
          await Product.updateMany(
            { _id: { $in: productIds } },
            { $set: { inCart: false } },
          );
        }
      } catch (err) {
        throw getErrorModel(
          500,
          err,
          "[SERVER_ERROR]: failed to remove cart products",
        );
      }
    }

    try {
      await Order.findOneAndDelete({
        cartId: id,
      });
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get order");
    }

    try {
      const deleted = await Cart.findByIdAndDelete(id);
      return deleted!.toObject<CartModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete cart");
    }
  }

  // --------------------------------------------- EXTRA

  async getCartByUserId(userId: string): Promise<CartModel> {
    if (!userId || userId.length === 0) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${userId}"`);
    }

    let cart;

    try {
      cart = await Cart.findOne({
        userId,
      });
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get");
    }

    if (!cart) {
      // throw getErrorModel(404, "[SERVER_ERROR]: cart not found!");
      console.log("[SERVER_ERROR]: cart not found!");
      return null;
    }

    return cart.toObject<CartModel>();
  }

  async addProductToCart(
    productId: string,
    cartId: string,
    userId: string,
  ): Promise<CartModel> {
    if (!productId || !userId) {
      throw getErrorModel(400, "[SERVER_ERROR]: invalid productId or userId");
    }

    let product;

    try {
      product = await this.productService.getProduct(productId);
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get product");
    }

    if (!product) {
      throw getErrorModel(
        404,
        `[SERVER_ERROR]: product not found ID: "${productId}"`,
      );
    }

    try {
      const cart = await Cart.findOneAndUpdate(
        { userId },
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

      const updateProduct: ProductModel =
        await this.productService.updateProduct({
          ...product,
          inCart: true,
        });

      const productForCart = {
        ...updateProduct,
        _id: new mongoose.Types.ObjectId(updateProduct.id || productId),
      };

      cart.products.push(productForCart as any);
      cart.totalItems = cart.products.length;
      cart.totalPrice = Number(
        cart.products.reduce((acc, item) => acc + item.price, 0).toFixed(2),
      );

      const savedCart = await cart.save();
      return savedCart.toObject<CartModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to add product");
    }
  }

  async removeProductFromCart(
    productId: string,
    cartId: string,
  ): Promise<CartModel> {
    if (!productId || !cartId) {
      throw getErrorModel(400, "[SERVER_ERROR]: invalid productId or cartId");
    }

    let product;

    try {
      product = await this.productService.getProduct(productId);
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get product");
    }

    if (!product) {
      throw getErrorModel(
        404,
        `[SERVER_ERROR]: product not found ID: "${productId}"`,
      );
    }

    let cart;

    try {
      cart = await Cart.findById(cartId);
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get cart");
    }

    if (!product) {
      throw getErrorModel(404, "[SERVER_ERROR]: cart not found");
    }

    try {
      cart.products = cart.products.filter(
        (item: any) =>
          item._id?.toString() !== productId && item.id !== productId,
      );
      cart.totalItems = cart.products.length;
      cart.totalPrice = Number(
        cart.products.reduce((acc, item) => acc + item.price, 0).toFixed(2),
      );

      const savedCart = await cart.save();

      await this.productService.updateProduct({
        ...product,
        inCart: false,
      });

      return savedCart.toObject<CartModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to remove product");
    }
  }
}
