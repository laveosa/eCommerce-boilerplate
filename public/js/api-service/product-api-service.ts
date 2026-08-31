import axios from "axios";

import type { ProductModel } from "#src/const/scheme/ProductScheme.js";

const BASE_URL = "/api/product";

export class ProductApiService {
  // --------------------------------------------- CRUD
  static async getAllProducts(
    search?: string,
    page?: number,
    perPage?: number,
  ): Promise<ProductModel[]> {
    try {
      const response = await axios.get(
        `${BASE_URL}?search=${search}&page=${page}&perPage=${perPage}`,
      );
      return response.data as ProductModel[];
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async getProduct(id: string): Promise<ProductModel> {
    try {
      const response = await axios.get(`${BASE_URL}/${encodeURIComponent(id)}`);
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

  static async deleteProduct(id: string): Promise<ProductModel> {
    try {
      const response = await axios.delete(
        `${BASE_URL}/${encodeURIComponent(id)}`,
      );
      return response.data as ProductModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async deleteAllProduct(): Promise<ProductModel[]> {
    try {
      const response = await axios.delete(`${BASE_URL}/all`);
      return response.data as ProductModel[];
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
