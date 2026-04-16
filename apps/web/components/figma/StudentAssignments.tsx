"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { mockAssignments } from '../../lib/mockData';
import { FileText, Clock, CheckCircle, Award, Upload, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export function StudentAssignments() {
  const [assignments, setAssignments] = useState(mockAssignments);

  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const gradedCount = assignments.filter(a => a.status === 'graded').length;

  const handleSubmit = (id: string) => {
    setAssignments(prev => 
      prev.map(a => 
        a.id === id ? { ...a, status: 'submitted' as const } : a
      )
    );
    toast.success('Assignment submitted successfully!');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'submitted':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'graded':
        return <Award className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'submitted':
        return 'default';
      case 'graded':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Assignments</h2>
        <p className="text-gray-600">Manage and submit your assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-600" />
              <div className="text-3xl font-bold text-orange-700">{pendingCount}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700">Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              <div className="text-3xl font-bold text-blue-700">{submittedCount}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700">Graded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-green-600" />
              <div className="text-3xl font-bold text-green-700">{gradedCount}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <Card>
        <CardHeader>
          <CardTitle>All Assignments</CardTitle>
          <CardDescription>View and manage your assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({assignments.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
              <TabsTrigger value="submitted">Submitted ({submittedCount})</TabsTrigger>
              <TabsTrigger value="graded">Graded ({gradedCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {assignments.map((assignment) => (
                <AssignmentCard 
                  key={assignment.id} 
                  assignment={assignment} 
                  onSubmit={handleSubmit}
                />
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {assignments
                .filter(a => a.status === 'pending')
                .map((assignment) => (
                  <AssignmentCard 
                    key={assignment.id} 
                    assignment={assignment} 
                    onSubmit={handleSubmit}
                  />
                ))}
            </TabsContent>

            <TabsContent value="submitted" className="space-y-4">
              {assignments
                .filter(a => a.status === 'submitted')
                .map((assignment) => (
                  <AssignmentCard 
                    key={assignment.id} 
                    assignment={assignment} 
                    onSubmit={handleSubmit}
                  />
                ))}
            </TabsContent>

            <TabsContent value="graded" className="space-y-4">
              {assignments
                .filter(a => a.status === 'graded')
                .map((assignment) => (
                  <AssignmentCard 
                    key={assignment.id} 
                    assignment={assignment} 
                    onSubmit={handleSubmit}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

interface AssignmentCardProps {
  assignment: typeof mockAssignments[0];
  onSubmit: (id: string) => void;
}

function AssignmentCard({ assignment, onSubmit }: AssignmentCardProps) {
  const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status === 'pending';

  return (
    <div className={`border rounded-lg p-4 ${isOverdue ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold">{assignment.title}</h4>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                <Badge variant="outline">{assignment.subject}</Badge>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Due: {assignment.dueDate}
                </span>
              </div>
              <p className="text-sm text-gray-600">{assignment.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <Badge variant={assignment.status === 'pending' ? 'secondary' : (assignment.status === 'submitted' ? 'default' : 'outline')}>
              {assignment.status}
            </Badge>
            {assignment.status === 'graded' && (
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-600">
                  {assignment.marks}/{assignment.totalMarks} marks
                </span>
              </div>
            )}
            {isOverdue && (
              <Badge variant="destructive">Overdue</Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {assignment.status === 'pending' && (
            <>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => onSubmit(assignment.id)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Submit Assignment
              </Button>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </>
          )}
          {assignment.status === 'submitted' && (
            <Button variant="outline">
              <CheckCircle className="w-4 h-4 mr-2" />
              Submitted
            </Button>
          )}
          {assignment.status === 'graded' && (
            <Button variant="outline">
              View Feedback
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
