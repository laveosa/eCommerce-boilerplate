export interface IProductQuery {
  current: number;
  total: number;
  prevPage: number | null;
  nextPage: number | null;
  perPage?: number;
}
