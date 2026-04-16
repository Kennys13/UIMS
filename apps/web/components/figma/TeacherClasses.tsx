"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { mockStudents, mockTimetable } from '../../lib/mockData';
import { Users, BookOpen, Calendar, Mail, Phone } from 'lucide-react';

export function TeacherClasses() {
  const classes = [
    { code: '10-A', subject: 'Mathematics', students: 30, room: '101' },
    { code: '10-B', subject: 'Mathematics', students: 28, room: '102' },
    { code: '9-A', subject: 'Mathematics', students: 32, room: '101' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">My Classes</h2>
        <p className="text-gray-600">Manage your assigned classes</p>
      </div>

      {/* Class Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.code} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Class {classItem.code}</CardTitle>
                <Badge variant="outline">{classItem.subject}</Badge>
              </div>
              <CardDescription>Room {classItem.room}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Students</span>
                  <span className="font-semibold">{classItem.students}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Attendance</span>
                  <span className="font-semibold text-green-600">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Grade</span>
                  <span className="font-semibold text-blue-600">B+</span>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Class View */}
      <Card>
        <CardHeader>
          <CardTitle>Class Details</CardTitle>
          <CardDescription>Detailed information about your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="10-A">
            <TabsList className="mb-4">
              <TabsTrigger value="10-A">Class 10-A</TabsTrigger>
              <TabsTrigger value="10-B">Class 10-B</TabsTrigger>
              <TabsTrigger value="9-A">Class 9-A</TabsTrigger>
            </TabsList>

            {classes.map((classItem) => (
              <TabsContent key={classItem.code} value={classItem.code} className="space-y-6">
                {/* Class Info */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Class Code</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{classItem.code}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Subject</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{classItem.subject}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Room</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{classItem.room}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{classItem.students}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Student List */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Student List</CardTitle>
                        <CardDescription>All students in Class {classItem.code}</CardDescription>
                      </div>
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Roll No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Parent Name</TableHead>
                          <TableHead>Parent Phone</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.rollNumber}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                              <a href={`mailto:${student.email}`} className="text-blue-600 hover:underline text-sm">
                                {student.email}
                              </a>
                            </TableCell>
                            <TableCell>{student.parentName}</TableCell>
                            <TableCell>{student.parentPhone}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Mail className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Phone className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Class Schedule */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Class Schedule</CardTitle>
                        <CardDescription>Weekly timetable for Class {classItem.code}</CardDescription>
                      </div>
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTimetable.map((day) => (
                        <div key={day.day}>
                          <h4 className="font-semibold mb-2">{day.day}</h4>
                          <div className="grid gap-2">
                            {day.periods
                              .filter(p => p.subject === 'Mathematics')
                              .map((period, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                  <Badge variant="outline">{period.time}</Badge>
                                  <div className="flex-1">
                                    <p className="font-medium">{period.subject}</p>
                                    <p className="text-sm text-gray-600">Room {period.room}</p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
