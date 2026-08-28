import { ProductApiService } from "#public/js/api-service/product-api-service.js";
import type { ProductModel } from "#src/const/scheme/ProductScheme.js";

document.addEventListener("DOMContentLoaded", () => {
  const formElem = document.querySelector<HTMLFormElement>(".product-form");
  const saveBtn =
    document.querySelector<HTMLButtonElement>(".save-product-btn");
  const cancelBtn = document.querySelector<HTMLButtonElement>(".cancel-btn");

  if (!formElem) return;

  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const formData = new FormData(formElem);
      const rawData = Object.fromEntries(formData.entries());

      const product: ProductModel = {
        ...rawData,
        price: Number(rawData.price),
      } as unknown as ProductModel;

      await ProductApiService.updateProduct(product);
      location.replace("/product-admin");
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      location.replace("/product-admin");
    });
  }
});
