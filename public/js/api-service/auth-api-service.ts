import axios from "axios";

const BASE_URL = "/api/auth";

export class AuthApiService {
  static async register(data: any) {
    try {
      const response = await axios.post(`${BASE_URL}/register`, data);
      return response.data;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to register",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async signIn(data: any) {
    try {
      const response = await axios.post(`${BASE_URL}/sign-in`, data);
      return response.data;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to sign in",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  static async signOut(data: any) {
    try {
      const response = await axios.post(`${BASE_URL}/sign-out`, data);
      return response.data;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to sign in",
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
