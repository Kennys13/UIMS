import { Router } from "express";
import { changePassword, getMyProfile, profileUpload, updateMyProfile } from "../controllers/profile.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

export const profileRouter = Router();
profileRouter.use(requireAuth);
profileRouter.get("/me", asyncHandler(getMyProfile));
profileRouter.put("/me", profileUpload, asyncHandler(updateMyProfile));
profileRouter.post("/change-password", asyncHandler(changePassword));
