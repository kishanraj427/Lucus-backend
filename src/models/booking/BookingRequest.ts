import z from "zod";
import { BookingBaseSchema } from "./BookingCommon";

export const CreateBookingRequestSchema = BookingBaseSchema;
export type CreateBookingRequest = z.infer<typeof CreateBookingRequestSchema>;

export const UpdateBookingRequestSchema = BookingBaseSchema.extend({
  id: z.number(),
});
export type UpdateBookingRequest = z.infer<typeof UpdateBookingRequestSchema>;
