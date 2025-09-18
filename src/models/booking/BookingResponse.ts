import z from "zod";
import { ApiResponseSchema } from "../base";
import { BookingSchema } from "./BookingCommon";

export const CreateBookingResponseSchema = ApiResponseSchema.and(BookingSchema);
export type CreateBookingResponse = z.infer<typeof CreateBookingResponseSchema>;

export const UpdateBookingResponseSchema = ApiResponseSchema.and(BookingSchema);
export type UpdateBookingResponse = z.infer<typeof UpdateBookingResponseSchema>;

export const GetAllBookingResponseSchema = ApiResponseSchema.extend({
  bookings: BookingSchema,
});
export type GetAllBookingResponse = z.infer<typeof GetAllBookingResponseSchema>;

export const GetBookingResponseSchema = ApiResponseSchema.and(BookingSchema);
export type GetBookingResponse = z.infer<typeof GetBookingResponseSchema>;
