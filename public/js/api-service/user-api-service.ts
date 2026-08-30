import axios, { type AxiosRequestConfig } from "axios";

const BASE_URL = "/api/user";

export class UserApiService {
  static async updateName(id: string, value: string): Promise<boolean> {
    try {
      const config: AxiosRequestConfig = {
        params: { value },
      };

      const response = await axios.put<boolean>(
        `${BASE_URL}/update-name/${encodeURIComponent(id)}`,
        null,
        config,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to update name",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async updateAddress(id: string, value: string): Promise<boolean> {
    try {
      const response = await axios.put(
        `${BASE_URL}/update-address/${encodeURIComponent(id)}?value=${encodeURIComponent(value)}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to update address",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async updatePassword(id: string, value: string): Promise<boolean> {
    try {
      const response = await axios.put(
        `${BASE_URL}/update-password/${encodeURIComponent(id)}`,
        { password: value },
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to update password",
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
