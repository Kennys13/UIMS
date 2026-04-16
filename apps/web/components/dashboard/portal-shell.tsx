"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bell, ChevronDown, LayoutDashboard, LogOut, Settings, UserCircle2 } from "lucide-react";
import { clearSession } from "../../services/session";
import { Role, User } from "../../services/types";

const navByRole: Record<Role, string[]> = {
  student: ["Dashboard", "Attendance", "Results", "Fees", "Leaves", "Notices"],
  teacher: ["Dashboard", "Students", "Attendance", "Leaves", "Marks", "Announcements"],
  hr: ["Dashboard", "Staff", "Roles", "People Ops", "Profile"],
  admission: ["Dashboard", "Admissions", "Courses", "Records", "Profile"],
  admin: ["Dashboard", "Users", "Banners", "Analytics", "Config"]
};

export function PortalShell({ user, title, subtitle, children }: { user: User; title: string; subtitle: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <div className="dashboard-grid">
        <aside className="space-y-5">
          <div className="card-surface overflow-hidden p-6 text-white" style={{ background: "linear-gradient(160deg,#0a3f3a,#0f5f54 55%,#d97706)" }}>
            <p className="text-xs uppercase tracking-[0.18em] text-white/70">{user.role} portal</p>
            <h2 className="mt-3 text-2xl font-semibold">{user.name}</h2>
            <p className="mt-2 text-sm text-white/80">{user.department}</p>
          </div>
          <div className="card-surface p-4">
            <div className="space-y-2">
              {navByRole[user.role].map((item) => (
                <div key={item} className="rounded-2xl border border-black/5 bg-stone-50 px-4 py-3 text-sm font-medium text-slate-700">{item}</div>
              ))}
            </div>
          </div>
        </aside>
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Operational Dashboard</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-950">{title}</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">{subtitle}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {user.role === "admin" ? <Link href="/admin/content" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2"><Settings className="h-4 w-4" /> Content</Link> : null}
                <div className="relative">
                  <button onClick={() => setOpen((current) => !current)} className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-3 py-2 shadow-sm">
                    <img src={user.profile.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                    <span className="font-medium">{user.name.split(" ")[0]}</span>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </button>
                  {open ? (
                    <div className="absolute right-0 top-14 z-10 min-w-52 rounded-3xl border border-black/5 bg-white p-2 shadow-[0_20px_45px_-28px_rgba(15,33,49,0.45)]">
                      <Link href={`/profile/${user.role}`} className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm hover:bg-stone-50">
                        <UserCircle2 className="h-4 w-4" /> Profile
                      </Link>
                      <button
                        onClick={() => {
                          clearSession();
                          location.href = "/";
                        }}
                        className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm hover:bg-stone-50"
                      >
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-4 py-2"><LayoutDashboard className="h-4 w-4" /> Role-based workspace</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-4 py-2"><Bell className="h-4 w-4" /> Live notifications ready</span>
            </div>
          </motion.div>
          {children}
        </div>
      </div>
    </div>
  );
}
