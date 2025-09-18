import { Request, Response, NextFunction } from "express";
import * as AllModels from "../models/AllModels";
import { StoreRepository } from "../repositories/StoreRepository";

export class BookingController {
  static async getAllBooking(req: Request, res: Response, next: NextFunction) {
    const request = req.body as AllModels.GetAllStoreRequest;
    const { id } = req.params;
    const userId = parseInt(id);
    if (!userId) {
      res.status(400).send({
        isSuccess: false,
        message: "Invalid user id.",
      } as AllModels.ApiResponse);
    }
    // const response = await StoreRepository.getAllStores(request);
    // res.status(response.isSuccess ? 200 : 500).send(response);
  }

  static async createBooking(req: Request, res: Response, next: NextFunction) {
    const request = req.body as AllModels.CreateBookingRequest;
    // const response = await StoreRepository.createStore(request);
    // res.status(response.isSuccess ? 200 : 500).send(response);
  }

  static async getBookingById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const bookingId = parseInt(id);
    if (!bookingId) {
      res.status(400).send({
        isSuccess: false,
        message: "Invalid booking id.",
      } as AllModels.ApiResponse);
    }
    const response = await StoreRepository.getStoreById(bookingId);
    res.status(response.isSuccess ? 200 : 500).send(response);
  }

  static async updateBooking(req: Request, res: Response, next: NextFunction) {
    const request = req.body as AllModels.UpdateStoreRequest;
    const { id } = req.params;
    const bookingId = parseInt(id);
    if (!bookingId) {
      res.status(400).send({
        isSuccess: false,
        message: "Invalid booking id.",
      } as AllModels.ApiResponse);
    }
    const response = await StoreRepository.updateStore(request);
    res.status(response.isSuccess ? 200 : 500).send(response);
  }

  static async deactivateBooking(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const bookingId = parseInt(id);
    if (!bookingId) {
      res.status(400).send({
        isSuccess: false,
        message: "Invalid booking id.",
      } as AllModels.ApiResponse);
    }
    const response = await StoreRepository.deactivateStore(bookingId);
    res.status(response.isSuccess ? 200 : 500).send(response);
  }
}
