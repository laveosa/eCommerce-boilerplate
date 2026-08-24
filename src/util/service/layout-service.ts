import { WebUrlEnum } from "#src/const/enum/WebUrlEnum.js";
import type { INavItem } from "#src/const/interface/INavItem.js";

const navList: INavItem[] = [
  /*{
    title: "Auth",
    path: WebUrlEnum.AUTH,
  },*/
  {
    title: "Products",
    path: WebUrlEnum.PRODUCT_LIST,
  },
  {
    title: "Admin",
    path: WebUrlEnum.PRODUCT_ADMIN,
  },
  /*{
    title: "Cart",
    path: WebUrlEnum.CART,
  },*/
  {
    title: "Order",
    path: WebUrlEnum.ORDER,
  },
  /*{
    title: "Add",
    path: WebUrlEnum.ADD_PRODUCT,
  },*/
  /*{
    title: "Edit",
    path: WebUrlEnum.EDIT_PRODUCT,
  },*/
  /*{
    title: "Details",
    path: WebUrlEnum.PRODUCT_DETAILS,
  },*/
  /*{
    title: "User",
    path: WebUrlEnum.USER,
  },*/
];

export default class LayoutService {
  static getNavigationList(selected?: WebUrlEnum) {
    return navList.map((item) => ({
      ...item,
      isActive: selected ? item.path === selected : false,
    }));
  }
}
