import axios from "axios";

import type { ProductModel } from "#src/const/scheme/ProductScheme.js";
import type { IPaginatedResult } from "#src/const/interface/IPaginatedResult.js";

const BASE_URL = "/api/product";

export class ProductApiService {
  // --------------------------------------------- CRUD
  static async getAllProducts(
    search?: string,
    page?: number,
    perPage?: number,
  ): Promise<IPaginatedResult<ProductModel>> {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (page) params.append("page", page.toString());
      if (perPage) params.append("perPage", perPage.toString());

      const response = await axios.get(`${BASE_URL}?${params.toString()}`);
      return response.data as IPaginatedResult<ProductModel>;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to fetch products",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async getProduct(id: number): Promise<ProductModel> {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data as ProductModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async addProduct(data: ProductModel): Promise<ProductModel> {
    try {
      const response = await axios.post(`${BASE_URL}`, data);
      return response.data as ProductModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async setAllProducts(data: ProductModel[]): Promise<ProductModel[]> {
    try {
      const response = await axios.post(`${BASE_URL}/all`, data);
      return response.data;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async updateProduct(data: ProductModel): Promise<ProductModel> {
    try {
      const response = await axios.put(`${BASE_URL}`, data);
      return response.data as ProductModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async deleteProduct(id: number): Promise<ProductModel> {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data as ProductModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  // --------------------------------------------- EXTRA

  static async generateProducts(): Promise<ProductModel> {
    try {
      const response = await axios.post(`${BASE_URL}/generate-products`);
      return response.data as ProductModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
