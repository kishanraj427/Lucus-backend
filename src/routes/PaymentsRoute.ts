import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController";
import { validateZodSchema } from "../middleware/validation";
import { authMiddleware } from "../middleware/auth";
import * as AllModels from "../models/AllModels";

export const PaymentsRouter = Router();

PaymentsRouter.get("/", authMiddleware, PaymentController.getAllPayment);

PaymentsRouter.post(
  "/",
  authMiddleware,
  validateZodSchema(AllModels.CreatePaymentRequestSchema),
  PaymentController.createPayment
);

PaymentsRouter.get("/:id", PaymentController.getPaymentById);
