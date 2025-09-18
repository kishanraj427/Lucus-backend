import express from "express";
import dotenv from "dotenv";
import { UsersRouter } from "./routes/UserRoute";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/auth";
import { StoresRouter } from "./routes/StoreRoute";
import { BookingsRouter } from "./routes/BookingsRoute";
import { PaymentsRouter } from "./routes/PaymentsRoute";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

app.get("/", async (req, res) => {
  res.json("Welcome to Lucus");
});

app.get("/api/check-token", authMiddleware, (req, res) => {
  res.json({ active: true, user: (req as any).user });
});

app.use("/api/users", UsersRouter);

app.use("/api/stores", StoresRouter);

app.use("/api/bookings", BookingsRouter);

app.use("/api/payments", PaymentsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
