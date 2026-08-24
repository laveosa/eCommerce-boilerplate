import axios from "axios";

import type { UserPasswordUpdateModel } from "#src/const/scheme/UserPasswordUpdateScheme.js";

const BASE_URL = "/api/user";

export class UserApiService {
  // --------------------------------------------- CRUD
  static async updatePassword(data: UserPasswordUpdateModel): Promise<boolean> {
    try {
      const response = await axios.put(`${BASE_URL}/update-password`, data);
      return response.data;
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
