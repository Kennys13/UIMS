"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "../../services/session";
import { DashboardLayout } from "./DashboardLayout";

export function RoleLayoutShell({ role, children }: { role: "student" | "teacher" | "admin"; children: React.ReactNode }) {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session || session.user.role !== role) {
      router.replace("/login");
      return;
    }
    setUserName(session.user.name);
  }, [role, router]);

  if (!userName) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">Loading...</div>;
  }

  return <DashboardLayout role={role} userName={userName}>{children}</DashboardLayout>;
}
