import { z } from "zod";
import { PaymentBaseSchema } from "./PaymentCommon";

export const GetAllPaymentRequestSchema = z.object({
  storeId: z.number().optional().nullable(),
  userId: z.number().optional().nullable(),
  status: z.string().optional().nullable(),
});
export type GetAllPaymentRequest = z.infer<typeof GetAllPaymentRequestSchema>;

export const CreatePaymentRequestSchema = PaymentBaseSchema;
export type CreatePaymentRequest = z.infer<typeof CreatePaymentRequestSchema>;

export const UpdatePaymentRequestSchema = PaymentBaseSchema.extend({
  id: z.number(),
});
export type UpdatePaymentRequest = z.infer<typeof UpdatePaymentRequestSchema>;