import * as fs from "node:fs/promises";
import path from "node:path";

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

export const deleteFile = async (fileUrl: string | undefined | null) => {
  if (!fileUrl) return;

  const relativePath = fileUrl.startsWith("/") ? fileUrl.substring(1) : fileUrl;
  const filePath = path.join(process.cwd(), "public", relativePath);

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (err: any) {
    if (err.code !== "ENOENT") {
      console.error(
        `[FILE_HELPER_ERROR]: Failed to delete file at ${filePath}`,
        err,
      );
    }
  }
};
