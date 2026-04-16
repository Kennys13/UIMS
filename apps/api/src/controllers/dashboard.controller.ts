import { Request, Response } from "express";
import { announcements, attendance, banners, fees, leaves, notifications, results, safeUser, siteContent, users, usersByRole } from "../data/mock-db.js";

export async function getDashboard(req: Request, res: Response) {
  const user = req.authUser;
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const studentAttendance = attendance.filter((item) => item.studentId === user.id);
  const studentResults = results.filter((item) => item.studentId === user.id);
  const studentFees = fees.find((item) => item.studentId === user.id);

  const payload = {
    user: safeUser(user),
    stats: {
      totalStudents: usersByRole("student").length,
      totalTeachers: usersByRole("teacher").length,
      totalStaff: users.filter((item) => item.role === "teacher" || item.role === "hr" || item.role === "admission").length,
      openLeaves: leaves.filter((item) => item.status === "pending").length,
      activeBanners: banners.filter((item) => item.active).length,
      averageAttendance: Math.round(
        attendance.reduce((sum, item) => sum + item.percentage, 0) / Math.max(attendance.length, 1)
      )
    },
    attendance: studentAttendance,
    leaves: user.role === "student" ? leaves.filter((item) => item.userId === user.id) : leaves,
    results: studentResults,
    fees: studentFees,
    users: users.map(safeUser),
    announcements: announcements.filter((item) => item.audience.includes("all") || item.audience.includes(user.role)),
    banners,
    notifications: notifications.filter((item) => item.audience.includes("all") || item.audience.includes(user.role)),
    siteContent,
    roleCollections: {
      students: users.filter((item) => item.role === "student").map(safeUser),
      teachers: users.filter((item) => item.role === "teacher").map(safeUser),
      staff: users.filter((item) => item.role === "teacher" || item.role === "hr" || item.role === "admission").map(safeUser)
    }
  };

  res.json(payload);
}
