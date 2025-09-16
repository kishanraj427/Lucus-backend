import z from "zod";
import { BaseSchema } from "../base";

export const UserSchema = BaseSchema.extend({
  name: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  lastLogin: z.date(),
  isActive: z.boolean(),
});
export type User = z.infer<typeof UserSchema>;
