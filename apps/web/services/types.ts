export type Role = "student" | "teacher" | "hr" | "admission" | "admin";
export type UserStatus = "active" | "blocked";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  department: string;
  joinedOn: string;
  designation: string;
  profile: {
    phone: string;
    address: string;
    avatar: string;
    employeeOrStudentId: string;
    bio: string;
  };
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

export type ResultRecord = {
  id: string;
  studentId: string;
  semester: string;
  gpa: number;
  publishedBy: string;
  subjects: Array<{ name: string; marks: number; grade: string }>;
};

export type LeaveRecord = {
  id: string;
  userId: string;
  type: "medical" | "casual" | "duty";
  from: string;
  to: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string;
  note?: string;
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
  audience: string[];
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
  audience: string[];
  createdAt: string;
};

export type PublicPayload = {
  siteContent: {
    heroSlides: Array<{ id: string; title: string; subtitle: string; cta: string }>;
    announcements: Array<{ id: string; title: string; message: string; level: string }>;
    facilities: string[];
    about: string;
    contact: { email: string; phone: string; address: string };
  };
  announcements: AnnouncementRecord[];
  banners: BannerRecord[];
};

export type Session = { token: string; user: User };

export type DashboardPayload = {
  user: User;
  stats: {
    totalStudents: number;
    totalTeachers: number;
    totalStaff: number;
    openLeaves: number;
    activeBanners: number;
    averageAttendance: number;
  };
  attendance: AttendanceRecord[];
  leaves: LeaveRecord[];
  results: ResultRecord[];
  fees?: FeeRecord;
  users: User[];
  announcements: AnnouncementRecord[];
  banners: BannerRecord[];
  notifications: NotificationRecord[];
  roleCollections: {
    students: User[];
    teachers: User[];
    staff: User[];
  };
};

export type PaginatedUsers = {
  items: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type AnalyticsPayload = {
  users: {
    students: number;
    teachers: number;
    hr: number;
    admission: number;
    admins: number;
    total: number;
  };
  leaves: {
    pending: number;
    approved: number;
    rejected: number;
  };
  averageAttendance: number;
  activeBanners: number;
  trend: Array<{ month: string; admissions: number; attendance: number; leaves: number }>;
};
