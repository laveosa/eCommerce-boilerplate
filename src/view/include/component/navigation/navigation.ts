import { AuthApiService } from "#public/js/api-service/auth-api-service.js";
import { WebUrlEnum } from "#src/const/enum/WebUrlEnum.js";
import { clearAllCookies } from "#public/js/helpers/clear-all-cookies.js";

document.addEventListener("DOMContentLoaded", () => {
  const signOutBtn = document.querySelector<HTMLElement>(".sign-out-button");

  if (signOutBtn) {
    signOutBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        await AuthApiService.signOut();
        clearAllCookies();
        window.location.replace(WebUrlEnum.AUTH);
      } catch (error) {
        console.error("Sign-out failed:", error);
      }
    });
  }
});
