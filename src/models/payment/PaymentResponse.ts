import { z } from "zod";
import { PaymentSchema } from "./PaymentCommon";
import { ApiResponseSchema } from "../base";

export const GetAllPaymentResponseSchema = ApiResponseSchema.extend({
  payments: PaymentSchema.array(),
});
export type GetAllPaymentResponse = z.infer<typeof GetAllPaymentResponseSchema>;

export const CreatePaymentResponseSchema = ApiResponseSchema.extend({
  payment: PaymentSchema.optional().nullable(),
});
export type CreatePaymentResponse = z.infer<typeof CreatePaymentResponseSchema>;

export const GetPaymentResponseSchema = CreatePaymentResponseSchema;
export type GetPaymentResponse = z.infer<typeof GetPaymentResponseSchema>;

export const UpdatePaymentResponseSchema = CreatePaymentResponseSchema;
export type UpdatePaymentResponse = z.infer<typeof UpdatePaymentResponseSchema>;
