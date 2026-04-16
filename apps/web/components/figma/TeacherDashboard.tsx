"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Users, BookOpen, Calendar, Award, Clock, Bell } from "lucide-react";
import { mockStudents, mockAnnouncements } from "../../lib/mockData";

export function TeacherDashboard() {
  const router = useRouter();
  const currentUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("currentUser") || "{}") : {};
  const todayClasses = [
    { time: "8:00 - 8:45", class: "10-A", subject: "Mathematics", room: "101" },
    { time: "8:45 - 9:30", class: "10-B", subject: "Mathematics", room: "102" },
    { time: "10:30 - 11:15", class: "9-A", subject: "Mathematics", room: "101" },
  ];

  return (
    <div className="space-y-6">
      <div><h2 className="text-3xl font-bold">Welcome, {currentUser.name || "Teacher"}!</h2><p className="text-gray-600">Here's your teaching overview for today</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Classes</CardTitle><BookOpen className="w-4 h-4 text-blue-600" /></CardHeader><CardContent><div className="text-2xl font-bold">3</div><p className="text-xs text-gray-600 mt-2">Classes assigned</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Students</CardTitle><Users className="w-4 h-4 text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{mockStudents.length}</div><p className="text-xs text-gray-600 mt-2">Students enrolled</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Today's Classes</CardTitle><Calendar className="w-4 h-4 text-orange-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{todayClasses.length}</div><p className="text-xs text-gray-600 mt-2">Scheduled for today</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Pending Tasks</CardTitle><Award className="w-4 h-4 text-purple-600" /></CardHeader><CardContent><div className="text-2xl font-bold">5</div><p className="text-xs text-gray-600 mt-2">Grades to enter</p></CardContent></Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Today's Schedule</CardTitle><CardDescription>Your classes for today</CardDescription></CardHeader><CardContent><div className="space-y-4">{todayClasses.map((classItem, index) => <div key={index} className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg"><div className="flex items-center justify-between"><div className="flex-1"><div className="flex items-center gap-3 mb-2"><Clock className="w-4 h-4 text-green-600" /><span className="font-semibold text-green-900">{classItem.time}</span><Badge variant="secondary">Class {classItem.class}</Badge></div><p className="font-medium">{classItem.subject}</p><p className="text-sm text-gray-600">Room {classItem.room}</p></div><div className="text-right"><Badge className="bg-green-600">Today</Badge></div></div></div>)}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Announcements</CardTitle><CardDescription>Latest updates</CardDescription></CardHeader><CardContent><div className="space-y-3">{mockAnnouncements.slice(0, 3).map((announcement) => <div key={announcement.id} className="p-3 bg-gray-50 rounded-lg"><div className="flex items-start gap-2"><Bell className="w-4 h-4 text-blue-600 mt-0.5" /><div className="flex-1 min-w-0"><p className="font-medium text-sm">{announcement.title}</p><p className="text-xs text-gray-600 mt-1 line-clamp-2">{announcement.message}</p><p className="text-xs text-gray-500 mt-1">{announcement.date}</p></div></div></div>)}</div></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Quick Actions</CardTitle><CardDescription>Common tasks and shortcuts</CardDescription></CardHeader><CardContent><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><button onClick={() => router.push("/teacher/attendance")} className="p-4 border rounded-lg hover:shadow-md transition-shadow text-left"><Calendar className="w-8 h-8 text-blue-600 mb-3" /><h4 className="font-semibold mb-1">Mark Attendance</h4><p className="text-sm text-gray-600">Take attendance for your classes</p></button><button onClick={() => router.push("/teacher/grades")} className="p-4 border rounded-lg hover:shadow-md transition-shadow text-left"><Award className="w-8 h-8 text-green-600 mb-3" /><h4 className="font-semibold mb-1">Enter Grades</h4><p className="text-sm text-gray-600">Submit student grades and marks</p></button><button onClick={() => router.push("/teacher/classes")} className="p-4 border rounded-lg hover:shadow-md transition-shadow text-left"><Users className="w-8 h-8 text-purple-600 mb-3" /><h4 className="font-semibold mb-1">View Classes</h4><p className="text-sm text-gray-600">Manage your class sections</p></button></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Class Performance Overview</CardTitle><CardDescription>Average performance across your classes</CardDescription></CardHeader><CardContent><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{["10-A", "10-B", "9-A"].map((classCode) => <div key={classCode} className="p-4 border rounded-lg"><div className="flex items-center justify-between mb-2"><h4 className="font-semibold">Class {classCode}</h4><Badge variant="outline">Mathematics</Badge></div><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-600">Students</span><span className="font-semibold">30</span></div><div className="flex justify-between"><span className="text-gray-600">Avg. Attendance</span><span className="font-semibold text-green-600">92%</span></div><div className="flex justify-between"><span className="text-gray-600">Avg. Grade</span><span className="font-semibold text-blue-600">B+</span></div></div></div>)}</div></CardContent></Card>
    </div>
  );
}
