import type { Request, Response } from "express";

import AuthService from "#src/service/AuthService.js";
import { isApiError } from "#src/util/helper/messages-helper.js";
import type { IApiAuthController } from "#src/const/interface/IApiAuthController.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";

class ApiAuthController {
  private static authService = new AuthService();

  static async register(req: Request, res: Response) {
    try {
      const user: UserModel = await this.authService.register(req.body);
      return res.status(200).send(user);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async signIn(req: Request, res: Response) {
    try {
      const user: UserModel = await this.authService.signIn(req.body);
      return res.status(200).send(user);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async signOut(req: Request, res: Response) {
    try {
      const user: UserModel = await this.authService.signOut(req.body);
      return res.status(200).send(user);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }
}

export default ApiAuthController satisfies IApiAuthController;
