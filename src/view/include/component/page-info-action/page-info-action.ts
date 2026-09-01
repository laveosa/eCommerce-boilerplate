function executeSearch(searchTerm: string) {
  const currentUrlParams = new URLSearchParams(window.location.search);
  const perPage = currentUrlParams.get("perPage") || "5";
  const trimmedSearch = searchTerm.trim();

  if (trimmedSearch) {
    currentUrlParams.set("search", trimmedSearch);
  } else {
    currentUrlParams.delete("search");
  }

  currentUrlParams.set("page", "1");
  currentUrlParams.set("perPage", perPage);

  window.location.href = `${window.location.pathname}?${currentUrlParams.toString()}`;
}

function debounce<Args extends any[]>(
  fn: (...args: Args) => void,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Args) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector<HTMLInputElement>(
    "#PageInfoActionSearch",
  );

  if (!searchInput) return;

  const currentUrlParams = new URLSearchParams(window.location.search);
  const currentSearch = currentUrlParams.get("search") || "";

  searchInput.value = currentSearch;

  const debouncedSearch = debounce((value: string) => {
    if (value.trim() !== currentSearch) {
      executeSearch(value);
    }
  }, 300);

  searchInput.addEventListener("input", (event: Event) => {
    const target = event.target as HTMLInputElement;
    debouncedSearch(target.value);
  });

  searchInput.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      executeSearch(searchInput.value);
    }
  });
});
