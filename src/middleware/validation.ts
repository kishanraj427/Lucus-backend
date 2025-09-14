import { NextFunction, Request, Response, RequestHandler } from "express";
import { ZodSchema, ZodError } from "zod";

export function validateZodSchema<T>(schema: ZodSchema<T>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formatted = err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        res
          .status(400)
          .json({ message: "Invalid request body", errors: formatted });
        return;
      }
      next(err);
    }
  };
}
