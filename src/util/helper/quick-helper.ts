export function sortArrayById<T extends { id?: number }>(
  items: T[],
  ascending = true,
): T[] {
  if (!items || items.length === 0) return items;

  return [...items].sort((a, b) => (ascending ? a.id - b.id : b.id - a.id));
}

export function initIds<T extends Record<string, any>>(
  items: T[],
): (T & { id: number })[] {
  if (!items || items.length === 0) return [];

  return items.map((item: T, idx: number) => ({
    ...item,
    id: idx + 1,
  }));
}
