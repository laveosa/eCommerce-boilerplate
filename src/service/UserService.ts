import { getErrorModel } from "#src/util/helper/messages-helper.js";
import type { IUserService } from "#src/const/interface/IUserService.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";

export default class UserService implements IUserService {
  tableName: string = "users";

  async set(data: UserModel[]): Promise<UserModel[]> {
    if (!data || !Array.isArray(data)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data payload`);
    }

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return this.get();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to set all");
    }
  }

  async get(): Promise<UserModel[]> {
    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get all");
    }
  }

  async getUser(id: number): Promise<UserModel> {
    if (isNaN(id))
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get");
    }
  }

  async addUser(data: UserModel): Promise<UserModel> {
    if (!data || typeof data !== "object") {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data: "${data}"`);
    }

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to add");
    }
  }

  async updateUser(data: UserModel): Promise<UserModel> {
    if (!data || isNaN(data.id)) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${data?.id}"`,
      );
    }

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }
  }

  async deleteUser(id: number): Promise<UserModel> {
    if (isNaN(id)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);
    }

    const deleted: UserModel = await this.getUser(id);

    try {
      // TODO place db logic

      return deleted;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  // --------------------------------------------- EXTRA

  async updatePassword(data: UserModel): Promise<boolean> {
    if (!data || isNaN(data.id)) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${data?.id}"`,
      );
    }

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return Promise.resolve(true);
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }
  }

  // ======================================== PRIVATE

  private async tableInitCheck() {
    try {
      // TODO place db logic
    } catch (err) {
      throw getErrorModel(
        500,
        err,
        `[SERVER_ERROR]: failed to initialize ${this.tableName} table`,
      );
    }
  }
}
