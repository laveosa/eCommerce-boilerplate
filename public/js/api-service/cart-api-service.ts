import axios from "axios";

import type { CartModel } from "#src/const/scheme/CartScheme.js";

const BASE_URL = "/api/cart";

export class CartApiService {
  // --------------------------------------------- CRUD
  static async getAllCarts(): Promise<CartModel[]> {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data as CartModel[];
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async getCart(id: number): Promise<CartModel> {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data as CartModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async addCart(dat: CartModel): Promise<CartModel> {
    try {
      const response = await axios.post(`${BASE_URL}`, dat);
      return response.data as CartModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async setAllCarts(data: CartModel[]): Promise<CartModel[]> {
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

  static async updateCart(data: CartModel): Promise<CartModel> {
    try {
      const response = await axios.put(`${BASE_URL}`, data);
      return response.data as CartModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async deleteCart(id: number): Promise<CartModel> {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data as CartModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  // --------------------------------------------- EXTRA

  static async getCartByUserId(userId: string | number): Promise<CartModel> {
    try {
      const response = await axios.get(`${BASE_URL}/by-user-id/${userId}`);
      return response.data as CartModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async addProductToCart(
    productId: string,
    cartId: string,
    userId: string,
  ): Promise<CartModel> {
    try {
      const response = await axios.post(
        `${BASE_URL}/add-product/${productId}/${cartId}/${userId}`,
      );
      return response.data as CartModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async removeProductFromCart(
    productId: string | number,
    cartId: string | number,
  ): Promise<CartModel> {
    try {
      const response = await axios.delete(
        `${BASE_URL}/remove-product/${productId}/${cartId}`,
      );
      return response.data as CartModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
