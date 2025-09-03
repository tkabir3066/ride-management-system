import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { router } from "./app/routes";
import { notFound } from "./app/middlewares/notFound";

const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Ride Booking Management System" });
});

// global Error Handler
app.use(globalErrorHandler);

app.use(notFound);
export default app;
