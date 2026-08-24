import type { OrderModel } from "#src/const/scheme/OrderScheme.js";

export interface IOrderService {
  // --------------------------------------------- CRUD
  set(data: OrderModel[]): Promise<OrderModel[]>;
  get(): Promise<OrderModel[]>;
  getOrder(id: number): Promise<OrderModel>;
  addOrder(data: OrderModel): Promise<OrderModel>;
  updateOrder(data: OrderModel): Promise<OrderModel>;
  deleteOrder(id: number): Promise<OrderModel>;
  // --------------------------------------------- EXTRA
  addCartToOrder(cartId: number, orderId: number): Promise<OrderModel>;
  removeCartFromOrder(cartId: number, orderId: number): Promise<OrderModel>;
}
