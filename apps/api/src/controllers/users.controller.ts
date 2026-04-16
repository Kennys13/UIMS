import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { z } from "zod";
import { safeUser, users } from "../data/mock-db.js";
import { Role } from "../types/domain.js";

const roleSchema = z.enum(["student", "teacher", "hr", "admission", "admin"]);
const userCreateSchema = z.object({
  role: roleSchema,
  name: z.string().min(2),
  email: z.string().email(),
  department: z.string().min(2),
  designation: z.string().optional(),
  employeeOrStudentId: z.string().min(3),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  password: z.string().min(8).optional()
});

const querySchema = z.object({
  role: roleSchema.optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10)
});

const statusSchema = z.object({
  status: z.enum(["active", "blocked"])
});

export async function listUsers(req: Request, res: Response) {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid query parameters", issues: parsed.error.flatten() });
    return;
  }

  const { role, search, page, limit } = parsed.data;
  const normalizedSearch = search?.trim().toLowerCase();
  const filtered = users
    .filter((user) => !role || user.role === role)
    .filter((user) =>
      !normalizedSearch ||
      user.name.toLowerCase().includes(normalizedSearch) ||
      user.email.toLowerCase().includes(normalizedSearch) ||
      user.department.toLowerCase().includes(normalizedSearch)
    );

  const offset = (page - 1) * limit;
  res.json({
    items: filtered.slice(offset, offset + limit).map(safeUser),
    total: filtered.length,
    page,
    limit,
    totalPages: Math.ceil(filtered.length / limit)
  });
}

export async function createUser(req: Request, res: Response) {
  const parsed = userCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid user payload", issues: parsed.error.flatten() });
    return;
  }

  const role = parsed.data.role as Role;
  const idPrefix = role === "student" ? "stu" : role === "teacher" ? "tea" : role === "hr" ? "hr" : role === "admission" ? "adm" : "admx";
  const user = {
    id: `${idPrefix}-${Math.floor(Math.random() * 900 + 100)}`,
    name: parsed.data.name,
    email: parsed.data.email,
    role,
    password: await bcrypt.hash(parsed.data.password ?? "Password@123", 10),
    status: "active" as const,
    department: parsed.data.department,
    joinedOn: new Date().toISOString().slice(0, 10),
    designation: parsed.data.designation ?? (role === "student" ? "Student" : "Staff Member"),
    profile: {
      phone: parsed.data.phone ?? "",
      address: parsed.data.address ?? "",
      avatar: "https://placehold.co/200x200/png?text=LVS",
      employeeOrStudentId: parsed.data.employeeOrStudentId,
      bio: parsed.data.bio ?? "Profile created from the Lotus Valley School management console."
    }
  };

  users.unshift(user);
  res.status(201).json(safeUser(user));
}

export async function updateUserStatus(req: Request, res: Response) {
  const user = users.find((entry) => entry.id === req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid status payload", issues: parsed.error.flatten() });
    return;
  }

  user.status = parsed.data.status;
  res.json(safeUser(user));
}

export async function deleteUser(req: Request, res: Response) {
  const index = users.findIndex((entry) => entry.id === req.params.id);
  if (index < 0) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  users.splice(index, 1);
  res.status(204).send();
}
