"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { createAnnouncement, createBanner, getAnalytics, login, updateSiteContent } from "../../../services/api";
import { getSession, saveSession } from "../../../services/session";
import { AnalyticsPayload } from "../../../services/types";

export default function AdminContentPage() {
  const [token, setToken] = useState("");
  const [analytics, setAnalytics] = useState<AnalyticsPayload | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      let session = getSession();
      if (!session || session.user.role !== "admin") {
        session = await login({ email: "admin@lotusvalley.test", password: "Password@123", captchaToken: "demo-pass", allowedRoles: ["admin"] });
        saveSession(session);
      }
      setToken(session.token);
      setAnalytics(await getAnalytics(session.token));
    }
    load();
  }, []);

  if (!analytics) {
    return <div className="mx-auto max-w-4xl px-5 py-16 text-slate-600">Loading admin tools...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-5 py-10 lg:px-8">
      <div className="card-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Admin content center</p>
        <h1 className="mt-2 text-3xl font-semibold">Website configuration and live operations</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">This workspace combines school analytics, live content publishing, homepage banner control, and website configuration.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="metric-card"><p className="text-sm text-slate-500">Total users</p><p className="mt-2 text-3xl font-semibold">{analytics.users.total}</p></div>
        <div className="metric-card"><p className="text-sm text-slate-500">Pending leaves</p><p className="mt-2 text-3xl font-semibold">{analytics.leaves.pending}</p></div>
        <div className="metric-card"><p className="text-sm text-slate-500">Avg attendance</p><p className="mt-2 text-3xl font-semibold">{analytics.averageAttendance}%</p></div>
        <div className="metric-card"><p className="text-sm text-slate-500">Active banners</p><p className="mt-2 text-3xl font-semibold">{analytics.activeBanners}</p></div>
      </div>
      <div className="card-surface h-[320px] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Trendline</p>
        <h2 className="mt-2 text-2xl font-semibold">Admissions and attendance trend</h2>
        <div className="mt-5 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.trend}>
              <defs>
                <linearGradient id="trendAdmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f5f54" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0f5f54" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="admissions" stroke="#0f5f54" fill="url(#trendAdmissions)" strokeWidth={2} />
              <Area type="monotone" dataKey="attendance" stroke="#e08e2f" fillOpacity={0} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <form className="card-surface space-y-4 p-6" onSubmit={async (event) => {
          event.preventDefault();
          await createAnnouncement(token, { title: "Admin content update", body: "Homepage announcement refreshed.", audience: ["all"] });
          setMessage("Announcement created.");
        }}>
          <h2 className="text-2xl font-semibold">Publish announcement</h2>
          <button className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white">Push live</button>
        </form>
        <form className="card-surface space-y-4 p-6" onSubmit={async (event) => {
          event.preventDefault();
          await createBanner(token, { title: "Admissions banner", subtitle: "Homepage flash banner updated by admin.", active: true });
          setMessage("Banner created.");
        }}>
          <h2 className="text-2xl font-semibold">Create flash banner</h2>
          <button className="rounded-full bg-[var(--brand)] px-5 py-3 font-semibold text-white">Add banner</button>
        </form>
      </div>
      <form className="card-surface space-y-4 p-6" onSubmit={async (event) => {
        event.preventDefault();
        await updateSiteContent(token, {
          about: "Lotus Valley School ERP unifies academics, admissions, HR, notices, attendance, and school administration in one system.",
          facilities: ["Smart classrooms", "STEM and robotics lab", "Library and reading hub", "Sports and activity complex", "Integrated staff workflows"],
          contact: {
            email: "hello@lotusvalleyschool.edu",
            phone: "+91 33 4000 2211",
            address: "Lotus Valley School Campus, Kolkata"
          }
        });
        setMessage("Website configuration updated.");
      }}>
        <h2 className="text-2xl font-semibold">Website configuration</h2>
        <p className="text-sm text-slate-600">Push a curated homepage content update to verify the admin-controlled public content workflow.</p>
        <button className="rounded-full border border-black/10 px-5 py-3 font-semibold">Update homepage copy</button>
      </form>
      {message ? <p className="text-sm font-semibold text-emerald-700">{message}</p> : null}
    </div>
  );
}
