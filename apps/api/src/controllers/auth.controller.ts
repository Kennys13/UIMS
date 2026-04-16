import { Request, Response } from "express";
import { z } from "zod";
import { authenticate } from "../services/auth.service.js";
import { verifyCaptcha } from "../services/captcha.service.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  captchaToken: z.string().min(1),
  allowedRoles: z.array(z.enum(["teacher", "hr", "admission", "admin", "student"])).optional()
});

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid login payload", issues: parsed.error.flatten() });
    return;
  }

  const captchaValid = await verifyCaptcha(parsed.data.captchaToken);
  if (!captchaValid) {
    res.status(400).json({ message: "CAPTCHA validation failed" });
    return;
  }

  const session = await authenticate(parsed.data.email, parsed.data.password);
  if (!session) {
    res.status(401).json({ message: "Invalid credentials or blocked account" });
    return;
  }

  if (parsed.data.allowedRoles?.length && !parsed.data.allowedRoles.includes(session.user.role)) {
    res.status(403).json({ message: "This account cannot use this login form" });
    return;
  }

  res.json(session);
}

export async function logout(_req: Request, res: Response) {
  res.json({ success: true });
}
