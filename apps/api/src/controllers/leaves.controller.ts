import { Request, Response } from "express";
import { z } from "zod";
import { leaves } from "../data/mock-db.js";
import { sendNotificationMail } from "../services/mail.service.js";

const leaveSchema = z.object({
  type: z.enum(["medical", "casual", "duty"]),
  from: z.string().min(8),
  to: z.string().min(8),
  reason: z.string().min(5)
});

const reviewSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  note: z.string().optional()
});

export async function listLeaves(req: Request, res: Response) {
  const user = req.authUser;
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  res.json(user.role === "student" ? leaves.filter((item) => item.userId === user.id) : leaves);
}

export async function createLeave(req: Request, res: Response) {
  const user = req.authUser;
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const parsed = leaveSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid leave payload", issues: parsed.error.flatten() });
    return;
  }

  const leave = {
    id: `leave-${leaves.length + 1}`,
    userId: user.id,
    ...parsed.data,
    status: "pending" as const
  };

  leaves.unshift(leave);
  await sendNotificationMail("admin@lotusvalley.test", "New leave request", `${user.name} submitted a leave request.`);
  res.status(201).json(leave);
}

export async function reviewLeave(req: Request, res: Response) {
  const leave = leaves.find((item) => item.id === req.params.id);
  if (!leave) {
    res.status(404).json({ message: "Leave not found" });
    return;
  }

  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid leave review payload", issues: parsed.error.flatten() });
    return;
  }

  leave.status = parsed.data.status;
  leave.reviewedBy = req.authUser?.id;
  leave.note = parsed.data.note;
  res.json(leave);
}
