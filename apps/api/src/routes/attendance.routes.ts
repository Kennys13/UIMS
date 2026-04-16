import { Router } from "express";
import { getAttendance, markAttendance } from "../controllers/attendance.controller.js";
import { requireAuth, requireRoles } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

export const attendanceRouter = Router();
attendanceRouter.use(requireAuth);
attendanceRouter.get("/:studentId?", asyncHandler(getAttendance));
attendanceRouter.post("/mark", requireRoles("teacher", "admin"), asyncHandler(markAttendance));
