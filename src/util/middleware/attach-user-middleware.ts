import UserService from "#src/service/UserService.js";
import type { Request, Response, NextFunction } from "express";

const userService = new UserService();

export const attachUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.session?.userId;

    if (userId) {
      const user = await userService.getUser(userId);

      if (user) {
        req.user = user;
      } else {
        req.user = null;
        req.session = null;
      }
    } else {
      req.user = null;
    }
  } catch (error) {
    req.user = null;
    req.session = null;
  }

  next();
};
