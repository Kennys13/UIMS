import mongoose from "mongoose";
import { env } from "./env.js";

let isConnected = false;

export async function connectDatabase() {
  if (isConnected) {
    return true;
  }

  try {
    await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 2500 });
    isConnected = true;
    return true;
  } catch {
    isConnected = false;
    return false;
  }
}

export function databaseState() {
  return isConnected ? "connected" : "mock";
}
