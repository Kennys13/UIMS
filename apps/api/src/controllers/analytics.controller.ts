import { Request, Response } from "express";
import { attendance, banners, leaves, users, usersByRole } from "../data/mock-db.js";

export async function getAnalytics(_req: Request, res: Response) {
  const averageAttendance = Math.round(
    attendance.reduce((sum, item) => sum + item.percentage, 0) / Math.max(attendance.length, 1)
  );

  res.json({
    users: {
      students: usersByRole("student").length,
      teachers: usersByRole("teacher").length,
      hr: usersByRole("hr").length,
      admission: usersByRole("admission").length,
      admins: usersByRole("admin").length,
      total: users.length
    },
    leaves: {
      pending: leaves.filter((item) => item.status === "pending").length,
      approved: leaves.filter((item) => item.status === "approved").length,
      rejected: leaves.filter((item) => item.status === "rejected").length
    },
    averageAttendance,
    activeBanners: banners.filter((item) => item.active).length,
    trend: [
      { month: "Jan", admissions: 48, attendance: 89, leaves: 7 },
      { month: "Feb", admissions: 52, attendance: 91, leaves: 5 },
      { month: "Mar", admissions: 61, attendance: 90, leaves: 6 },
      { month: "Apr", admissions: 68, attendance: 92, leaves: 8 }
    ]
  });
}
