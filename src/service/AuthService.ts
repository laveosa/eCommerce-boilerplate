import { getErrorModel } from "#src/util/helper/messages-helper.js";
import { getStubUser } from "#src/util/service/stub-data-provider-service.js";
import type { IAuthService } from "#src/const/interface/IAuthService.js";
import type { AuthModel } from "#src/const/scheme/AuthScheme.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";

export default class AuthService implements IAuthService {
  async register(data: AuthModel): Promise<UserModel> {
    try {
      // ---------------------  LOGIC
      // TODO replace with valid db data
      const user = getStubUser();

      return Promise.resolve(user);
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to set all");
    }
  }

  async signIn(data: AuthModel): Promise<UserModel> {
    try {
      // ---------------------  LOGIC
      // TODO replace with valid db data
      const user = getStubUser();

      return Promise.resolve(user);
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to set all");
    }
  }

  async signOut(data: AuthModel): Promise<UserModel> {
    try {
      // ---------------------  LOGIC
      // TODO replace with valid db data
      const user = getStubUser();

      return Promise.resolve(user);
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to set all");
    }
  }
}
