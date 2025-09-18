import { z } from "zod";
import { BaseSchema } from "../base";

export const PaymentBaseSchema = z.object({
  amount: z.number(),
  discount: z.number(),
  mrp: z.number(),
  currency: z.string(),
  status: z.enum(["PENDING", "COMPLETED", "FAILED"]),
  method: z.enum(["UPI", "Credit Card", "Debit Card", "Cash"]),
  transactionId: z.string(),
  storeId: z.number(),
  userId: z.number(),
}).refine((data) => {
  // Calculate expected amount: mrp - (mrp * discount / 100)
  // Assuming discount is a percentage (e.g., 10 for 10% off)
  const expectedAmount = data.mrp - (data.mrp * data.discount / 100);
  
  // Check if the provided amount matches the calculated amount
  // Using a small tolerance for floating point precision
  return Math.abs(data.amount - expectedAmount) < 0.01;
}, {
  message: "Amount must be equal to MRP minus discount",
  path: ["amount"],
});

export type PaymentBase = z.infer<typeof PaymentBaseSchema>;

export const PaymentSchema = BaseSchema.and(PaymentBaseSchema);
export type Payment = z.infer<typeof PaymentSchema>;