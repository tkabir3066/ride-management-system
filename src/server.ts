import { Server } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected successfully");

    server = app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
