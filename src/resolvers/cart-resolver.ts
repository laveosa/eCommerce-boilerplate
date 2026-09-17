import { isApiError } from "#src/util/helper/messages-helper.js";
import ProductService from "#src/service/ProductService.js";
import CartService from "#src/service/CartService.js";
import type { ProductModel } from "#src/const/model/ProductModel.js";
import type { IPaginatedResult } from "#src/const/interface/IPaginatedResult.js";
import type { CartModel } from "#src/const/model/CartModel.js";

const productService = new ProductService();
const cartService = new CartService();

export const cartResolver = {
  Cart: {
    products: async (
      _: undefined,
      {
        search,
        page,
        perPage,
      }: { search?: string; page?: number; perPage?: number },
    ): Promise<IPaginatedResult<ProductModel>> => {
      try {
        return await productService.get(search, page, perPage);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
  },
  Query: {
    carts: async (): Promise<CartModel[]> => {
      try {
        return cartService.get();
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    cart: async (_: unknown, { id }: { id: string }): Promise<CartModel> => {
      try {
        return cartService.getCart(id);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    cartByUserId: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<CartModel> => {
      try {
        return cartService.getCartByUserId(id);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
  },
  Mutation: {
    addCarts: async (
      _: unknown,
      { data }: { data: CartModel[] },
    ): Promise<CartModel[]> => {
      try {
        return cartService.set(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    addCart: async (
      _: unknown,
      { data }: { data: CartModel },
    ): Promise<CartModel> => {
      try {
        return cartService.addCart(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    updateCart: async (
      _: unknown,
      { data }: { data: CartModel },
    ): Promise<CartModel> => {
      try {
        return cartService.updateCart(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    deleteCart: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<CartModel> => {
      try {
        return cartService.deleteCart(id);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    addProductToCart: async (
      _: unknown,
      {
        productId,
        cartId,
        userId,
      }: { productId: string; cartId: string; userId: string },
    ): Promise<CartModel> => {
      try {
        return cartService.addProductToCart(productId, cartId, userId);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    removeProductFromCart: async (
      _: unknown,
      { productId, cartId }: { productId: string; cartId: string },
    ): Promise<CartModel> => {
      try {
        return cartService.removeProductFromCart(productId, cartId);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
  },
};
