import { Request, Response, NextFunction } from "express";
import * as AllModels from "../models/AllModels";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    const registerUserSchema = req.body as AllModels.RegisterUserRequest;
    const response = await UserRepository.createUser(registerUserSchema);
    if (response.isSuccess) res.cookie("authToken", response.token);
    res.status(response.isSuccess ? 201 : 500).send(response);
  }

  static async logInUser(req: Request, res: Response, next: NextFunction) {
    const loginUserSchema = req.body as AllModels.LogInUserRequest;
    const response = await UserRepository.logInUser(loginUserSchema);
    if (response.isSuccess) res.cookie("authToken", response.token);
    res.status(response.isSuccess ? 200 : 500).send(response);
  }

  static async logOut(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("authToken");
    res
      .status(200)
      .send({ message: "Logged out successfully", isSuccess: true });
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const response = await UserRepository.getAllUsers();
    res.status(response.isSuccess ? 200 : 500).send(response);
  }
}
