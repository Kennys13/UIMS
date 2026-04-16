import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = env.MAIL_HOST && env.MAIL_USER && env.MAIL_PASS
  ? nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: false,
      auth: { user: env.MAIL_USER, pass: env.MAIL_PASS }
    })
  : null;

export async function sendNotificationMail(to: string, subject: string, text: string) {
  if (!transporter) {
    return { delivered: false, reason: "mail-not-configured" };
  }

  await transporter.sendMail({ from: env.MAIL_FROM, to, subject, text });
  return { delivered: true };
}
