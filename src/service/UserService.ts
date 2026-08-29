import { User } from "#src/const/model/UserModel.js";
import { getErrorModel } from "#src/util/helper/messages-helper.js";
import type { IUserService } from "#src/const/interface/IUserService.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";

export default class UserService implements IUserService {
  async set(data: UserModel[]): Promise<UserModel[]> {
    if (!data || !Array.isArray(data)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data payload`);
    }

    try {
      await User.deleteMany({});
      await User.insertMany(data);
      return this.get();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to set all");
    }
  }

  async get(): Promise<UserModel[]> {
    try {
      const users = await User.find();
      return users.map((u) => u.toObject<UserModel>());
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get all");
    }
  }

  async getUser(id: string): Promise<UserModel> {
    if (!id || id.length === 0) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);
    }

    let user;

    try {
      user = await User.findById(id);
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get");
    }

    if (!user) {
      throw getErrorModel(404, "[SERVER_ERROR]: user not found!");
    }

    return user.toObject<UserModel>();
  }

  async addUser(data: UserModel): Promise<UserModel> {
    if (!data || typeof data !== "object") {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data: "${data}"`);
    }

    try {
      const user = await User.create(data);
      return user.toObject<UserModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to add");
    }
  }

  async updateUser(data: UserModel): Promise<UserModel> {
    const userId = data?.id;

    if (!data || typeof data !== "object" || !userId) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${userId}"`,
      );
    }

    let updated;

    try {
      updated = await User.findByIdAndUpdate(userId, data, {
        returnDocument: "after",
        runValidators: true,
      });
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }

    if (!updated) {
      throw getErrorModel(404, "[SERVER_ERROR]: user not found!");
    }

    return updated.toObject<UserModel>();
  }

  async deleteUser(id: string): Promise<UserModel> {
    if (!id || id.length === 0) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);
    }

    let deleted;

    try {
      deleted = await User.findByIdAndDelete(id);
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }

    if (!deleted) {
      throw getErrorModel(404, "[SERVER_ERROR]: user not found!");
    }

    return deleted.toObject<UserModel>();
  }

  // --------------------------------------------- EXTRA

  async updateName(userId: string, value: string): Promise<boolean> {
    if (!userId || !value) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${userId}", data: ${value}`,
      );
    }

    let updatedUser;

    try {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { name: value } },
        { returnDocument: "after", runValidators: true },
      );
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }

    if (!updatedUser) {
      throw getErrorModel(
        404,
        `[SERVER_ERROR]: user not found for id: "${userId}"`,
      );
    }

    return true;
  }

  async updateAddress(userId: string, value: string): Promise<boolean> {
    if (!userId || !value) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${userId}", data: ${value}`,
      );
    }

    let updatedUser;

    try {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { address: value } },
        { returnDocument: "after", runValidators: true },
      );
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }

    if (!updatedUser) {
      throw getErrorModel(
        404,
        `[SERVER_ERROR]: user not found for id: "${userId}"`,
      );
    }

    return true;
  }

  async updatePassword(userId: string, value: string): Promise<boolean> {
    if (!userId || !value) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${userId}", data: ${value}`,
      );
    }

    let updatedUser;

    try {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { password: value } },
        { returnDocument: "after", runValidators: true },
      );
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }

    if (!updatedUser) {
      throw getErrorModel(
        404,
        `[SERVER_ERROR]: user not found for id: "${userId}"`,
      );
    }

    return true;
  }
}
