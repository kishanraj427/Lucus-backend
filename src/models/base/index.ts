import z from "zod";

export const BaseSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Base = z.infer<typeof BaseSchema>;

export const ApiResponseSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
