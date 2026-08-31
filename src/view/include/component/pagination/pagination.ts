addEventListener("DOMContentLoaded", () => {
  const jumpForms =
    document.querySelectorAll<HTMLFormElement>(".pagination-jump");

  jumpForms.forEach((form) => {
    form.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const input = form.querySelector<HTMLInputElement>(
        ".pagination-jump-input",
      );
      const totalPages = parseInt(form.dataset.totalPages || "1", 10);

      if (!input) return;

      const targetPage = parseInt(input.value, 10);

      if (isNaN(targetPage) || targetPage < 1 || targetPage > totalPages) {
        input.value = "";
        return;
      }

      const basePath = form.dataset.pagePath || window.location.pathname;
      window.location.href = `${basePath}?page=${targetPage}`;
    });
  });
});
