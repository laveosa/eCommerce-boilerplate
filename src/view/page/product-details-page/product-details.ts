import { CartApiService } from "#public/js/api-service/cart-api-service.js";

document.addEventListener("DOMContentLoaded", () => {
  const userId = document.getElementById("ProductDetailsPage").dataset.userId;
  const cartId = document.getElementById("ProductDetailsPage").dataset.cartId;
  const productId =
    document.getElementById("ProductDetailsPage").dataset.productId;

  const removeBtn =
    document.querySelector<HTMLButtonElement>(".remove-from-cart");
  const addBtn = document.querySelector<HTMLButtonElement>(".add-to-cart");

  if (!userId || !cartId || !productId) {
    return null;
  }

  if (removeBtn) {
    removeBtn.addEventListener("click", async () => {
      await CartApiService.removeProductFromCart(productId, cartId);
      location.reload();
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      await CartApiService.addProductToCart(productId, cartId, userId);
      location.reload();
    });
  }
});
