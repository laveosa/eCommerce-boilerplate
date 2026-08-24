import type { Request, Response } from "express";

export interface IApiOrderController {
  // --------------------------------------------- CRUD
  setAllOrders(req: Request, res: Response): Promise<Response | void>;
  getAllOrders(req: Request, res: Response): Promise<Response | void>;
  getOrder(req: Request, res: Response): Promise<Response | void>;
  addOrder(req: Request, res: Response): Promise<Response | void>;
  updateOrder(req: Request, res: Response): Promise<Response | void>;
  deleteOrder(req: Request, res: Response): Promise<Response | void>;
  // --------------------------------------------- EXTRA
  addCartToOrder(req: Request, res: Response): Promise<Response | void>;
  removeCartFromOrder(req: Request, res: Response): Promise<Response | void>;
}
