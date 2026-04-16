import { Router } from "express";
import { databaseState } from "../config/database.js";

export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", database: databaseState(), service: "lotus-valley-school-api" });
});
