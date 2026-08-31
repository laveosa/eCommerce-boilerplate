import type { IPaginationQuery } from "#src/const/interface/IPaginationQuery.js";

export interface IPaginatedResult<T> {
  data?: T[];
  pagination: IPaginationQuery;
  filters?: {
    search?: string;
  };
}
