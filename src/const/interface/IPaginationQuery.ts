export interface IPaginationQuery {
  current: number;
  total: number;
  prevPage: number | null;
  nextPage: number | null;
  perPage?: number;
}
