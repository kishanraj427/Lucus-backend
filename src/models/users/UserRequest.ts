import z from "zod";

export const ZLogInUserRequest = z.object({
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  password: z.string().refine((val) => val.length > 0),
});
export type LogInUserRequest = z.infer<typeof ZLogInUserRequest>;

export const ZRegisterUserRequest = ZLogInUserRequest.extend({
  name: z.string().refine((val) => val.length > 0),
});
export type RegisterUserRequest = z.infer<typeof ZRegisterUserRequest>;
