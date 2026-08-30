import axios from "axios";

import type { OrderModel } from "#src/const/scheme/OrderScheme.js";

const BASE_URL = "/api/order";

export class OrderApiService {
  // --------------------------------------------- CRUD
  static async addOrder(data: OrderModel): Promise<OrderModel> {
    try {
      const response = await axios.post(`${BASE_URL}`, data);
      return response.data as OrderModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async deleteOrder(id: string): Promise<OrderModel> {
    try {
      const response = await axios.delete(
        `${BASE_URL}/${encodeURIComponent(id)}`,
      );
      return response.data as OrderModel;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  // --------------------------------------------- EXTRA
}
