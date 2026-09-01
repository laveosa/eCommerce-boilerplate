import { User } from "#src/const/model/UserModel.js";
import { getErrorModel } from "#src/util/helper/messages-helper.js";
import type { IAuthService } from "#src/const/interface/IAuthService.js";
import type { AuthModel } from "#src/const/scheme/AuthScheme.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";

export default class AuthService implements IAuthService {
  async register(data: AuthModel): Promise<UserModel> {
    let rawUser;

    try {
      rawUser = await User.findOne({ email: data.email });
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to find user");
    }

    if (rawUser) {
      throw getErrorModel(
        409,
        `[SERVER_ERROR]: user already exists with such email: ${data.email}`,
      );
    }

    try {
      const created = await User.create({
        name: data.name || "User",
        email: data.email,
        password: data.password,
      });

      return created.toObject<UserModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to create user");
    }
  }

  async signIn(data: AuthModel): Promise<UserModel> {
    let rawUser;

    try {
      rawUser = await User.findOne({ email: data.email });
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to find user");
    }

    if (!rawUser) {
      throw getErrorModel(
        404,
        `[SERVER_ERROR]: user not found with email: ${data.email}`,
      );
    }

    const user = rawUser.toObject<UserModel>();

    if (user.password !== data.password) {
      throw getErrorModel(401, "[SERVER_ERROR]: invalid credentials");
    }

    return user;
  }
}
