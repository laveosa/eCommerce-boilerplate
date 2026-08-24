import type { IProductCardActions } from "#src/const/interface/IProductCardActions.js";

export class ProductCard {
  private element: HTMLElement;
  private productId: string | number;
  private cartId: string | number;
  private actions: IProductCardActions;

  constructor(cardElement: HTMLElement, actions: IProductCardActions) {
    this.element = cardElement;
    this.actions = actions;
    const rawId = this.element.id.replace("Cart_", "");
    this.productId = isNaN(Number(rawId)) ? rawId : Number(rawId);
    const rawCartId = this.element.dataset.cartId || "";
    this.cartId = isNaN(Number(rawCartId)) ? rawCartId : Number(rawCartId);
    this.initEventListeners();
  }

  private initEventListeners() {
    const editBtn =
      this.element.querySelector<HTMLButtonElement>(".btn.edit-btn");
    const deleteBtn =
      this.element.querySelector<HTMLButtonElement>(".btn.delete-btn");
    const viewBtn =
      this.element.querySelector<HTMLButtonElement>(".btn.view-btn");
    const addBtn =
      this.element.querySelector<HTMLButtonElement>(".btn.add-btn");
    const removeBtn =
      this.element.querySelector<HTMLButtonElement>(".btn.remove-btn");

    editBtn?.addEventListener("click", () => this.onEditHandler());
    deleteBtn?.addEventListener("click", () => this.onDeleteHandler());
    viewBtn?.addEventListener("click", () => this.onViewHandler());
    addBtn?.addEventListener("click", () => this.onAddToCartHandler());
    removeBtn?.addEventListener("click", () => this.onRemoveFromCartHandler());
  }

  // --------------------------------------------------- HANDLERS

  private onEditHandler() {
    this.actions.onEdit?.(this.productId, this.cartId);
  }

  private onDeleteHandler() {
    this.actions.onDelete?.(this.productId, this.cartId);
  }

  private onViewHandler() {
    this.actions.onView?.(this.productId, this.cartId);
  }

  private onAddToCartHandler() {
    this.actions.onAddToCart?.(this.productId, this.cartId);
  }

  private onRemoveFromCartHandler() {
    this.actions.onRemoveFromCart?.(this.productId, this.cartId);
  }
}
