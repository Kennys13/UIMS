import { Router } from "express";
import { createLeave, listLeaves, reviewLeave } from "../controllers/leaves.controller.js";
import { requireAuth, requireRoles } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

export const leavesRouter = Router();
leavesRouter.use(requireAuth);
leavesRouter.get("/", asyncHandler(listLeaves));
leavesRouter.post("/", requireRoles("student", "teacher"), asyncHandler(createLeave));
leavesRouter.patch("/:id", requireRoles("teacher", "hr", "admin"), asyncHandler(reviewLeave));
