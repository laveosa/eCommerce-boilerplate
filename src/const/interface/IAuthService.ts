import type { AuthModel } from "#src/const/scheme/AuthScheme.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";

export interface IAuthService {
  register(data: AuthModel): Promise<UserModel>;
  signIn(data: AuthModel): Promise<UserModel>;
  signOut(data: AuthModel): Promise<UserModel>;
}
