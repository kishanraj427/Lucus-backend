import { NextFunction, Request, Response, RequestHandler } from "express";
import { ZodType, ZodError } from "zod";

export function validateZodSchema<T>(schema: ZodType<T>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formatted = err.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        return res
          .status(400)
          .json({ message: "Invalid request body", error: formatted });
      }
      next(err);
    }
  };
}
