import mongoose from "mongoose";
import type { ConnectOptions } from "mongoose";
import { ServerApiVersion } from "mongodb";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const clientOptions: ConnectOptions = {
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

    console.log("MongoDB Atlas connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
