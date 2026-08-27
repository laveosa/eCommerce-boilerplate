import type { ProductModel } from "#src/const/scheme/ProductScheme.js";

export interface IProductService {
  // --------------------------------------------- CRUD
  set(data: ProductModel[]): Promise<ProductModel[]>;
  get(): Promise<ProductModel[]>;
  getProduct(id: string): Promise<ProductModel>;
  addProduct(data: ProductModel): Promise<ProductModel>;
  updateProduct(data: ProductModel): Promise<ProductModel>;
  deleteProduct(id: string): Promise<ProductModel>;
  // --------------------------------------------- EXTRA
}
