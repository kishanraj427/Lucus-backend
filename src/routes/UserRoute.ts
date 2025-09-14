import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validateZodSchema } from "../middleware/validation";
import { authMiddleware } from "../middleware/auth";
import * as Models from "../models/AllModels";
export const UsersRouter = Router();

UsersRouter.get("/", authMiddleware, UserController.getAllUsers);

UsersRouter.post(
  "/register",
  validateZodSchema(Models.ZRegisterUserRequest),
  UserController.registerUser
);

UsersRouter.post(
  "/login",
  validateZodSchema(Models.ZLogInUserRequest),
  UserController.logInUser
);

UsersRouter.post("/logout", UserController.logOut);
