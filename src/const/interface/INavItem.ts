import type { WebUrlEnum } from "#src/const/enum/WebUrlEnum.js";

export interface INavItem {
  title: string;
  path: WebUrlEnum;
  isActive?: boolean;
  allow?: boolean;
}
