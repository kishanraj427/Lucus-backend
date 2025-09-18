import { Request, Response, NextFunction } from "express";
import * as AllModels from "../models/AllModels";
import { StoreRepository } from "../repositories/StoreRepository";

export class PaymentController {
  static async getAllPayment(req: Request, res: Response, next: NextFunction) {
    const request = req.body as AllModels.GetAllStoreRequest;
    const response = await StoreRepository.getAllStores(request);
    res.status(response.isSuccess ? 200 : 500).send(response);
  }

  static async createPayment(req: Request, res: Response, next: NextFunction) {
    const request = req.body as AllModels.CreateStoreRequest;
    const response = await StoreRepository.createStore(request);
    res.status(response.isSuccess ? 200 : 500).send(response);
  }

  static async getPaymentById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const storeId = parseInt(id);
    if (!storeId) {
      res.status(400).send({
        isSuccess: false,
        message: "Invalid store id!",
      } as AllModels.ApiResponse);
    }
    const response = await StoreRepository.getStoreById(storeId);
    res.status(response.isSuccess ? 200 : 500).send(response);
  }
}
