import type { IProductQuery } from "#src/const/interface/IProductQuery.js";

export interface IPaginatedResult<T> {
  data: T[];
  pagination: IProductQuery;
  filters?: {
    search?: string;
    [key: string]: any;
  };
}
