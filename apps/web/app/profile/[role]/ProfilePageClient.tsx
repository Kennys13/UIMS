"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ProfileForm } from "../../../components/profile/profile-form";
import { getProfile, login } from "../../../services/api";
import { getSession, saveSession } from "../../../services/session";
import { Role, User } from "../../../services/types";

const DEMO_EMAILS: Record<Role, string> = {
  student: "student@lotusvalley.test",
  teacher: "teacher@lotusvalley.test",
  hr: "hr@lotusvalley.test",
  admission: "admission@lotusvalley.test",
  admin: "admin@lotusvalley.test"
};

export default function ProfilePageClient({ params }: { params: { role: Role } }) {
  const [state, setState] = useState<{ token: string; user: User } | null>(null);

  useEffect(() => {
    async function load() {
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
      const user = await getProfile(session.token);
      setState({ token: session.token, user });
    }
    load();
  }, [params.role]);

  if (!state) {
    return <div className="mx-auto max-w-4xl px-5 py-16 text-slate-600">Loading profile...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="card-surface p-6">
          <Image src={state.user.profile.avatar} alt={state.user.name} width={240} height={240} className="h-60 w-full rounded-3xl object-cover" />
          <h1 className="mt-5 text-3xl font-semibold">{state.user.name}</h1>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[var(--accent)]">{state.user.role}</p>
          <p className="mt-2 text-sm text-slate-600">{state.user.designation}</p>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p>{state.user.email}</p>
            <p>{state.user.department}</p>
            <p>{state.user.profile.employeeOrStudentId}</p>
            <p>Joined: {state.user.joinedOn}</p>
          </div>
          <div className="mt-6 rounded-3xl bg-stone-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Profile summary</p>
            <p className="mt-2">{state.user.profile.bio}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="metric-card">
              <p className="text-sm text-slate-500">Role</p>
              <p className="mt-2 text-xl font-semibold">{state.user.role}</p>
            </div>
            <div className="metric-card">
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-2 text-xl font-semibold capitalize">{state.user.status}</p>
            </div>
            <div className="metric-card">
              <p className="text-sm text-slate-500">Campus ID</p>
              <p className="mt-2 text-xl font-semibold">{state.user.profile.employeeOrStudentId}</p>
            </div>
          </div>
          <ProfileForm token={state.token} profile={state.user.profile} />
        </div>
      </div>
    </div>
  );
}
