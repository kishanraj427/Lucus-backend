import z from "zod";
import { BaseSchema } from "../base";

export const BookingBaseSchema = z.object({
  userId: z.number(),
  storeId: z.number(),
  paymentId: z.number(),
});
export type BookingBase = z.infer<typeof BookingBaseSchema>;

export const BookingSchema = BaseSchema.and(BookingBaseSchema);
export type Booking = z.infer<typeof BookingSchema>;
