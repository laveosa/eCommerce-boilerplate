import { ProductApiService } from "#public/js/api-service/product-api-service.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnElem = document.querySelector<HTMLButtonElement>(
    ".generate-products-btn",
  );

  if (!btnElem) return;

  btnElem.addEventListener("click", async () => {
    await ProductApiService.generateProducts();
    location.reload();
  });
});
