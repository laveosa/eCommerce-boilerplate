import { isApiError } from "#src/util/helper/messages-helper.js";
import UserService from "#src/service/UserService.js";
import type { UserModel } from "#src/const/model/UserModel.js";

const userService = new UserService();

export const userResolver = {
  Query: {
    users: async (): Promise<UserModel[]> => {
      try {
        return userService.get();
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    user: async (_: unknown, { id }: { id: string }): Promise<UserModel> => {
      try {
        return userService.getUser(id);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
  },
  Mutation: {
    addUsers: async (
      _: unknown,
      { data }: { data: UserModel[] },
    ): Promise<UserModel[]> => {
      try {
        return userService.set(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    addUser: async (_: unknown, { id }: { id: string }): Promise<UserModel> => {
      try {
        return userService.getUser(id);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    updateUser: async (
      _: unknown,
      { data }: { data: UserModel },
    ): Promise<UserModel> => {
      try {
        return userService.updateUser(data);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    updateUserName: async (
      _: unknown,
      { id, value }: { id: string; value: string },
    ): Promise<boolean> => {
      try {
        return userService.updateName(id, value);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    updateUserAddress: async (
      _: unknown,
      { id, value }: { id: string; value: string },
    ): Promise<boolean> => {
      try {
        return userService.updateAddress(id, value);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    updateUserPassword: async (
      _: unknown,
      { id, value }: { id: string; value: string },
    ): Promise<boolean> => {
      try {
        return userService.updatePassword(id, value);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
    deleteUser: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<UserModel> => {
      try {
        return userService.deleteUser(id);
      } catch (err) {
        throw isApiError(err)
          ? err.message
          : "[SERVER_ERROR]: Internal Server Error";
      }
    },
  },
};
