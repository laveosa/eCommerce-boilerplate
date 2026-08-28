export interface IProductCardActions {
  onEdit?: (productId: string, cartId: string) => void;
  onDelete?: (productId: string, cartId: string) => void;
  onView?: (productId: string, cartId: string) => void;
  onAddToCart?: (productId: string, cartId: string, userId: string) => void;
  onRemoveFromCart?: (productId: string, cartId: string) => void;
}
