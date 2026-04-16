import { Request, Response } from "express";
import { z } from "zod";
import { results } from "../data/mock-db.js";

const resultSchema = z.object({
  studentId: z.string().min(3),
  semester: z.string().min(2),
  gpa: z.coerce.number().min(0).max(10),
  subjects: z.array(
    z.object({
      name: z.string().min(2),
      marks: z.coerce.number().min(0).max(100),
      grade: z.string().min(1)
    })
  ).min(1)
});

export async function listResults(req: Request, res: Response) {
  const studentId = req.params.studentId || req.authUser?.id;
  res.json(results.filter((item) => item.studentId === studentId));
}

export async function createResult(req: Request, res: Response) {
  const parsed = resultSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid result payload", issues: parsed.error.flatten() });
    return;
  }

  const result = {
    id: `res-${results.length + 1}`,
    publishedBy: req.authUser?.id ?? "teacher",
    ...parsed.data
  };
  results.unshift(result);
  res.status(201).json(result);
}
