import {
  GetAllUserResponse,
  RegisterUserResponse,
} from "../models/users/UserResponse";
import {
  LogInUserRequest,
  RegisterUserRequest,
} from "../models/users/UserRequest";
import { UserDbQueryExecuter } from "../dbexecuters/UserDbQueryExecuter";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/auth";

export class UserRepository {
  static async createUser(user: RegisterUserRequest) {
    const response: RegisterUserResponse = {
      message: "Failed to create user",
      isSuccess: false,
      token: null,
      user: null,
    };
    const userExists =
      (await UserDbQueryExecuter.checkUserByEmail(user.email)) ?? [];
    if (userExists.length) {
      response.message = "User already exists";
      return response;
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const newUser = await UserDbQueryExecuter.createUser(user);
      if (newUser) {
        response.message = "User created successfully";
        response.isSuccess = true;
        response.user = newUser.user;
        // Generate token (assuming you have a function to generate JWT)
        response.token = generateToken(newUser.user.id);
      } else {
        response.message = "Failed to create user";
      }
    }
    return response;
  }

  static async logInUser(user: LogInUserRequest) {
    const response: RegisterUserResponse = {
      message: "Failed to create user",
      isSuccess: false,
      token: null,
      user: null,
    };
    const { userData, message } = await UserDbQueryExecuter.loginUser(user);
    if (!userData) {
      response.message = message;
      return response;
    } else {
      response.token = generateToken(userData.id);
      response.user = userData;
      response.isSuccess = true;
      response.message = "User logged in successfully";
    }
    return response;
  }

  static async getAllUsers() {
    const response: GetAllUserResponse = {
      message: "Failed to fetch users data",
      isSuccess: false,
      users: [],
    };
    const users = await UserDbQueryExecuter.getAllUsers();
    if (users) {
      response.message = "Users fetched successfully";
      response.isSuccess = true;
      response.users = users;
    }
    return response;
  }
}
