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
    if (!id || id.length === 0)
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);

    try {
      const user = await User.findById(id);

      if (!user) {
        throw getErrorModel(404, "[SERVER_ERROR]: user not found!");
      }

      return user.toObject<UserModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get");
    }
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
    if (!data || typeof data !== "object" || !data.id || data.id.length === 0) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${data?.id}"`,
      );
    }

    try {
      const updated = await User.findByIdAndUpdate(data.id, data, {
        returnDocument: "after",
        runValidators: true,
      });

      if (!updated) {
        throw getErrorModel(404, "[SERVER_ERROR]: user not found!");
      }

      return updated.toObject<UserModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }
  }

  async deleteUser(id: string): Promise<UserModel> {
    if (!id || id.length === 0) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);
    }

    try {
      const deleted = await User.findByIdAndDelete(id);

      if (!deleted) {
        throw getErrorModel(404, "[SERVER_ERROR]: user not found!");
      }

      return deleted.toObject<UserModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  // --------------------------------------------- EXTRA

  async updatePassword(data: UserModel): Promise<boolean> {
    if (!data || typeof data !== "object" || !data.id || data.id.length === 0) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${data?.id}"`,
      );
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        data.id,
        { $set: { password: data.password } },
        { returnDocument: "after", runValidators: true },
      );

      if (!updatedUser) {
        throw getErrorModel(
          404,
          `[SERVER_ERROR]: user not found for id: "${data.id}"`,
        );
      }

      return true;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }
  }
}
