import { Router } from "express";
import { getAnalytics } from "../controllers/analytics.controller.js";
import { requireAuth, requireRoles } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

export const analyticsRouter = Router();
analyticsRouter.get("/overview", requireAuth, requireRoles("admin"), asyncHandler(getAnalytics));
