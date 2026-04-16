import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { mockGrades } from '../../lib/mockData';
import { Award, TrendingUp, Target } from 'lucide-react';

export function StudentGrades() {
  const totalMarks = mockGrades.reduce((sum, g) => sum + g.marks, 0);
  const maxMarks = mockGrades.reduce((sum, g) => sum + g.totalMarks, 0);
  const percentage = Math.round((totalMarks / maxMarks) * 100);

  const getGradeColor = (grade: string) => {
    if (grade.includes('A+')) return 'bg-green-600';
    if (grade.includes('A')) return 'bg-green-500';
    if (grade.includes('B')) return 'bg-blue-500';
    if (grade.includes('C')) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getPerformanceLevel = (percent: number) => {
    if (percent >= 90) return { label: 'Excellent', color: 'text-green-600' };
    if (percent >= 80) return { label: 'Very Good', color: 'text-blue-600' };
    if (percent >= 70) return { label: 'Good', color: 'text-yellow-600' };
    if (percent >= 60) return { label: 'Satisfactory', color: 'text-orange-600' };
    return { label: 'Needs Improvement', color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Grades & Results</h2>
        <p className="text-gray-600">View your academic performance</p>
      </div>

      {/* Overall Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Percentage</CardTitle>
            <Award className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">{percentage}%</div>
            <Progress value={percentage} className="mt-3" />
            <p className="text-xs text-gray-600 mt-2">
              {totalMarks} out of {maxMarks} marks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Performance Level</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getPerformanceLevel(percentage).color}`}>
              {getPerformanceLevel(percentage).label}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Keep up the great work!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <Target className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-600">{mockGrades.length}</div>
            <p className="text-sm text-gray-600 mt-4">
              Subjects evaluated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Performance Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Performance</CardTitle>
          <CardDescription>Mid-Term Examination Results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockGrades.map((grade, index) => {
              const subjectPercent = Math.round((grade.marks / grade.totalMarks) * 100);
              return (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{grade.subject}</h4>
                    <Badge className={getGradeColor(grade.grade)}>
                      {grade.grade}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Marks Obtained</span>
                      <span className="font-semibold">{grade.marks}/{grade.totalMarks}</span>
                    </div>
                    <Progress value={subjectPercent} />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Percentage</span>
                      <span className={`font-semibold ${getPerformanceLevel(subjectPercent).color}`}>
                        {subjectPercent}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Grade Report</CardTitle>
          <CardDescription>Complete breakdown of your examination results</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Exam Type</TableHead>
                <TableHead>Marks Obtained</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockGrades.map((grade, index) => {
                const percent = Math.round((grade.marks / grade.totalMarks) * 100);
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{grade.subject}</TableCell>
                    <TableCell>{grade.examType}</TableCell>
                    <TableCell>{grade.marks}</TableCell>
                    <TableCell>{grade.totalMarks}</TableCell>
                    <TableCell>
                      <span className={`font-semibold ${getPerformanceLevel(percent).color}`}>
                        {percent}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getGradeColor(grade.grade)}>
                        {grade.grade}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="bg-gray-50 font-semibold">
                <TableCell colSpan={2}>Total / Average</TableCell>
                <TableCell>{totalMarks}</TableCell>
                <TableCell>{maxMarks}</TableCell>
                <TableCell>
                  <span className={`${getPerformanceLevel(percentage).color}`}>
                    {percentage}%
                  </span>
                </TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Grade Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Grading Scale</CardTitle>
          <CardDescription>Understanding your grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { grade: 'A+', range: '90-100%', color: 'bg-green-600' },
              { grade: 'A', range: '80-89%', color: 'bg-green-500' },
              { grade: 'B+', range: '70-79%', color: 'bg-blue-500' },
              { grade: 'B', range: '60-69%', color: 'bg-yellow-500' },
              { grade: 'C', range: 'Below 60%', color: 'bg-orange-500' },
            ].map((item) => (
              <div key={item.grade} className="text-center p-3 border rounded-lg">
                <Badge className={`${item.color} mb-2`}>{item.grade}</Badge>
                <p className="text-xs text-gray-600">{item.range}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
