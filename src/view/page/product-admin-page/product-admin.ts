import { ProductCard } from "#src/view/include/component/product-card/product-card.js";
import { ProductApiService } from "#public/js/api-service/product-api-service.js";

document.addEventListener("DOMContentLoaded", () => {
  const deleteAllBtn =
    document.querySelector<HTMLButtonElement>(".delete-all-button");
  const container = document.querySelectorAll<HTMLElement>(
    ".product-card-container",
  );

  if (deleteAllBtn) {
    deleteAllBtn.addEventListener("click", async () => {
      await ProductApiService.deleteAllProduct();
      location.reload();
    });
  }

  if (!container) return;

  container.forEach((el) => {
    new ProductCard(el, {
      onEdit: (productId) => {
        location.replace(`/edit-product/${productId}`);
      },
      onDelete: async (productId: string) => {
        await ProductApiService.deleteProduct(productId);
        location.reload();
      },
    });
  });
});
