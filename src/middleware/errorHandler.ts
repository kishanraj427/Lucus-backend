import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    const formatted = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    res.status(400).json({ message: 'Invalid request body', errors: formatted });
    return;
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
  return;
}
