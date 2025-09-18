import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validateZodSchema } from "../middleware/validation";
import { authMiddleware } from "../middleware/auth";
import * as Models from "../models/AllModels";

export const UsersRouter = Router();

UsersRouter.get("/", authMiddleware, UserController.getAllUsers);

UsersRouter.post(
  "/register",
  validateZodSchema(Models.RegisterUserRequestSchema),
  UserController.registerUser
);

UsersRouter.post(
  "/login",
  validateZodSchema(Models.LogInUserRequestSchema),
  UserController.logInUser
);

UsersRouter.post("/logout", UserController.logOut);
