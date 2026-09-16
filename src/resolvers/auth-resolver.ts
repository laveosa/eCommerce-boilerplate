import AuthService from "#src/service/AuthService.js";
import { isApiError } from "#src/util/helper/messages-helper.js";
import type { AuthModel } from "#src/const/model/AuthModel.js";
import type { UserModel } from "#src/const/model/UserModel.js";

const authService = new AuthService();

export const authResolver = {
  Mutation: {
    register: async (
      _: unknown,
      { data }: { data: AuthModel },
    ): Promise<UserModel> => {
      try {
        return await authService.register(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    signIn: async (
      _: unknown,
      { data }: { data: AuthModel },
    ): Promise<UserModel> => {
      try {
        return await authService.signIn(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
  },
};
