import { User } from "./UserCommon";

export interface RegisterUserResponse {
  message: string;
  isSuccess: boolean;
  token: string | null;
  user: User | null;
}

export interface GetAllUserResponse {
  message: string;
  isSuccess: boolean;
  users: User[];
}
