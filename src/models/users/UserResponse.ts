import z from "zod";
import { ApiResponseSchema } from "../base";
import { UserSchema } from "./UserCommon";

export const RegisterUserResponseSchema = ApiResponseSchema.extend({
  token: z.string().optional().nullable(),
  user: UserSchema.optional().nullable(),
});
export type RegisterUserResponse = z.infer<typeof RegisterUserResponseSchema>;

export const GetAllUserResponseSchema = ApiResponseSchema.extend({
  users: UserSchema.array(),
});
export type GetAllUserResponse = z.infer<typeof GetAllUserResponseSchema>;
