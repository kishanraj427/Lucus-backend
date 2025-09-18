import { Router } from "express";
import { BookingController } from "../controllers/BookingController";
import { validateZodSchema } from "../middleware/validation";
import { authMiddleware } from "../middleware/auth";
import * as AllModels from "../models/AllModels";

export const BookingsRouter = Router();

BookingsRouter.get(
  "/users/:id",
  authMiddleware,
  BookingController.getAllBooking
);

BookingsRouter.post(
  "/",
  authMiddleware,
  validateZodSchema(AllModels.CreateBookingRequestSchema),
  BookingController.createBooking
);

BookingsRouter.get("/:id", authMiddleware, BookingController.getBookingById);

BookingsRouter.put(
  "/:id",
  authMiddleware,
  validateZodSchema(AllModels.UpdateBookingRequestSchema),
  BookingController.updateBooking
);

BookingsRouter.delete(
  "/:id",
  authMiddleware,
  BookingController.deactivateBooking
);
