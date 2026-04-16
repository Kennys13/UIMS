"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { login } from "../../services/api";
import { RECAPTCHA_SITE_KEY } from "../../services/config";
import { saveSession } from "../../services/session";
import { Role } from "../../services/types";

const DEMO_EMAILS: Record<Role, string> = {
  student: "student@lotusvalley.test",
  teacher: "teacher@lotusvalley.test",
  hr: "hr@lotusvalley.test",
  admission: "admission@lotusvalley.test",
  admin: "admin@lotusvalley.test"
};

export function LoginPanel({
  title,
  subtitle,
  allowedRoles,
  preferredRole,
  redirectAdmin = false
}: {
  title: string;
  subtitle: string;
  allowedRoles: Role[];
  preferredRole: Role;
  redirectAdmin?: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_EMAILS[preferredRole]);
  const [password, setPassword] = useState("Password@123");
  const [captchaToken, setCaptchaToken] = useState(RECAPTCHA_SITE_KEY ? "" : "demo-pass");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const allowed = useMemo(() => allowedRoles, [allowedRoles]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const session = await login({ email, password, captchaToken: captchaToken || "demo-pass", allowedRoles: allowed });
      saveSession(session);
      router.push(redirectAdmin ? "/portal/admin" : `/portal/${session.user.role}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="card-surface w-full max-w-xl space-y-5 p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Secure Access</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">{title}</h1>
        <p className="mt-3 text-sm text-slate-600">{subtitle}</p>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-2xl border border-black/10 bg-white px-4 py-3" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-2xl border border-black/10 bg-white px-4 py-3" />
      </div>
      {RECAPTCHA_SITE_KEY ? (
        <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={(token: string | null) => setCaptchaToken(token ?? "")} />
      ) : (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Demo CAPTCHA mode is active. Add `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and backend secret keys for Google reCAPTCHA in production.
        </div>
      )}
      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
      <button disabled={loading} className="w-full rounded-full bg-slate-950 px-5 py-3 font-semibold text-white disabled:opacity-70">
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </motion.form>
  );
}

