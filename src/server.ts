import { Server } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

dotenv.config();

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.MONGO_URI);
    console.log("MongoDB connected successfully");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is running on port: ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

process.on("SIGTERM", () => {
  console.log("SIGTERM Signal received...server shutting down..");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
process.on("SIGINT", () => {
  console.log("SIGINT Signal received...server shutting down..");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection detected...server shutting down..", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception detected...server shutting down..", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
