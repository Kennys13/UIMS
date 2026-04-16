import { Router } from "express";
import { createUser, deleteUser, listUsers, updateUserStatus } from "../controllers/users.controller.js";
import { requireAuth, requireRoles } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

export const usersRouter = Router();
usersRouter.use(requireAuth, requireRoles("admin", "hr", "admission"));
usersRouter.get("/", asyncHandler(listUsers));
usersRouter.post("/", asyncHandler(createUser));
usersRouter.patch("/:id/status", asyncHandler(updateUserStatus));
usersRouter.delete("/:id", asyncHandler(deleteUser));
