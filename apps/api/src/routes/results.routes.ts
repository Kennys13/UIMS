import { Router } from "express";
import { createResult, listResults } from "../controllers/results.controller.js";
import { requireAuth, requireRoles } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

export const resultsRouter = Router();
resultsRouter.use(requireAuth);
resultsRouter.get("/:studentId?", asyncHandler(listResults));
resultsRouter.post("/", requireRoles("teacher", "admin"), asyncHandler(createResult));
