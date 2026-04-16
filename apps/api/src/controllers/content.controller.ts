import { Request, Response } from "express";
import { z } from "zod";
import { announcements, banners, siteContent } from "../data/mock-db.js";

const siteContentSchema = z.object({
  about: z.string().min(10).optional(),
  facilities: z.array(z.string().min(2)).optional(),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().min(5),
    address: z.string().min(5)
  }).optional()
});

const announcementSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(6),
  audience: z.array(z.enum(["student", "teacher", "hr", "admission", "admin", "all"])).optional()
});

const bannerSchema = z.object({
  title: z.string().min(3),
  subtitle: z.string().min(6),
  active: z.boolean().optional()
});

export async function getPublicContent(_req: Request, res: Response) {
  res.json({ siteContent, announcements, banners: banners.filter((item) => item.active) });
}

export async function updateSiteContent(req: Request, res: Response) {
  const parsed = siteContentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid site content payload", issues: parsed.error.flatten() });
    return;
  }

  siteContent.about = parsed.data.about ?? siteContent.about;
  siteContent.facilities = parsed.data.facilities ?? siteContent.facilities;
  siteContent.contact = parsed.data.contact ?? siteContent.contact;
  res.json(siteContent);
}

export async function listAnnouncements(_req: Request, res: Response) {
  res.json(announcements);
}

export async function createAnnouncement(req: Request, res: Response) {
  const parsed = announcementSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid announcement payload", issues: parsed.error.flatten() });
    return;
  }

  const announcement = {
    id: `ann-${announcements.length + 1}`,
    title: parsed.data.title,
    body: parsed.data.body,
    audience: parsed.data.audience ?? ["all"],
    createdAt: new Date().toISOString(),
    createdBy: req.authUser?.id ?? "system"
  };
  announcements.unshift(announcement);
  res.status(201).json(announcement);
}

export async function listBanners(_req: Request, res: Response) {
  res.json(banners);
}

export async function createBanner(req: Request, res: Response) {
  const parsed = bannerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid banner payload", issues: parsed.error.flatten() });
    return;
  }

  const banner = {
    id: `ban-${banners.length + 1}`,
    title: parsed.data.title,
    subtitle: parsed.data.subtitle,
    active: Boolean(parsed.data.active ?? true)
  };
  banners.unshift(banner);
  res.status(201).json(banner);
}
