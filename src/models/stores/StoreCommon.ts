import { z } from "zod";
import { BaseSchema } from "../base";

export const LocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
export type Location = z.infer<typeof LocationSchema>;

export const StoreBaseSchema = z.object({
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
  address: z.string(),
  location: LocationSchema,
  pricePerDay: z.number(),
  rating: z.number(),
});
export type StoreBase = z.infer<typeof StoreBaseSchema>;

export const StoreSchema = BaseSchema.and(StoreBaseSchema);
export type Store = z.infer<typeof StoreSchema>;
