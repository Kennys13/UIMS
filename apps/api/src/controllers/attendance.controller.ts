import { Request, Response } from "express";
import { z } from "zod";
import { attendance } from "../data/mock-db.js";

const attendanceSchema = z.object({
  studentId: z.string().min(3),
  subject: z.string().min(2),
  classesHeld: z.coerce.number().int().min(1),
  present: z.coerce.number().int().min(0)
});

export async function getAttendance(req: Request, res: Response) {
  const studentId = req.params.studentId || req.authUser?.id;
  res.json(attendance.filter((item) => item.studentId === studentId));
}

export async function markAttendance(req: Request, res: Response) {
  const parsed = attendanceSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid attendance payload", issues: parsed.error.flatten() });
    return;
  }

  const record = {
    id: `att-${attendance.length + 1}`,
    studentId: parsed.data.studentId,
    subject: parsed.data.subject,
    facultyId: req.authUser?.id ?? "teacher",
    percentage: Math.round((parsed.data.present / parsed.data.classesHeld) * 100),
    classesHeld: parsed.data.classesHeld,
    present: parsed.data.present
  };
  attendance.push(record);
  res.status(201).json(record);
}
