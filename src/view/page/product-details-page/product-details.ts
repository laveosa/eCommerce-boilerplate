import { CartApiService } from "#public/js/api-service/cart-api-service.js";

document.addEventListener("DOMContentLoaded", () => {
  const cartId = Number(
    document.getElementById("ProductDetailsPage").dataset.cartId,
  );
  const productId = Number(
    document.getElementById("ProductDetailsPage").dataset.productId,
  );
  const removeBtn =
    document.querySelector<HTMLButtonElement>(".remove-from-cart");
  const addBtn = document.querySelector<HTMLButtonElement>(".add-to-cart");

  if (isNaN(cartId) || isNaN(productId)) {
    return null;
  }

  if (removeBtn) {
    removeBtn.addEventListener("click", async () => {
      await CartApiService.removeProductFromCart(productId, cartId);
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      await CartApiService.addProductToCart(productId, cartId);
    });
  }
});
