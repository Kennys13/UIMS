"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BookOpen, Users, Award, Calendar, Bell, GraduationCap } from "lucide-react";

export function LandingPage() {
  const features = [
    { icon: <BookOpen className="w-8 h-8" />, title: "Academic Excellence", description: "Comprehensive curriculum with focus on holistic development" },
    { icon: <Users className="w-8 h-8" />, title: "Expert Faculty", description: "Highly qualified and experienced teaching staff" },
    { icon: <Award className="w-8 h-8" />, title: "Achievements", description: "Consistent academic and co-curricular excellence" },
    { icon: <Calendar className="w-8 h-8" />, title: "Events & Activities", description: "Regular events to enhance student engagement" },
    { icon: <Bell className="w-8 h-8" />, title: "Real-time Updates", description: "Stay informed with instant notifications" },
    { icon: <GraduationCap className="w-8 h-8" />, title: "Career Guidance", description: "Comprehensive counseling for future success" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">LOTUS VALLEY SCHOOL</h1>
              <p className="text-sm text-gray-600">Excellence in Education</p>
            </div>
          </div>
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link href="/login">Login to UIMS</Link>
          </Button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="space-y-6">
          <h2 className="text-5xl font-bold text-gray-900">Welcome to Lotus Valley School</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Empowering minds, nurturing talents, and shaping futures. Experience world-class education with our comprehensive University Information Management System.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700"><Link href="/login">Student Portal</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/login">Teacher Portal</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/login">Parent Portal</Link></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          <Card><CardHeader><CardTitle className="text-4xl font-bold text-blue-600">2500+</CardTitle><CardDescription>Students Enrolled</CardDescription></CardHeader></Card>
          <Card><CardHeader><CardTitle className="text-4xl font-bold text-purple-600">150+</CardTitle><CardDescription>Expert Faculty</CardDescription></CardHeader></Card>
          <Card><CardHeader><CardTitle className="text-4xl font-bold text-green-600">98%</CardTitle><CardDescription>Success Rate</CardDescription></CardHeader></Card>
          <Card><CardHeader><CardTitle className="text-4xl font-bold text-orange-600">25+</CardTitle><CardDescription>Years of Excellence</CardDescription></CardHeader></Card>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose Lotus Valley?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-6">Comprehensive UIMS Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div><h4 className="text-xl font-semibold mb-3">For Students</h4><ul className="space-y-2 text-blue-100"><li>View Attendance & Grades</li><li>Access Timetable</li><li>Submit Assignments</li><li>Track Fee Payments</li><li>Receive Announcements</li></ul></div>
            <div><h4 className="text-xl font-semibold mb-3">For Teachers</h4><ul className="space-y-2 text-blue-100"><li>Mark Attendance</li><li>Enter Grades</li><li>Manage Assignments</li><li>View Class Schedules</li><li>Communicate with Parents</li></ul></div>
            <div><h4 className="text-xl font-semibold mb-3">For Admins</h4><ul className="space-y-2 text-blue-100"><li>Manage Students & Teachers</li><li>Create Announcements</li><li>Generate Reports</li><li>Monitor Performance</li><li>Configure System</li></ul></div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div><h4 className="text-lg font-semibold mb-4">Contact Us</h4><p className="text-gray-400">Lotus Valley School</p><p className="text-gray-400">123 Education Lane</p><p className="text-gray-400">New Delhi, India 110001</p><p className="text-gray-400 mt-2">Phone: +91-11-12345678</p><p className="text-gray-400">Email: info@lotusvalley.edu</p></div>
            <div><h4 className="text-lg font-semibold mb-4">Quick Links</h4><ul className="space-y-2 text-gray-400"><li>About Us</li><li>Admissions</li><li>Academics</li><li>Events</li><li>Contact</li></ul></div>
            <div><h4 className="text-lg font-semibold mb-4">School Hours</h4><p className="text-gray-400">Monday - Friday</p><p className="text-gray-400">8:00 AM - 3:00 PM</p><p className="text-gray-400 mt-4">Office Hours</p><p className="text-gray-400">9:00 AM - 5:00 PM</p></div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"><p>&copy; 2026 Lotus Valley School. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  );
}
