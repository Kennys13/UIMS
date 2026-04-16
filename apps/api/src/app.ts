import cors from "cors";
import express from "express";
import rateLimitImport from "express-rate-limit";
import helmetImport from "helmet";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { analyticsRouter } from "./routes/analytics.routes.js";
import { attendanceRouter } from "./routes/attendance.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { contentRouter } from "./routes/content.routes.js";
import { dashboardRouter } from "./routes/dashboard.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { leavesRouter } from "./routes/leaves.routes.js";
import { profileRouter } from "./routes/profile.routes.js";
import { resultsRouter } from "./routes/results.routes.js";
import { usersRouter } from "./routes/users.routes.js";

const helmet = ("default" in helmetImport ? helmetImport.default : helmetImport) as typeof import("helmet").default;
const rateLimit = ("default" in rateLimitImport
  ? rateLimitImport.default
  : rateLimitImport) as typeof import("express-rate-limit").default;

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN.split(",").map((value) => value.trim()) }));
  app.use(express.json());
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

  app.get("/", (_req, res) => {
    res.json({ name: "Lotus Valley School API", version: "1.0.0" });
  });

  app.use("/api/health", healthRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/profile", profileRouter);
  app.use("/api/dashboard", dashboardRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/attendance", attendanceRouter);
  app.use("/api/leaves", leavesRouter);
  app.use("/api/results", resultsRouter);
  app.use("/api/content", contentRouter);
  app.use("/api/analytics", analyticsRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
