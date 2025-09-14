import express from "express";
import dotenv from "dotenv";
import { UsersRouter } from "./routes/UserRoute";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.json("Welcome to Lucus");
});

app.use("/api/users", UsersRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
