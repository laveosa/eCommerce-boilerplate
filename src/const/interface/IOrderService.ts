import type { OrderModel } from "#src/const/scheme/OrderScheme.js";

export interface IOrderService {
  // --------------------------------------------- CRUD
  set(data: OrderModel[]): Promise<OrderModel[]>;
  get(): Promise<OrderModel[]>;
  getOrder(id: string): Promise<OrderModel>;
  addOrder(data: OrderModel): Promise<OrderModel>;
  updateOrder(data: OrderModel): Promise<OrderModel>;
  deleteOrder(id: string): Promise<OrderModel>;
  // --------------------------------------------- EXTRA
  addCartToOrder(
    cartId: string,
    orderId: string,
    userId: string,
  ): Promise<OrderModel>;
  removeCartFromOrder(cartId: string, orderId: string): Promise<OrderModel>;
}
