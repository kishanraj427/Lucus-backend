import z from "zod";
import { LocationSchema, StoreBaseSchema } from "./StoreCommon";

export const GetAllStoreRequestSchema = z.object({
  location: LocationSchema,
  rating: z.number().optional().nullable(),
});
export type GetAllStoreRequest = z.infer<typeof GetAllStoreRequestSchema>;

export const CreateStoreRequestSchema = StoreBaseSchema;
export type CreateStoreRequest = z.infer<typeof CreateStoreRequestSchema>;

export const UpdateStoreRequestSchema = StoreBaseSchema.extend({
  id: z.number(),
});
export type UpdateStoreRequest = z.infer<typeof UpdateStoreRequestSchema>;

export const DeactivateStoreRequestSchema = z.object({
  id: z.number(),
});
export type DeactivateStoreRequest = z.infer<
  typeof DeactivateStoreRequestSchema
>;
