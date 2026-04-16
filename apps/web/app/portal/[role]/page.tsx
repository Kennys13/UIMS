"use client";

import { useEffect, useState } from "react";
import { getDashboard, login } from "../../../services/api";
import { getSession, saveSession } from "../../../services/session";
import { DashboardPayload, Role, Session } from "../../../services/types";
import { PortalShell } from "../../../components/dashboard/portal-shell";
import { RoleDashboardSchool } from "../../../components/dashboard/role-dashboard-school";

const DEMO_EMAILS: Record<Role, string> = {
  student: "student@lotusvalley.test",
  teacher: "teacher@lotusvalley.test",
  hr: "hr@lotusvalley.test",
  admission: "admission@lotusvalley.test",
  admin: "admin@lotusvalley.test"
};

export function generateStaticParams() {
  return Object.keys(DEMO_EMAILS).map((role) => ({ role }));
}

export default function PortalPage({ params }: { params: { role: Role } }) {
  const [state, setState] = useState<{ session: Session; payload: DashboardPayload } | null>(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      let session = getSession();
      if (!session || session.user.role !== params.role) {
        session = await login({
          email: DEMO_EMAILS[params.role],
          password: "Password@123",
          captchaToken: "demo-pass",
          allowedRoles: [params.role]
        });
        saveSession(session);
      }
      const payload = await getDashboard(session.token);
      setState({ session, payload });
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load portal");
    }
  }

  useEffect(() => {
    load();
  }, [params.role]);

  if (error) {
    return <div className="mx-auto max-w-4xl px-5 py-16 text-rose-600">{error}</div>;
  }

  if (!state) {
    return <div className="mx-auto max-w-4xl px-5 py-16 text-slate-600">Loading portal...</div>;
  }

  return (
    <PortalShell
      user={state.session.user}
      title={`${state.session.user.role.charAt(0).toUpperCase()}${state.session.user.role.slice(1)} workspace`}
      subtitle="Lotus Valley School ERP with profile access, live actions, school operations, and role-based modules."
    >
      <RoleDashboardSchool token={state.session.token} payload={state.payload} onRefresh={load} />
    </PortalShell>
  );
}
