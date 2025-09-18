import z from "zod";

export const LogInUserRequestSchema = z.object({
  email: z.email(),
  phone: z.string().optional().nullable(),
  password: z.string().refine((val) => val.length > 0),
});
export type LogInUserRequest = z.infer<typeof LogInUserRequestSchema>;

export const RegisterUserRequestSchema = LogInUserRequestSchema.extend({
  name: z.string().refine((val) => val.length > 0),
});
export type RegisterUserRequest = z.infer<typeof RegisterUserRequestSchema>;
