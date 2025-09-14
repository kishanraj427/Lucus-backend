import { UserDbQueryExecuter } from "../dbexecuters/UserDbQueryExecuter";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { ZodSchema, ZodError } from "zod";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET ?? "your_jwt_secret",
    { expiresIn: "1W" }
  );
  return token;
};

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.authToken ??
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    const user = await UserDbQueryExecuter.checkUserById((decoded as any).id);
    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication token failed!" });
  }
};
