import z from "zod";
import { StoreSchema } from "./StoreCommon";
import { ApiResponseSchema } from "../base";

export const GetAllStoreResponseSchema = ApiResponseSchema.extend({
  stores: StoreSchema.array(),
});
export type GetAllStoreResponse = z.infer<typeof GetAllStoreResponseSchema>;

export const CreateStoreResponseSchema = ApiResponseSchema.extend({
  store: StoreSchema.optional().nullable(),
});
export type CreateStoreResponse = z.infer<typeof CreateStoreResponseSchema>;

export const UpdateStoreResponseSchema = CreateStoreResponseSchema;
export type UpdateStoreResponse = z.infer<typeof UpdateStoreResponseSchema>;

export const DeactivateStoreResponseSchema = ApiResponseSchema;
export type DeactivateStoreResponse = z.infer<
  typeof DeactivateStoreResponseSchema
>;
