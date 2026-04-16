"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Calendar, Award, FileText, DollarSign, Clock } from "lucide-react";
import { mockAttendance, mockGrades, mockAssignments, mockAnnouncements, mockFees } from "../../lib/mockData";

export function StudentDashboard() {
  const router = useRouter();
  const currentUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("currentUser") || "{}") : {};
  const totalClasses = mockAttendance.length || 1;
  const presentClasses = mockAttendance.filter((a) => a.status === "present").length;
  const attendancePercentage = Math.round((presentClasses / totalClasses) * 100);
  const totalMarks = mockGrades.reduce((sum, g) => sum + g.marks, 0);
  const maxMarks = mockGrades.reduce((sum, g) => sum + g.totalMarks, 0) || 1;
  const averagePercentage = Math.round((totalMarks / maxMarks) * 100);
  const pendingAssignments = mockAssignments.filter((a) => a.status === "pending").length;
  const totalFees = mockFees.reduce((sum, f) => sum + f.amount, 0);
  const paidFees = mockFees.reduce((sum, f) => sum + f.paid, 0);
  const pendingFees = totalFees - paidFees;

  return (
    <div className="space-y-6">
      <div><h2 className="text-3xl font-bold">Welcome back, {currentUser.name || "Student"}!</h2><p className="text-gray-600">Here's your academic overview</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Attendance</CardTitle><Calendar className="w-4 h-4 text-blue-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{attendancePercentage}%</div><Progress value={attendancePercentage} className="mt-2" /><p className="text-xs text-gray-600 mt-2">{presentClasses} of {totalClasses} records</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Average Marks</CardTitle><Award className="w-4 h-4 text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{averagePercentage}%</div><Progress value={averagePercentage} className="mt-2" /><p className="text-xs text-gray-600 mt-2">{totalMarks} of {maxMarks} marks</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Pending Assignments</CardTitle><FileText className="w-4 h-4 text-orange-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{pendingAssignments}</div><p className="text-xs text-gray-600 mt-4">{pendingAssignments > 0 ? "Action required" : "All caught up!"}</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Fee Status</CardTitle><DollarSign className="w-4 h-4 text-purple-600" /></CardHeader><CardContent><div className="text-2xl font-bold">INR {pendingFees.toLocaleString()}</div><p className="text-xs text-gray-600 mt-4">{pendingFees > 0 ? "Payment due" : "All paid"}</p></CardContent></Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Recent Announcements</CardTitle><CardDescription>Latest updates from the school</CardDescription></CardHeader><CardContent><div className="space-y-4">{mockAnnouncements.slice(0, 3).map((announcement) => <div key={announcement.id} className="border-l-4 border-blue-500 pl-4 py-2"><div className="flex items-start justify-between"><div className="flex-1"><h4 className="font-semibold">{announcement.title}</h4><p className="text-sm text-gray-600 mt-1">{announcement.message}</p><div className="flex items-center gap-3 mt-2"><Badge variant={announcement.type === "urgent" ? "destructive" : "secondary"}>{announcement.type}</Badge><span className="text-xs text-gray-500">{announcement.date}</span></div></div></div></div>)}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Upcoming Deadlines</CardTitle><CardDescription>Assignments due soon</CardDescription></CardHeader><CardContent><div className="space-y-4">{mockAssignments.filter((a) => a.status === "pending").map((assignment) => <div key={assignment.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"><Clock className="w-5 h-5 text-orange-500 mt-0.5" /><div className="flex-1 min-w-0"><p className="font-medium text-sm truncate">{assignment.title}</p><p className="text-xs text-gray-600">{assignment.subject}</p><p className="text-xs text-orange-600 mt-1">Due: {assignment.dueDate}</p></div></div>)}</div></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Academic Performance</CardTitle><CardDescription>Your grades across subjects</CardDescription></CardHeader><CardContent><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{mockGrades.map((grade, index) => <div key={index} className="p-4 border rounded-lg"><div className="flex items-center justify-between mb-2"><h4 className="font-semibold">{grade.subject}</h4><Badge variant={grade.grade.includes("A") ? "default" : "secondary"}>{grade.grade}</Badge></div><div className="flex items-center justify-between text-sm text-gray-600"><span>{grade.marks}/{grade.totalMarks}</span><span>{Math.round((grade.marks / grade.totalMarks) * 100)}%</span></div><Progress value={(grade.marks / grade.totalMarks) * 100} className="mt-2" /></div>)}</div></CardContent></Card>
    </div>
  );
}
