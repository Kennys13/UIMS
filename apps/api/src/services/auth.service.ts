import bcrypt from "bcryptjs";
import { findUserByEmail, safeUser } from "../data/mock-db.js";
import { signToken } from "../utils/jwt.js";

export async function authenticate(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user || user.status !== "active") {
    return null;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return null;
  }

  const token = signToken({ sub: user.id, role: user.role, name: user.name, email: user.email });

  return { token, user: safeUser(user) };
}
