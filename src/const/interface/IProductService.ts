import type { IPaginatedResult } from "#src/const/interface/IPaginatedResult.js";
import type { ProductModel } from "#src/const/model/ProductModel.js";

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
