import { Router } from "express";
import { createAnnouncement, createBanner, getPublicContent, listAnnouncements, listBanners, updateSiteContent } from "../controllers/content.controller.js";
import { requireAuth, requireRoles } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

export const contentRouter = Router();
contentRouter.get("/public", asyncHandler(getPublicContent));
contentRouter.get("/announcements", requireAuth, asyncHandler(listAnnouncements));
contentRouter.get("/banners", requireAuth, asyncHandler(listBanners));
contentRouter.post("/announcements", requireAuth, requireRoles("teacher", "admin"), asyncHandler(createAnnouncement));
contentRouter.post("/banners", requireAuth, requireRoles("admin"), asyncHandler(createBanner));
contentRouter.put("/site", requireAuth, requireRoles("admin"), asyncHandler(updateSiteContent));
