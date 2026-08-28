import { ProductCard } from "#src/view/include/component/product-card/product-card.js";
import { CartApiService } from "#public/js/api-service/cart-api-service.js";
import { OrderApiService } from "#public/js/api-service/order-api-service.js";
import type { OrderModel } from "#src/const/scheme/OrderScheme.js";

document.addEventListener("DOMContentLoaded", () => {
  // ========================================================== CARD INFO BLOCK

  const _userId = document.getElementById("CartPage").dataset.userId;
  const _cartId = document.getElementById("CartPage").dataset.cartId;
  const deleteCartBtnElem =
    document.querySelector<HTMLElement>(".card-delete-block");
  const addressElem = document.getElementById("OrderAddress");
  const placeOrderBtnElem =
    document.querySelector<HTMLElement>(".place-order-btn");
  const cancelOrderBtnElem =
    document.querySelector<HTMLElement>(".cancel-order-btn");

  let order: OrderModel = {
    userId: _userId,
    cartId: _cartId,
    registerDate: new Date(),
    address: "United States, St. Charles, MO 63301", // TODO this is temporary stub of order address
  };

  if (_cartId && deleteCartBtnElem) {
    deleteCartBtnElem.addEventListener("click", async (event) => {
      await CartApiService.deleteCart(_cartId);
      location.replace("/product-list");
    });
  }

  if (_cartId && addressElem) {
    addressElem.addEventListener("input", (event) => {
      const target = event.target as HTMLTextAreaElement;
      order.address = target.value;
    });
  }

  if (placeOrderBtnElem) {
    placeOrderBtnElem.addEventListener("click", async (event) => {
      if (!order.address || order.address.length === 0) {
        return;
      }

      await OrderApiService.addOrder(order);
      location.replace("/order");
    });
  }

  if (cancelOrderBtnElem) {
    cancelOrderBtnElem.addEventListener("click", (event) => {
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
