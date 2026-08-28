import { ProductCard } from "#src/view/include/component/product-card/product-card.js";
import { CartApiService } from "#public/js/api-service/cart-api-service.js";

document.addEventListener("DOMContentLoaded", () => {
  const collection = document.querySelectorAll<HTMLElement>(
    ".product-card-container",
  );

  if (!collection) return;

  collection.forEach((el) => {
    new ProductCard(el, {
      onView: (id) => {
        location.replace(`/product-details/${id}`);
      },
      onAddToCart: async (productId, cartId, userId) => {
        await CartApiService.addProductToCart(productId, cartId, userId);
        location.reload();
      },
      onRemoveFromCart: async (productId, cartId) => {
        await CartApiService.removeProductFromCart(productId, cartId);
        location.reload();
      },
    });
  });
});
