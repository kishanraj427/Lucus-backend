import { Request, Response, NextFunction } from "express";
import * as AllModels from "../models/AllModels";
import { StoreRepository } from "../repositories/StoreRepository";

export class StoreController {
  static async getAllStored(req: Request, res: Response, next: NextFunction) {
    const request = req.body as AllModels.GetAllStoreRequest;
    const response = await StoreRepository.getAllStores(request);
    res.status(response.isSuccess ? 200 : 500).send(response);
  }

  static async createStore(req: Request, res: Response, next: NextFunction) {
    const request = req.body as AllModels.CreateStoreRequest;
    const response = await StoreRepository.createStore(request);
    res.status(response.isSuccess ? 200 : 500).send(response);
  }

  static async updateStore(req: Request, res: Response, next: NextFunction) {
    const request = req.body as AllModels.UpdateStoreRequest;
    const response = await StoreRepository.updateStore(request);
    res.status(response.isSuccess ? 200 : 500).send(response);
  }

  static async deactivateStore(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const request = req.body as AllModels.DeactivateStoreRequest;
    const response = await StoreRepository.deactivateStore(request);
    res.status(response.isSuccess ? 200 : 500).send(response);
  }
}
