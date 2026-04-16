import { env } from "../config/env.js";

export async function verifyCaptcha(token?: string) {
  if (!env.RECAPTCHA_SECRET_KEY) {
    return token === "demo-pass";
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: env.RECAPTCHA_SECRET_KEY,
      response: token ?? ""
    })
  });

  const result = (await response.json()) as { success?: boolean; score?: number };
  return Boolean(result.success && (result.score === undefined || result.score >= 0.4));
}
