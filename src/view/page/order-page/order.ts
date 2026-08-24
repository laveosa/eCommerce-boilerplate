import { OrderApiService } from "#public/js/api-service/order-api-service.js";

document.addEventListener("DOMContentLoaded", () => {
  const _orderId = document.getElementById("OrderPage").dataset.orderId;
  const cancelOrderBtnElem =
    document.querySelector<HTMLElement>(".cancel-order-btn");

  if (_orderId && cancelOrderBtnElem) {
    cancelOrderBtnElem.addEventListener("click", async () => {
      await OrderApiService.deleteOrder(Number(_orderId));
      location.replace("/product-list");
    });
  }
});
