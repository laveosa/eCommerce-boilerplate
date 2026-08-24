import FsService from "#src/util/service/fs-service.js";
import type { ProductModel } from "#src/const/scheme/ProductScheme.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";
import type { CartModel } from "#src/const/scheme/CartScheme.js";
import type { OrderModel } from "#src/const/scheme/OrderScheme.js";

const USER_PATH = "./src/const/json/user.json";
const PRODUCTS_PATH = "./src/const/json/products.json";
const CART_PATH = "./src/const/json/cart.json";
const ORDER_PATH = "./src/const/json/order.json";

export async function getStubUser(): Promise<UserModel> {
  const result: string = await FsService.readFile(USER_PATH);
  return result ? (JSON.parse(result) as UserModel) : null;
}

export async function getStubProducts() {
  const result: string = await FsService.readFile(PRODUCTS_PATH);
  return result ? (JSON.parse(result) as ProductModel[]) : [];
}

export async function getStubCart() {
  const result: string = await FsService.readFile(CART_PATH);
  const cart: CartModel = result ? (JSON.parse(result) as CartModel) : null;
  const products: ProductModel[] = await getStubProducts();

  if (cart) {
    cart.products = products;
    cart.totalItems = products.reduce((t, p) => t + (p.quantity || 1), 0);
    cart.totalPrice = Number(
      products.reduce((t, p) => t + p.price * (p.quantity || 1), 0).toFixed(2),
    );
  }

  return cart;
}

export async function getStubOrder() {
  const result: string = await FsService.readFile(ORDER_PATH);
  return result ? (JSON.parse(result) as OrderModel) : null;
}
