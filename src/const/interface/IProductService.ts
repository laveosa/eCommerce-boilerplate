import type { ProductModel } from "#src/const/scheme/ProductScheme.js";
import type { IPaginatedResult } from "#src/const/interface/IPaginatedResult.js";

export interface IProductService {
  // --------------------------------------------- CRUD
  set(data: ProductModel[]): Promise<ProductModel[]>;
  get(
    search?: string,
    page?: number,
    perPage?: number,
  ): Promise<IPaginatedResult<ProductModel>>;
  getProduct(id: string): Promise<ProductModel>;
  addProduct(data: ProductModel): Promise<ProductModel>;
  updateProduct(data: ProductModel): Promise<ProductModel>;
  deleteProduct(id: string): Promise<ProductModel>;
  // --------------------------------------------- EXTRA
}
