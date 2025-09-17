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

StoresRouter.get("/:id", authMiddleware, StoreController.getStoreById);

StoresRouter.post(
  "/create",
  authMiddleware,
  validateZodSchema(Models.CreateStoreRequestSchema),
  StoreController.createStore
);

StoresRouter.post(
  "/:id",
  authMiddleware,
  validateZodSchema(Models.UpdateStoreRequestSchema),
  StoreController.updateStore
);

StoresRouter.delete("/:id", authMiddleware, StoreController.deactivateStore);
