import { UserApiService } from "#public/js/api-service/user-api-service.js";

import type { UserModel } from "#src/const/scheme/UserScheme.js";
import type { IUserForm } from "#src/const/interface/IUserForm.js";

document.addEventListener("DOMContentLoaded", () => {
  const userPageEl = document.getElementById("UserPage") as HTMLElement | null;
  const saveBtnElem = document.querySelector<HTMLButtonElement>(".save-btn");
  const formElem =
    document.querySelector<HTMLFormElement>(".user-profile-form");

  if (!userPageEl || !formElem) {
    return;
  }

  const rawUserData = userPageEl?.dataset.user;
  let user: UserModel | null = null;

  if (rawUserData) {
    try {
      user = JSON.parse(rawUserData) as UserModel;
    } catch (error) {
      console.error("Failed to parse user data attribute:", error);
    }
  }

  if (saveBtnElem) {
    saveBtnElem.addEventListener("click", async () => {
      const formData = new FormData(formElem);
      const userForm = Object.fromEntries(
        formData.entries(),
      ) as unknown as IUserForm;

      if (!user) return;

      let isUpdated = false;

      if (await updateUserName(user, userForm)) isUpdated = true;
      if (await updateUserAddress(user, userForm)) isUpdated = true;
      if (await updateUserPassword(user, userForm)) isUpdated = true;

      if (isUpdated) {
        location.reload();
      }
    });
  }
});

async function updateUserName(
  sourceUser: UserModel,
  formUser: IUserForm,
): Promise<boolean> {
  if (sourceUser.name === formUser.name || !formUser.name?.trim()) {
    return false;
  }
  await UserApiService.updateName(sourceUser.id, formUser.name);
  return true;
}

async function updateUserAddress(
  sourceUser: UserModel,
  formUser: IUserForm,
): Promise<boolean> {
  if (sourceUser.address === formUser.address || !formUser.address?.trim()) {
    return false;
  }
  await UserApiService.updateAddress(sourceUser.id, formUser.address);
  return true;
}

async function updateUserPassword(
  sourceUser: UserModel,
  formUser: IUserForm,
): Promise<boolean> {
  if (
    !formUser.newPassword?.trim() ||
    formUser.newPassword !== formUser.confirmPassword
  ) {
    return false;
  }
  await UserApiService.updatePassword(sourceUser.id, formUser.newPassword);
  return true;
}
