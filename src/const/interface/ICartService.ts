import type { CartModel } from "#src/const/scheme/CartScheme.js";

export interface ICartService {
  // --------------------------------------------- CRUD
  set(data: CartModel[]): Promise<CartModel[]>;
  get(): Promise<CartModel[]>;
  getCart(id: string): Promise<CartModel>;
  addCart(data: CartModel): Promise<CartModel>;
  updateCart(data: CartModel): Promise<CartModel>;
  deleteCart(id: string): Promise<CartModel>;
  // --------------------------------------------- EXTRA
  getCartByUserId(userId: string): Promise<CartModel>;
  addProductToCart(
    cartId: string,
    orderId: string,
    userId: string,
  ): Promise<CartModel>;
  removeProductFromCart(cartId: string, orderId: string): Promise<CartModel>;
}
