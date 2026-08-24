import { fileURLToPath } from "node:url";
import path from "node:path";

export function pathResolve(
  relatedPath: string | string[],
  isMetaUrl?: boolean,
) {
  if (!relatedPath || relatedPath.length === 0) return null;

  const fullPath = Array.isArray(relatedPath)
    ? sanitizePath(relatedPath.join("/"))
    : sanitizePath(relatedPath);

  return isMetaUrl
    ? fileURLToPath(new URL(fullPath, import.meta.url))
    : path.resolve(process.env.PROJECT_ROOT || process.cwd(), fullPath);
}

export function sanitizePath(inputPath: string): string {
  let cleaned = inputPath.replace(/^(\.\/|\/)+/, "");
  cleaned = cleaned.replace(/\/+/g, "/");
  return `./${cleaned}`;
}
