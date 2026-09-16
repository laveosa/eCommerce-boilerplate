import type { AuthModel } from "#src/const/model/AuthModel.js";
import type { UserModel } from "#src/const/model/UserModel.js";

export interface IAuthService {
  register(data: AuthModel): Promise<UserModel>;
  signIn(data: AuthModel): Promise<UserModel>;
}
