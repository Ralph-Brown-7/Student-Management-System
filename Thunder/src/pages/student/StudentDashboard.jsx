import React from 'react';
import StudentLayout from '@/components/layout/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { mockStudents, mockStudentAssignments, mockStudentGrades, mockStudentSchedule } from '@/data/mockData';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  FileText,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { format } from 'date-fns';

export default function StudentDashboard() {
  const { user } = useAuth();
  const student = mockStudents.find(s => s.id === user?.studentId);
  
  const pendingAssignments = mockStudentAssignments.filter(a => a.status === 'pending').length;
  const averageGrade = mockStudentGrades.reduce((acc, g) => acc + g.total, 0) / mockStudentGrades.length;
  const todaySchedule = mockStudentSchedule.filter(s => s.day === 'Monday'); // Simulated logic

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, {student?.firstName || 'Student'}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your academic progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{student?.gpa?.toFixed(2) || '3.80'}</p>
                  <p className="text-xs text-muted-foreground">Current GPA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <BookOpen className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockStudentGrades.length}</p>
                  <p className="text-xs text-muted-foreground">Enrolled Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <FileText className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{pendingAssignments}</p>
                  <p className="text-xs text-muted-foreground">Pending Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{averageGrade.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySchedule.length > 0 ? (
                todaySchedule.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-10 rounded-full bg-primary" />
                      <div>
                        <p className="font-medium text-foreground">{item.courseName}</p>
                        <p className="text-sm text-muted-foreground">{item.room} • {item.teacherName}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.startTime}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No classes scheduled for today</p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Upcoming Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockStudentAssignments
                .filter(a => a.status === 'pending')
                .slice(0, 4)
                .map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                    </div>
                    <Badge variant="secondary">
                      Due {format(new Date(assignment.dueDate), 'MMM d')}
                    </Badge>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        {/* Course Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Course Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockStudentGrades.map((grade) => (
              <div key={grade.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{grade.courseName}</p>
                    <p className="text-sm text-muted-foreground">{grade.courseCode}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        grade.letterGrade.startsWith('A')
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : grade.letterGrade.startsWith('B')
                          ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }
                    >
                      {grade.letterGrade}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">{grade.total}%</p>
                  </div>
                </div>
                <Progress value={grade.total} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}