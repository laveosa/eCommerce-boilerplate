import type { Request, Response } from "express";

export interface IApiAuthController {
  register(req: Request, res: Response): Promise<Response | void>;
  signIn(req: Request, res: Response): Promise<Response | void>;
  signOut(req: Request, res: Response): Promise<Response | void>;
}
