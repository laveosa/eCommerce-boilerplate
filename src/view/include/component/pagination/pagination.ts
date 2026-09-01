import { ProductApiService } from "#public/js/api-service/product-api-service.js";

async function handlePaginationChange(targetPage: number, perPage: number) {
  const currentUrlParams = new URLSearchParams(window.location.search);
  const search = currentUrlParams.get("search") || "";

  try {
    const result = await ProductApiService.getAllProducts(
      search,
      targetPage,
      perPage,
    );

    console.log("Fetched Products Data:", result);

    currentUrlParams.set("page", targetPage.toString());
    currentUrlParams.set("perPage", perPage.toString());

    if (search) {
      currentUrlParams.set("search", search);
    }

    const newUrl = `${window.location.pathname}?${currentUrlParams.toString()}`;
    window.history.pushState({}, "", newUrl);
    window.location.reload();
  } catch (error) {
    console.error("Pagination navigation failed:", error);
  }
}

addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector<HTMLElement>(
    ".pagination-container",
  );

  if (!container) return;

  const totalPages = parseInt(container.dataset.totalPages, 10);
  const currentPerPage = parseInt(container.dataset.perPage, 10);

  const pageButtons =
    container.querySelectorAll<HTMLButtonElement>("[data-page]");

  pageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const page = parseInt(button.dataset.page || "1", 10);
      handlePaginationChange(page, currentPerPage);
    });
  });

  const perPageSelect =
    container.querySelector<HTMLSelectElement>("#PerPageSelect");

  if (perPageSelect) {
    perPageSelect.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const newPerPage = parseInt(target.value, 10);
      handlePaginationChange(1, newPerPage);
    });
  }

  const jumpForm = container.querySelector<HTMLFormElement>(".pagination-jump");

  if (jumpForm) {
    jumpForm.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const input = jumpForm.querySelector<HTMLInputElement>(
        ".pagination-jump-input",
      );

      if (!input) return;

      const targetPage = parseInt(input.value, 10);

      if (isNaN(targetPage) || targetPage < 1 || targetPage > totalPages) {
        input.value = "";
        return;
      }

      handlePaginationChange(targetPage, currentPerPage);
    });
  }
});
