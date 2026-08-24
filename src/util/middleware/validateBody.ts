import { ZodError, ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issueMessages = error.issues.map(
          (i) => `${i.path.join(".")}: ${i.message}`,
        );
        return res
          .status(400)
          .send(`[VALIDATION_ERROR]: ${issueMessages.join(", ")}`);
      }
      return res.status(400).send("Invalid request payload");
    }
  };
};
