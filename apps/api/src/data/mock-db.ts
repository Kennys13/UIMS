import bcrypt from "bcryptjs";
import {
  AnnouncementRecord,
  AttendanceRecord,
  BannerRecord,
  FeeRecord,
  LeaveRecord,
  NotificationRecord,
  PublicContent,
  ResultRecord,
  Role,
  UserRecord
} from "../types/domain.js";

const passwordHash = bcrypt.hashSync("Password@123", 10);

export const users: UserRecord[] = [
  {
    id: "stu-101",
    name: "Aarav Mehta",
    email: "student@lotusvalley.test",
    role: "student",
    password: passwordHash,
    status: "active",
    department: "Grade 10 - A",
    joinedOn: "2024-07-12",
    designation: "Student",
    profile: {
      phone: "+91 9876543201",
      address: "Kolkata, West Bengal",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      employeeOrStudentId: "LVS-STU-101",
      bio: "A senior school student focused on academics, discipline, and co-curricular growth."
    }
  },
  {
    id: "stu-102",
    name: "Naina Das",
    email: "naina.das@lotusvalley.test",
    role: "student",
    password: passwordHash,
    status: "active",
    department: "Grade 8 - B",
    joinedOn: "2025-07-05",
    designation: "Student",
    profile: {
      phone: "+91 9876543211",
      address: "Rajarhat, Kolkata",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
      employeeOrStudentId: "LVS-STU-102",
      bio: "An active middle school student involved in clubs, projects, and school events."
    }
  },
  {
    id: "stu-103",
    name: "Rahul Banerjee",
    email: "rahul.banerjee@lotusvalley.test",
    role: "student",
    password: passwordHash,
    status: "active",
    department: "Grade 9 - A",
    joinedOn: "2023-07-17",
    designation: "Student",
    profile: {
      phone: "+91 9876543212",
      address: "Durgapur",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      employeeOrStudentId: "LVS-STU-103",
      bio: "A student with strong interest in mathematics, science, and technology activities."
    }
  },
  {
    id: "tea-201",
    name: "Dr. Meera Nair",
    email: "teacher@lotusvalley.test",
    role: "teacher",
    password: passwordHash,
    status: "active",
    department: "Senior School",
    joinedOn: "2021-02-10",
    designation: "Mathematics Teacher",
    profile: {
      phone: "+91 9876543202",
      address: "Salt Lake, Kolkata",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      employeeOrStudentId: "LVS-EMP-201",
      bio: "Leads mathematics instruction, classroom mentoring, and academic assessments."
    }
  },
  {
    id: "tea-202",
    name: "Prof. Arjun Sen",
    email: "arjun.sen@lotusvalley.test",
    role: "teacher",
    password: passwordHash,
    status: "active",
    department: "Middle School",
    joinedOn: "2022-08-19",
    designation: "Science Teacher",
    profile: {
      phone: "+91 9876543220",
      address: "Howrah",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
      employeeOrStudentId: "LVS-EMP-202",
      bio: "Teaches science with a focus on practical learning and student engagement."
    }
  },
  {
    id: "adm-301",
    name: "Ritika Sharma",
    email: "admission@lotusvalley.test",
    role: "admission",
    password: passwordHash,
    status: "active",
    department: "School Admissions Office",
    joinedOn: "2022-04-01",
    designation: "Admissions Manager",
    profile: {
      phone: "+91 9876543203",
      address: "New Town, Kolkata",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      employeeOrStudentId: "LVS-EMP-301",
      bio: "Handles admission operations, student records, and onboarding readiness."
    }
  },
  {
    id: "hr-401",
    name: "Sameer Kapoor",
    email: "hr@lotusvalley.test",
    role: "hr",
    password: passwordHash,
    status: "active",
    department: "Human Resources",
    joinedOn: "2020-06-15",
    designation: "HR Lead",
    profile: {
      phone: "+91 9876543204",
      address: "Park Street, Kolkata",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
      employeeOrStudentId: "LVS-EMP-401",
      bio: "Manages teacher lifecycle, staffing requests, and school people operations."
    }
  },
  {
    id: "admin-001",
    name: "Ishita Roy",
    email: "admin@lotusvalley.test",
    role: "admin",
    password: passwordHash,
    status: "active",
    department: "School Administration",
    joinedOn: "2019-01-03",
    designation: "Super Admin",
    profile: {
      phone: "+91 9876543205",
      address: "Lotus Valley School Headquarters",
      avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80",
      employeeOrStudentId: "LVS-ADMIN-001",
      bio: "Platform owner responsible for school governance, analytics, content, and system policy."
    }
  }
];

export const attendance: AttendanceRecord[] = [
  { id: "att-1", studentId: "stu-101", subject: "Mathematics", facultyId: "tea-201", percentage: 94, classesHeld: 32, present: 30 },
  { id: "att-2", studentId: "stu-101", subject: "Science", facultyId: "tea-202", percentage: 88, classesHeld: 30, present: 26 },
  { id: "att-3", studentId: "stu-101", subject: "English", facultyId: "tea-201", percentage: 91, classesHeld: 28, present: 25 },
  { id: "att-4", studentId: "stu-101", subject: "Social Science", facultyId: "tea-202", percentage: 96, classesHeld: 24, present: 23 },
  { id: "att-5", studentId: "stu-102", subject: "Mathematics", facultyId: "tea-201", percentage: 92, classesHeld: 29, present: 27 },
  { id: "att-6", studentId: "stu-102", subject: "Science", facultyId: "tea-202", percentage: 89, classesHeld: 27, present: 24 },
  { id: "att-7", studentId: "stu-103", subject: "English", facultyId: "tea-201", percentage: 95, classesHeld: 31, present: 29 },
  { id: "att-8", studentId: "stu-103", subject: "Computer Studies", facultyId: "tea-202", percentage: 87, classesHeld: 30, present: 26 }
];

export let leaves: LeaveRecord[] = [
  { id: "leave-1", userId: "stu-101", type: "medical", from: "2026-04-18", to: "2026-04-19", reason: "Viral fever", status: "pending" },
  { id: "leave-2", userId: "stu-101", type: "duty", from: "2026-03-21", to: "2026-03-21", reason: "Inter-school competition", status: "approved", reviewedBy: "tea-201", note: "Approved for school representation." },
  { id: "leave-3", userId: "tea-201", type: "casual", from: "2026-04-26", to: "2026-04-26", reason: "School training program", status: "pending" }
];

export const results: ResultRecord[] = [
  {
    id: "res-1",
    studentId: "stu-101",
    semester: "Term 2",
    gpa: 8.9,
    publishedBy: "tea-201",
    subjects: [
      { name: "Mathematics", marks: 91, grade: "A+" },
      { name: "Science", marks: 85, grade: "A" },
      { name: "English", marks: 88, grade: "A" },
      { name: "Social Science", marks: 93, grade: "A+" }
    ]
  },
  {
    id: "res-2",
    studentId: "stu-102",
    semester: "Term 1",
    gpa: 8.4,
    publishedBy: "tea-202",
    subjects: [
      { name: "Mathematics", marks: 87, grade: "A" },
      { name: "Science", marks: 82, grade: "A" },
      { name: "English", marks: 84, grade: "A" }
    ]
  }
];

export const fees: FeeRecord[] = [
  { id: "fee-1", studentId: "stu-101", total: 98000, paid: 76000, dueDate: "2026-04-30", status: "partial" },
  { id: "fee-2", studentId: "stu-102", total: 86000, paid: 86000, dueDate: "2026-04-25", status: "paid" },
  { id: "fee-3", studentId: "stu-103", total: 110000, paid: 45000, dueDate: "2026-04-20", status: "overdue" }
];

export let announcements: AnnouncementRecord[] = [
  { id: "ann-1", title: "Mid-semester exams begin", body: "Exam timetable has been published on the portal.", audience: ["all"], createdAt: "2026-04-09T09:00:00.000Z", createdBy: "admin-001" },
  { id: "ann-2", title: "Teacher review window", body: "HR portal now accepts internal staff review submissions.", audience: ["teacher", "hr", "admin"], createdAt: "2026-04-10T11:30:00.000Z", createdBy: "hr-401" },
  { id: "ann-3", title: "Admissions interaction slots open", body: "Admission team should confirm parent interaction schedules by Friday.", audience: ["admission", "admin"], createdAt: "2026-04-11T07:45:00.000Z", createdBy: "adm-301" }
];

export let banners: BannerRecord[] = [
  { id: "ban-1", title: "Admissions Open 2026", subtitle: "Applications are now open for the new school session.", active: true },
  { id: "ban-2", title: "Annual Activity Week", subtitle: "Join assemblies, sports events, club exhibitions, and performances.", active: true },
  { id: "ban-3", title: "Parent Orientation", subtitle: "New parent orientation and classroom visits begin next week.", active: false }
];

export const notifications: NotificationRecord[] = [
  { id: "not-1", title: "Fee installment due", body: "School fee installment is due on April 30.", audience: ["student"], createdAt: "2026-04-12T09:30:00.000Z" },
  { id: "not-2", title: "Attendance audit", body: "Teachers should finalize attendance before Friday evening.", audience: ["teacher"], createdAt: "2026-04-12T12:00:00.000Z" },
  { id: "not-3", title: "Staff roster sync", body: "HR and admission teams have pending profile cleanup items.", audience: ["hr", "admission", "admin"], createdAt: "2026-04-13T10:15:00.000Z" },
  { id: "not-4", title: "Admin dashboard refresh", body: "Analytics has been refreshed with the latest attendance and leave metrics.", audience: ["admin"], createdAt: "2026-04-14T05:30:00.000Z" }
];

export let siteContent: PublicContent = {
  heroSlides: [
    { id: "hero-1", title: "Lotus Valley School", subtitle: "A connected school ERP for students, teachers, staff, and school leadership.", cta: "Explore Portals" },
    { id: "hero-2", title: "Admissions, academics, HR, and analytics in one platform", subtitle: "Designed for modern schools that need speed, governance, and clean workflows.", cta: "Book a Visit" },
    { id: "hero-3", title: "Modern school operations without dashboard clutter", subtitle: "Manage records, class workflows, notices, and oversight from one polished system.", cta: "Open School ERP" }
  ],
  announcements: [
    { id: "flash-1", title: "Annual Day", message: "Annual day rehearsals begin from April 20.", level: "success" },
    { id: "flash-2", title: "Admission Deadline", message: "New session admission applications close on April 25.", level: "warning" }
  ],
  facilities: ["Smart classrooms", "Science and robotics labs", "Library and reading hub", "Sports and activity complex", "Centralized HR and admission workflows", "School analytics dashboard"],
  about: "Lotus Valley School uses a connected school ERP to manage admissions, academics, HR operations, notices, and leadership oversight with a polished user experience.",
  contact: {
    email: "hello@lotusvalleyschool.edu",
    phone: "+91 33 4000 2211",
    address: "Lotus Valley School Campus, Kolkata"
  }
};

export function findUser(id: string) {
  return users.find((user) => user.id === id);
}

export function findUserByEmail(email: string) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function usersByRole(role: Role) {
  return users.filter((user) => user.role === role);
}

export function safeUser(user: UserRecord) {
  const { password, ...rest } = user;
  return rest;
}
