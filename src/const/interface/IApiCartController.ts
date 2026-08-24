import type { Request, Response } from "express";

export interface IApiCartController {
  // --------------------------------------------- CRUD
  setAllCarts(req: Request, res: Response): Promise<Response | void>;
  getAllCarts(req: Request, res: Response): Promise<Response | void>;
  getCart(req: Request, res: Response): Promise<Response | void>;
  addCart(req: Request, res: Response): Promise<Response | void>;
  updateCart(req: Request, res: Response): Promise<Response | void>;
  deleteCart(req: Request, res: Response): Promise<Response | void>;
  // --------------------------------------------- EXTRA
  getCartByUserId(req: Request, res: Response): Promise<Response | void>;
  addProductToCart(req: Request, res: Response): Promise<Response | void>;
  removeProductFromCart(req: Request, res: Response): Promise<Response | void>;
}
