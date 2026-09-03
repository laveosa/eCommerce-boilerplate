import mongoose from "mongoose";
import dns from "node:dns";

import { ServerApiVersion } from "mongodb";
import type { ConnectOptions } from "mongoose";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const clientOptions: ConnectOptions = {
  dbName: process.env.DB_NAME,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

export const connectDB = async (): Promise<void> => {
  const connStr = process.env.MONGODB_URI;

  if (!connStr) {
    console.error(
      "MongoDB connection failed: MONGODB_URI environment variable is missing.",
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(connStr, clientOptions);

    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
    }

    console.log("[SERVER]: MongoDB database connected successfully.");
  } catch (error) {
    console.error("[SERVER_ERROR]: MongoDB database connection failed:", error);
    process.exit(1);
  }
};
