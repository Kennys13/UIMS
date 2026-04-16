import { DashboardPayload } from "../services/types";

type CachedUser = { id: string; name: string; email: string; role: "student" | "teacher" | "admin" };

export interface Student { id: string; name: string; email: string; class: string; section: string; rollNumber: string; parentName: string; parentPhone: string; }
export interface Teacher { id: string; name: string; email: string; subject: string; classes: string[]; phone: string; }
export interface Attendance { date: string; status: "present" | "absent" | "late" | "excused"; subject?: string; }
export interface Grade { subject: string; marks: number; totalMarks: number; grade: string; examType: string; }
export interface Assignment { id: string; title: string; subject: string; dueDate: string; status: "pending" | "submitted" | "graded"; marks?: number; totalMarks: number; description: string; }
export interface Announcement { id: string; title: string; message: string; date: string; type: "general" | "urgent" | "event"; author: string; }
export interface TimetableEntry { day: string; periods: { time: string; subject: string; teacher: string; room: string }[]; }
export interface Fee { id: string; term: string; amount: number; paid: number; dueDate: string; status: "paid" | "pending" | "overdue"; }

function readCache(): DashboardPayload | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("lotus-valley-dashboard-cache");
  return raw ? (JSON.parse(raw) as DashboardPayload) : null;
}

const cache = readCache();
const currentUser = typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("currentUser") || "null") as CachedUser | null) : null;
function splitDepartment(value: string) { const match = value.match(/(\d+)[^A-Za-z0-9]*([A-Z])$/); return { className: match?.[1] ?? "10", section: match?.[2] ?? "A" }; }

export const mockStudents: Student[] = cache?.roleCollections.students.map((student, index) => {
  const { className, section } = splitDepartment(student.department);
  return { id: student.id, name: student.name, email: student.email, class: className, section, rollNumber: String(index + 1).padStart(2, "0"), parentName: `${student.name.split(" ")[0]}'s Guardian`, parentPhone: student.profile.phone };
}) ?? [];
export const mockTeachers: Teacher[] = cache?.roleCollections.teachers.map((teacher) => ({ id: teacher.id, name: teacher.name, email: teacher.email, subject: teacher.designation.replace(" Teacher", "") || "Subject", classes: [teacher.department], phone: teacher.profile.phone })) ?? [];
export const mockAttendance: Attendance[] = cache?.attendance.map((item) => ({ date: item.subject, subject: item.subject, status: item.percentage >= 90 ? "present" : item.percentage >= 75 ? "late" : item.percentage >= 60 ? "excused" : "absent" })) ?? [];
export const mockGrades: Grade[] = cache?.results.flatMap((result) => result.subjects.map((subject) => ({ subject: subject.name, marks: subject.marks, totalMarks: 100, grade: subject.grade, examType: result.semester }))) ?? [];
export const mockAssignments: Assignment[] = [
  { id: "A001", title: "Quadratic Equations Worksheet", subject: "Mathematics", dueDate: "2026-04-20", status: "pending", totalMarks: 20, description: "Complete exercises 1-15 from Chapter 4" },
  { id: "A002", title: "Photosynthesis Lab Report", subject: "Science", dueDate: "2026-04-18", status: "submitted", marks: 18, totalMarks: 20, description: "Submit detailed lab report with observations" },
  { id: "A003", title: "Essay on Climate Change", subject: "English", dueDate: "2026-04-25", status: "pending", totalMarks: 25, description: "Write a 500-word essay on climate change impacts" }
];
export const mockAnnouncements: Announcement[] = cache?.announcements.map((item) => ({ id: item.id, title: item.title, message: item.body, date: item.createdAt.slice(0, 10), type: item.title.toLowerCase().includes("exam") ? "event" : item.title.toLowerCase().includes("fee") ? "urgent" : "general", author: item.createdBy })) ?? [];
const teacherName = cache?.roleCollections.teachers[0]?.name ?? "Faculty";
export const mockTimetable: TimetableEntry[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => ({ day, periods: [
  { time: "8:00 - 8:45", subject: "Mathematics", teacher: teacherName, room: "101" },
  { time: "8:45 - 9:30", subject: "Science", teacher: teacherName, room: "102" },
  { time: "9:30 - 10:15", subject: "English", teacher: teacherName, room: "103" },
  { time: "10:15 - 10:30", subject: "Break", teacher: "-", room: "-" },
  { time: "10:30 - 11:15", subject: "Social Studies", teacher: teacherName, room: "104" },
  { time: "11:15 - 12:00", subject: "Computer Science", teacher: teacherName, room: "Lab-1" }
] }));
export const mockFees: Fee[] = cache?.fees ? [{ id: cache.fees.id, term: "Current Term", amount: cache.fees.total, paid: cache.fees.paid, dueDate: cache.fees.dueDate, status: cache.fees.status === "partial" ? "pending" : cache.fees.status }] : [];
export const mockUsers = currentUser ? [{ id: currentUser.id, name: currentUser.name, email: currentUser.email, role: currentUser.role, password: "Password@123" }] : [];
