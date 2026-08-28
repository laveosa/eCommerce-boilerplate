import type { Request, Response } from "express";

import UserService from "#src/service/UserService.js";
import { isApiError } from "#src/util/helper/messages-helper.js";
import type { IApiUserController } from "#src/const/interface/IApiUserController.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";

class ApiUserController {
  private static userService = new UserService();

  // --------------------------------------------- CRUD

  static async setAllUsers(req: Request, res: Response) {
    try {
      const users: UserModel[] = await this.userService.set(req.body);
      return res.status(200).send(users);
    } catch (error) {
      isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users: UserModel[] = await this.userService.get();
      return res.status(200).send(users);
    } catch (error) {
      isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async getUser(req: Request, res: Response) {
    const userId = req.params.id.toString();

    try {
      const user: UserModel = await this.userService.getUser(userId);
      return res.status(200).send(user);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async addUser(req: Request, res: Response) {
    try {
      const user: UserModel = await this.userService.addUser(req.body);
      return res.status(200).send(user);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const user: UserModel = await this.userService.addUser(req.body);
      return res.status(200).send(user);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const userId = req.params.id.toString();

    try {
      const user: UserModel = await this.userService.deleteUser(userId);
      return res.status(200).send(user);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }

  // --------------------------------------------- EXTRA

  static async updatePassword(req: Request, res: Response) {
    try {
      const updated: boolean = await this.userService.updatePassword(req.body);
      return res.status(200).send(updated);
    } catch (error) {
      return isApiError(error)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Internal Server Error");
    }
  }
}

export default ApiUserController satisfies IApiUserController;
