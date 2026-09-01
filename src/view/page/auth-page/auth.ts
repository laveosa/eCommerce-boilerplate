import { AuthApiService } from "#public/js/api-service/auth-api-service.js";
import { WebUrlEnum } from "#src/const/enum/WebUrlEnum.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------- FORMS
  const signInForm = document.querySelector<HTMLFormElement>(".sign-in-form");
  const registerForm =
    document.querySelector<HTMLFormElement>(".register-form");

  // -------------------------------- CONDITION CHECK
  const signInCheck = document.querySelector<HTMLElement>(".sign-in-check");
  const registerCheck = document.querySelector<HTMLElement>(".register-check");

  // -------------------------------- SUBMIT BUTTONS
  const signInBtn = document.querySelector<HTMLButtonElement>(".sign-in-btn");
  const registerBtn =
    document.querySelector<HTMLButtonElement>(".register-btn");

  // ============================================================ HANDLERS
  // -------------------------------- CONDITION CHECK
  if (signInCheck) {
    signInCheck.addEventListener("click", (event) => {
      event.preventDefault();
      location.replace(WebUrlEnum.AUTH);
    });
  }

  if (registerCheck) {
    registerCheck.addEventListener("click", (event) => {
      event.preventDefault();
      location.replace(`${WebUrlEnum.AUTH}?condition=register`);
    });
  }

  // -------------------------------- SUBMIT BUTTONS
  if (signInBtn && signInForm) {
    signInBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const formData = new FormData(signInForm);
      const signInData = Object.fromEntries(formData.entries());

      try {
        const user: UserModel = await AuthApiService.signIn(signInData);

        if (user && user.id) {
          location.replace(WebUrlEnum.PRODUCT_LIST);
        } else {
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  if (registerBtn && registerForm) {
    registerBtn.addEventListener("click", async (event) => {
      event.preventDefault();

      const formData = new FormData(registerForm);
      const registerData = Object.fromEntries(formData.entries());

      if (
        !registerData ||
        registerData.password !== registerData.confirmPassword
      )
        return;

      try {
        const user: UserModel = await AuthApiService.register(registerData);

        if (user && user.id) {
          location.replace(WebUrlEnum.PRODUCT_LIST);
        } else {
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
});
