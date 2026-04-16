export type Role = "student" | "teacher" | "hr" | "admission" | "admin";
export type LeaveType = "medical" | "casual" | "duty";
export type LeaveStatus = "pending" | "approved" | "rejected";
export type UserStatus = "active" | "blocked";
export type AnnouncementLevel = "info" | "warning" | "success";

export type PublicContent = {
  heroSlides: Array<{ id: string; title: string; subtitle: string; cta: string }>;
  announcements: Array<{ id: string; title: string; message: string; level: AnnouncementLevel }>;
  facilities: string[];
  about: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
};

export type Profile = {
  phone: string;
  address: string;
  avatar: string;
  employeeOrStudentId: string;
  bio: string;
};

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
  status: UserStatus;
  department: string;
  joinedOn: string;
  designation: string;
  profile: Profile;
};

export type AttendanceRecord = {
  id: string;
  studentId: string;
  subject: string;
  facultyId: string;
  percentage: number;
  classesHeld: number;
  present: number;
};

export type LeaveRecord = {
  id: string;
  userId: string;
  type: LeaveType;
  from: string;
  to: string;
  reason: string;
  status: LeaveStatus;
  reviewedBy?: string;
  note?: string;
};

export type ResultRecord = {
  id: string;
  studentId: string;
  semester: string;
  gpa: number;
  publishedBy: string;
  subjects: Array<{ name: string; marks: number; grade: string }>;
};

export type FeeRecord = {
  id: string;
  studentId: string;
  total: number;
  paid: number;
  dueDate: string;
  status: "paid" | "partial" | "overdue";
};

export type AnnouncementRecord = {
  id: string;
  title: string;
  body: string;
  audience: Array<Role | "all">;
  createdAt: string;
  createdBy: string;
};

export type BannerRecord = {
  id: string;
  title: string;
  subtitle: string;
  active: boolean;
};

export type NotificationRecord = {
  id: string;
  title: string;
  body: string;
  audience: Array<Role | "all">;
  createdAt: string;
};
