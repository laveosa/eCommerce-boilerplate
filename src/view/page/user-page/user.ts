import { UserApiService } from "#public/js/api-service/user-api-service.js";
import type { UserPasswordUpdateModel } from "#src/const/scheme/UserPasswordUpdateScheme.js";

document.addEventListener("DOMContentLoaded", () => {
  const saveBtnElem = document.querySelector<HTMLButtonElement>(".save-btn");
  const formElem =
    document.querySelector<HTMLFormElement>(".user-profile-form");

  if (!formElem) {
    return;
  }

  if (saveBtnElem) {
    saveBtnElem.addEventListener("click", async () => {
      const formData = new FormData(formElem);
      const rawData = Object.fromEntries(formData.entries());
      const user: UserPasswordUpdateModel = {
        ...rawData,
      } as unknown as UserPasswordUpdateModel;
      await UserApiService.updatePassword(user);
    });
  }
});
