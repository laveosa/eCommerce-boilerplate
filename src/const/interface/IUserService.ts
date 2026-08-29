import type { UserModel } from "#src/const/scheme/UserScheme.js";

export interface IUserService {
  // --------------------------------------------- CRUD
  set(data: UserModel[]): Promise<UserModel[]>;
  get(): Promise<UserModel[]>;
  getUser(id: string): Promise<UserModel>;
  addUser(data: UserModel): Promise<UserModel>;
  updateUser(data: UserModel): Promise<UserModel>;
  deleteUser(id: string): Promise<UserModel>;
  // --------------------------------------------- EXTRA
  updateName(userId: string, value: string): Promise<boolean>;
  updateAddress(userId: string, value: string): Promise<boolean>;
  updatePassword(userId: string, value: string): Promise<boolean>;
}
