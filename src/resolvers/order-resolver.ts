import { isApiError } from "#src/util/helper/messages-helper.js";
import UserService from "#src/service/UserService.js";
import CartService from "#src/service/CartService.js";
import OrderService from "#src/service/OrderService.js";
import type { UserModel } from "#src/const/model/UserModel.js";
import type { CartModel } from "#src/const/model/CartModel.js";
import type { OrderModel } from "#src/const/model/OrderModel.js";

const userService = new UserService();
const cartService = new CartService();
const orderService = new OrderService();

export const orderResolver = {
  Order: {
    user: async (_: unknown, { id }: { id: string }): Promise<UserModel> => {
      try {
        return userService.getUser(id);
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
  },
  Query: {
    orders: async (): Promise<OrderModel[]> => {
      try {
        return orderService.get();
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    order: async (_: unknown, { id }: { id: string }): Promise<OrderModel> => {
      try {
        return orderService.getOrder(id);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    orderByUserId: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<OrderModel> => {
      try {
        return orderService.getOrderByUserId(id);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
  },
  Mutation: {
    addOrders: async (
      _: unknown,
      { data }: { data: OrderModel[] },
    ): Promise<OrderModel[]> => {
      try {
        return orderService.set(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    addOrder: async (
      _: unknown,
      { data }: { data: OrderModel },
    ): Promise<OrderModel> => {
      try {
        return orderService.addOrder(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    updateOrder: async (
      _: unknown,
      { data }: { data: OrderModel },
    ): Promise<OrderModel> => {
      try {
        return orderService.updateOrder(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    deleteOrder: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<OrderModel> => {
      try {
        return orderService.deleteOrder(id);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    addCartToOrder: async (
      _: unknown,
      {
        cartId,
        orderId,
        userId,
      }: { cartId: string; orderId: string; userId: string },
    ): Promise<OrderModel> => {
      try {
        return orderService.addCartToOrder(cartId, orderId, userId);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    removeCartFromOrder: async (
      _: unknown,
      { cartId, orderId }: { cartId: string; orderId: string },
    ): Promise<OrderModel> => {
      try {
        return orderService.removeCartFromOrder(cartId, orderId);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
  },
};
