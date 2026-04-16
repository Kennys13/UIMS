"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { GraduationCap, Home, Calendar, BookOpen, FileText, DollarSign, Users, Bell, Settings, LogOut, Menu, X, ClipboardList, Award, UserCircle, Megaphone } from "lucide-react";
import { clearSession } from "../../services/session";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "student" | "teacher" | "admin";
  userName: string;
}

export function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("lotus-valley-dashboard-cache");
    clearSession();
    router.push("/login");
  };

  const navItems = role === "student"
    ? [
        { icon: Home, label: "Dashboard", path: "/student" },
        { icon: Calendar, label: "Attendance", path: "/student/attendance" },
        { icon: Award, label: "Grades", path: "/student/grades" },
        { icon: BookOpen, label: "Timetable", path: "/student/timetable" },
        { icon: FileText, label: "Assignments", path: "/student/assignments" },
        { icon: DollarSign, label: "Fees", path: "/student/fees" },
      ]
    : role === "teacher"
      ? [
          { icon: Home, label: "Dashboard", path: "/teacher" },
          { icon: ClipboardList, label: "Mark Attendance", path: "/teacher/attendance" },
          { icon: Award, label: "Enter Grades", path: "/teacher/grades" },
          { icon: Users, label: "My Classes", path: "/teacher/classes" },
        ]
      : [
          { icon: Home, label: "Dashboard", path: "/admin" },
          { icon: Users, label: "Students", path: "/admin/students" },
          { icon: UserCircle, label: "Teachers", path: "/admin/teachers" },
          { icon: Megaphone, label: "Announcements", path: "/admin/announcements" },
        ];

  const roleColor = { student: "from-blue-600 to-purple-600", teacher: "from-green-600 to-teal-600", admin: "from-orange-600 to-red-600" };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</Button>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${roleColor[role]} rounded-lg flex items-center justify-center`}><GraduationCap className="w-6 h-6 text-white" /></div>
              <div><h1 className="text-lg font-bold">LOTUS VALLEY SCHOOL</h1><p className="text-xs text-gray-600 capitalize">{role} Portal</p></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm"><Bell className="w-5 h-5" /></Button>
            <div className="hidden md:flex items-center gap-2">
              <div className="text-right"><p className="text-sm font-medium">{userName}</p><p className="text-xs text-gray-600 capitalize">{role}</p></div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">{userName.charAt(0)}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={cn("fixed lg:sticky top-[57px] left-0 z-30 h-[calc(100vh-57px)] w-64 bg-white border-r transition-transform duration-300 overflow-y-auto", sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link key={item.path} href={item.path} onClick={() => setSidebarOpen(false)}>
                  <div className={cn("flex items-center gap-3 px-4 py-3 rounded-lg transition-colors", isActive ? `bg-gradient-to-r ${roleColor[role]} text-white` : "text-gray-700 hover:bg-gray-100")}>
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t mt-auto absolute bottom-0 w-full bg-white">
            <Button variant="ghost" className="w-full justify-start gap-3 mb-2"><Settings className="w-5 h-5" />Settings</Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}><LogOut className="w-5 h-5" />Logout</Button>
          </div>
        </aside>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>

      {sidebarOpen ? <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} /> : null}
    </div>
  );
}
