import type { Request, Response } from "express";

export interface IApiProductController {
  // --------------------------------------------- CRUD
  setAllProducts(req: Request, res: Response): Promise<Response | void>;
  getAllProducts(req: Request, res: Response): Promise<Response | void>;
  getProduct(req: Request, res: Response): Promise<Response | void>;
  addProduct(req: Request, res: Response): Promise<Response | void>;
  updateProduct(req: Request, res: Response): Promise<Response | void>;
  deleteProduct(req: Request, res: Response): Promise<Response | void>;
  // --------------------------------------------- EXTRA
}
