import { NextFunction, Request, Response } from "express";
import { findUser } from "../data/mock-db.js";
import { Role } from "../types/domain.js";
import { verifyToken } from "../utils/jwt.js";

declare global {
  namespace Express {
    interface Request {
      authUser?: ReturnType<typeof findUser>;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  try {
    const payload = verifyToken(token);
    const user = findUser(payload.sub);
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    req.authUser = user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

export function requireRoles(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.authUser || !roles.includes(req.authUser.role)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
}
