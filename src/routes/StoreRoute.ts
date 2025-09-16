import { Router } from "express";
import { validateZodSchema } from "../middleware/validation";
import { authMiddleware } from "../middleware/auth";
import * as Models from "../models/AllModels";
import { StoreController } from "../controllers/StoreController";

export const StoresRouter = Router();

StoresRouter.post(
  "/",
  validateZodSchema(Models.GetAllStoreRequestSchema),
  StoreController.getAllStored
);

StoresRouter.post(
  "/create",
  authMiddleware,
  validateZodSchema(Models.CreateStoreRequestSchema),
  StoreController.createStore
);

StoresRouter.post(
  "/update",
  authMiddleware,
  validateZodSchema(Models.UpdateStoreRequestSchema),
  StoreController.updateStore
);

StoresRouter.post(
  "/deactivate",
  authMiddleware,
  validateZodSchema(Models.DeactivateStoreRequestSchema),
  StoreController.deactivateStore
);
