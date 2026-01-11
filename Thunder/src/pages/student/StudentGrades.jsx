import React from 'react';
import StudentLayout from '@/components/layout/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockStudentGrades } from '@/data/mockData';
import { GraduationCap, TrendingUp, Award } from 'lucide-react';

export default function StudentGrades() {
  const averageGrade = mockStudentGrades.reduce((acc, g) => acc + g.total, 0) / mockStudentGrades.length;
  
  const gpa = mockStudentGrades.reduce((acc, g) => {
    const gradePoints = { 
      'A+': 4.0, 'A': 4.0, 'A-': 3.7, 
      'B+': 3.3, 'B': 3.0, 'B-': 2.7, 
      'C+': 2.3, 'C': 2.0 
    };
    return acc + (gradePoints[g.letterGrade] || 2.0);
  }, 0) / mockStudentGrades.length;

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (grade.startsWith('B')) return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    if (grade.startsWith('C')) return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    return 'bg-red-500/10 text-red-500 border-red-500/20';
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Grades</h1>
          <p className="text-muted-foreground mt-1">View your academic performance across all courses</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{gpa.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Current GPA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{averageGrade.toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-xl">
                  <Award className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{mockStudentGrades.length}</p>
                  <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grades Table */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-center">Midterm</TableHead>
                    <TableHead className="text-center">Final</TableHead>
                    <TableHead className="text-center">Assignments</TableHead>
                    <TableHead className="text-center">Attendance</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStudentGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{grade.courseName}</p>
                          <p className="text-sm text-muted-foreground">{grade.courseCode}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{grade.midterm || '-'}</TableCell>
                      <TableCell className="text-center">{grade.final || '-'}</TableCell>
                      <TableCell className="text-center">{grade.assignments}</TableCell>
                      <TableCell className="text-center">{grade.attendance}%</TableCell>
                      <TableCell className="text-center font-medium">{grade.total}%</TableCell>
                      <TableCell className="text-center">
                        <Badge className={getGradeColor(grade.letterGrade)}>
                          {grade.letterGrade}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Course Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockStudentGrades.map((grade) => (
              <div key={grade.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{grade.courseName}</span>
                  <span className="text-sm text-muted-foreground">{grade.total}%</span>
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