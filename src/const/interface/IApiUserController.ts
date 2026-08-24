import type { Request, Response } from "express";

export interface IApiUserController {
  // --------------------------------------------- CRUD
  setAllUsers(req: Request, res: Response): Promise<Response | void>;
  getAllUsers(req: Request, res: Response): Promise<Response | void>;
  getUser(req: Request, res: Response): Promise<Response | void>;
  addUser(req: Request, res: Response): Promise<Response | void>;
  updateUser(req: Request, res: Response): Promise<Response | void>;
  deleteUser(req: Request, res: Response): Promise<Response | void>;
  // --------------------------------------------- EXTRA
  updatePassword(req: Request, res: Response): Promise<Response | void>;
}
