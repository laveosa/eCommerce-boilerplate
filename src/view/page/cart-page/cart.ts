import { ProductCard } from "#src/view/include/component/product-card/product-card.js";
import { CartApiService } from "#public/js/api-service/cart-api-service.js";
import { OrderApiService } from "#public/js/api-service/order-api-service.js";
import type { OrderModel } from "#src/const/scheme/OrderScheme.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";

document.addEventListener("DOMContentLoaded", () => {
  // ========================================================== CARD INFO BLOCK
  const rawUser = document.getElementById("CartPage").dataset.user;
  const user = rawUser ? (JSON.parse(rawUser) as UserModel) : null;
  const rawCart = document.getElementById("CartPage").dataset.cart;
  const cart = rawCart ? (JSON.parse(rawCart) as OrderModel) : null;
  const rawOrder = document.getElementById("CartPage").dataset.order;
  const order = rawOrder
    ? (JSON.parse(rawOrder) as OrderModel)
    : ({} as OrderModel);
  order.registerDate = new Date();
  order.address = user?.address;

  const deleteCartBtnElem =
    document.querySelector<HTMLElement>(".card-delete-block");
  const addressElem = document.getElementById("OrderAddress");
  const placeOrderBtnElem =
    document.querySelector<HTMLElement>(".place-order-btn");
  const cancelOrderBtnElem =
    document.querySelector<HTMLElement>(".cancel-order-btn");

  if (cart.id && deleteCartBtnElem) {
    deleteCartBtnElem.addEventListener("click", async () => {
      await CartApiService.deleteCart(cart.id);
      location.replace("/product-list");
    });
  }

  if (cart.id && addressElem) {
    addressElem.addEventListener("input", (event) => {
      const target = event.target as HTMLTextAreaElement;
      order.address = target.value;
    });
  }

  if (placeOrderBtnElem) {
    placeOrderBtnElem.addEventListener("click", async () => {
      console.log("ORDER: ", order);

      if (!order.address || order.address.length === 0) {
        return;
      }

      order.userId = user.id;
      order.cartId = cart.id;

      await OrderApiService.addOrder(order);
      location.replace("/order");
    });
  }

  if (cancelOrderBtnElem) {
    cancelOrderBtnElem.addEventListener("click", () => {
      location.replace("/product-list");
    });
  }

  // ========================================================== PRODUCTS GRID BLOCK

  const collection = document.querySelectorAll<HTMLElement>(".product-card");

  if (!collection) return;

  collection.forEach((el) => {
    new ProductCard(el, {
      onRemoveFromCart: async (productId, cartId) => {
        await CartApiService.removeProductFromCart(productId, cartId);
        location.reload();
      },
    });
  });
});
