import { isApiError } from "#src/util/helper/messages-helper.js";
import ProductService from "#src/service/ProductService.js";
import type { ProductModel } from "#src/const/model/ProductModel.js";
import type { IPaginatedResult } from "#src/const/interface/IPaginatedResult.js";

const productService = new ProductService();

export const productResolver = {
  Query: {
    products: async (
      _: undefined,
      {
        search,
        page,
        perPage,
      }: { search?: string; page?: number; perPage?: number },
    ): Promise<IPaginatedResult<ProductModel>> => {
      try {
        return productService.get(search, page, perPage);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    product: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<ProductModel> => {
      try {
        return productService.getProduct(id);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
  },
  Mutation: {
    addProducts: async (
      _: unknown,
      { data }: { data: ProductModel[] },
    ): Promise<ProductModel[]> => {
      try {
        return productService.set(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    addProduct: async (
      _: unknown,
      { data }: { data: ProductModel },
    ): Promise<ProductModel> => {
      try {
        return productService.addProduct(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    updateProduct: async (
      _: unknown,
      { data }: { data: ProductModel },
    ): Promise<ProductModel> => {
      try {
        return productService.updateProduct(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    deleteProduct: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<ProductModel> => {
      try {
        return productService.deleteProduct(id);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    deleteProducts: async (): Promise<ProductModel[]> => {
      try {
        return productService.deleteAllProducts();
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
  },
};
