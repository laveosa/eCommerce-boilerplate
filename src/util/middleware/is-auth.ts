import type { NextFunction, Request, Response } from "express";

import { WebUrlEnum } from "#src/const/enum/WebUrlEnum.js";

export function isAuth(req: Request, res: Response, next: NextFunction): void {
  const currentPath = req.originalUrl.split("?")[0];

  if (req.session?.userId && req.user) {
    return next();
  }

  if (currentPath === WebUrlEnum.AUTH) {
    return next();
  }

  return res.redirect(WebUrlEnum.AUTH);
}
