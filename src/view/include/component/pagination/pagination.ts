addEventListener("DOMContentLoaded", () => {
  const paginationLinks = document.querySelectorAll(".pagination-container a");

  paginationLinks.forEach((element) => {
    const link = element as HTMLAnchorElement;

    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetUrl = new URL(link.href, window.location.origin);
      const currentUrlParams = new URLSearchParams(window.location.search);

      currentUrlParams.set("page", targetUrl.searchParams.get("page") || "1");
      window.location.search = currentUrlParams.toString();
    });
  });
});
