import { AuthApiService } from "#public/js/api-service/auth-api-service.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";

// -------------------------------- FORMS
const signInForm = document.querySelector<HTMLFormElement>(".sign-in-form");
const registerForm = document.querySelector<HTMLFormElement>(".register-form");

// -------------------------------- CONDITION CHECK
const signInCheck = document.querySelector(".sign-in-check");
const registerCheck = document.querySelector(".register-check");

// -------------------------------- SUBMIT BUTTONS
const signInBtn = document.querySelector(".sign-in-btn");
const registerBtn = document.querySelector(".register-btn");

// ============================================================ HANDLERS
// -------------------------------- CONDITION CHECK
if (signInCheck) {
  signInCheck.addEventListener("click", (event) => {
    event.preventDefault();
    location.replace("http://localhost:8080/auth");
  });
}

if (registerCheck) {
  registerCheck.addEventListener("click", (event) => {
    event.preventDefault();
    location.replace("http://localhost:8080/auth?condition=register");
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
        location.replace("http://localhost:8080/product-list");
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

    try {
      const user: UserModel = await AuthApiService.register(registerData);

      if (user && user.id) {
        location.replace("http://localhost:8080/product-list");
      } else {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  });
}
