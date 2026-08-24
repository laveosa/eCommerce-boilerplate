export interface IProductCardActions {
  onEdit?: (productId: string | number, cartId: string | number) => void;
  onDelete?: (productId: string | number, cartId: string | number) => void;
  onView?: (productId: string | number, cartId: string | number) => void;
  onAddToCart?: (productId: string | number, cartId: string | number) => void;
  onRemoveFromCart?: (
    productId: string | number,
    cartId: string | number,
  ) => void;
}
