import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import multer from "multer";
import { z } from "zod";
import { safeUser, users } from "../data/mock-db.js";
import { resolveUploadedAvatar } from "../services/storage.service.js";

const upload = multer({ dest: "uploads/" });
export const profileUpload = upload.single("avatar");

const profileSchema = z.object({
  phone: z.string().min(3).optional(),
  address: z.string().min(3).optional(),
  bio: z.string().min(3).optional()
});

const passwordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8)
});

export async function getMyProfile(req: Request, res: Response) {
  if (!req.authUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  res.json(safeUser(req.authUser));
}

export async function updateMyProfile(req: Request, res: Response) {
  const user = req.authUser;
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const parsed = profileSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid profile payload", issues: parsed.error.flatten() });
    return;
  }

  user.profile.phone = parsed.data.phone ?? user.profile.phone;
  user.profile.address = parsed.data.address ?? user.profile.address;
  user.profile.bio = parsed.data.bio ?? user.profile.bio;
  const avatar = await resolveUploadedAvatar(req.file);
  if (avatar) {
    user.profile.avatar = avatar;
  }

  res.json(safeUser(user));
}

export async function changePassword(req: Request, res: Response) {
  const user = req.authUser;
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const parsed = passwordSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid password payload", issues: parsed.error.flatten() });
    return;
  }

  const valid = await bcrypt.compare(parsed.data.currentPassword, user.password);
  if (!valid) {
    res.status(400).json({ message: "Current password is incorrect" });
    return;
  }

  user.password = await bcrypt.hash(parsed.data.newPassword, 10);
  const refreshed = users.find((entry) => entry.id === user.id);
  res.json({ success: true, userId: refreshed?.id });
}
