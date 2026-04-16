"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { mockStudents } from '../../lib/mockData';
import { Save, Download } from 'lucide-react';
import { toast } from 'sonner';

export function TeacherGrades() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedExam, setSelectedExam] = useState('mid-term');
  const [grades, setGrades] = useState<Record<string, { marks: string; totalMarks: string }>>(
    mockStudents.reduce((acc, student) => ({ 
      ...acc, 
      [student.id]: { marks: '', totalMarks: '100' } 
    }), {})
  );

  const handleGradeChange = (studentId: string, field: 'marks' | 'totalMarks', value: string) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: { ...(prev[studentId] ?? { marks: '', totalMarks: '100' }), [field]: value }
    }));
  };

  const calculateGrade = (marks: number, total: number) => {
    const percentage = (marks / total) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'D';
  };

  const handleSubmit = () => {
    toast.success('Grades submitted successfully!');
  };

  const handleExport = () => {
    toast.success('Grade report exported to CSV!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Enter Grades</h2>
        <p className="text-gray-600">Submit student grades and examination marks</p>
      </div>

      {/* Selection Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Select Class and Exam</CardTitle>
          <CardDescription>Choose the class and examination to enter grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-A">Class 10-A</SelectItem>
                  <SelectItem value="10-B">Class 10-B</SelectItem>
                  <SelectItem value="9-A">Class 9-A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Select defaultValue="mathematics">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Exam Type</label>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mid-term">Mid-Term</SelectItem>
                  <SelectItem value="final">Final Exam</SelectItem>
                  <SelectItem value="unit-test">Unit Test</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Total Marks</label>
              <Input
                type="number"
                defaultValue="100"
                onChange={(e) => {
                  const total = e.target.value;
                  setGrades(prev => {
                    const updated = { ...prev };
                    Object.keys(updated).forEach(key => {
                      updated[key] = { ...(updated[key] ?? { marks: '', totalMarks: '100' }), totalMarks: total };
                    });
                    return updated;
                  });
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grades Entry Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Grade Entry - Class {selectedClass}</CardTitle>
              <CardDescription>Enter marks for each student</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={handleExport}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSubmit}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Grades
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No.</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Marks Obtained</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStudents.map((student) => {
                const studentGrade = grades[student.id] ?? { marks: '', totalMarks: '100' };
                const marks = parseFloat(studentGrade.marks) || 0;
                const total = parseFloat(studentGrade.totalMarks) || 100;
                const percentage = marks > 0 ? ((marks / total) * 100).toFixed(1) : '-';
                const grade = marks > 0 ? calculateGrade(marks, total) : '-';

                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.class}-{student.section}</Badge>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max={studentGrade.totalMarks}
                        value={studentGrade.marks}
                        onChange={(e) => handleGradeChange(student.id, 'marks', e.target.value)}
                        className="w-24"
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={studentGrade.totalMarks}
                        onChange={(e) => handleGradeChange(student.id, 'totalMarks', e.target.value)}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{percentage}%</span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          grade.includes('A') ? 'bg-green-600' :
                          grade.includes('B') ? 'bg-blue-600' :
                          grade.includes('C') ? 'bg-yellow-600' :
                          'bg-gray-600'
                        }
                      >
                        {grade}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Grade Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution</CardTitle>
          <CardDescription>Overview of grade statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['A+', 'A', 'B+', 'B', 'C'].map((gradeLevel) => (
              <div key={gradeLevel} className="p-4 border rounded-lg text-center">
                <Badge className={
                  gradeLevel.includes('A+') ? 'bg-green-700' :
                  gradeLevel.includes('A') ? 'bg-green-600' :
                  gradeLevel.includes('B') ? 'bg-blue-600' :
                  'bg-yellow-600'
                }>
                  {gradeLevel}
                </Badge>
                <div className="text-2xl font-bold mt-2">0</div>
                <p className="text-xs text-gray-600">students</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grading Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Grading Scale Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { grade: 'A+', range: '90-100%' },
              { grade: 'A', range: '80-89%' },
              { grade: 'B+', range: '70-79%' },
              { grade: 'B', range: '60-69%' },
              { grade: 'C', range: '50-59%' },
            ].map((item) => (
              <div key={item.grade} className="p-3 border rounded-lg text-center">
                <div className="font-semibold">{item.grade}</div>
                <div className="text-sm text-gray-600">{item.range}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
