import type { CartModel } from "#src/const/scheme/CartScheme.js";

export interface ICartService {
  // --------------------------------------------- CRUD
  set(data: CartModel[]): Promise<CartModel[]>;
  get(): Promise<CartModel[]>;
  getCart(id: number): Promise<CartModel>;
  addCart(data: CartModel): Promise<CartModel>;
  updateCart(data: CartModel): Promise<CartModel>;
  deleteCart(id: number): Promise<CartModel>;
  // --------------------------------------------- EXTRA
  getCartByUserId(userId: number): Promise<CartModel>;
  addProductToCart(cartId: number, orderId: number): Promise<CartModel>;
  removeProductFromCart(cartId: number, orderId: number): Promise<CartModel>;
}
