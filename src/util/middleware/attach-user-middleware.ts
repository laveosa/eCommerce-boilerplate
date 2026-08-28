import type { Request, Response, NextFunction } from "express";
import UserService from "#src/service/UserService.js";

const userService = new UserService();

export const attachUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // TODO replace with valid userId
    const userId = "6a91906c46c9c25306e27040";

    if (userId) {
      const user = await userService.getUser(userId);
      req.user = user || null;
    } else {
      req.user = null;
    }
  } catch (error) {
    req.user = null;
  }

  next();
};
