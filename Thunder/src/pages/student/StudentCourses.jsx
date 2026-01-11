import React from 'react';
import StudentLayout from '@/components/layout/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockStudentGrades, mockCourses } from '@/data/mockData';
import { BookOpen, User, Clock } from 'lucide-react';

export default function StudentCourses() {
  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground mt-1">View your enrolled courses and details</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockStudentGrades.map((grade) => {
            const course = mockCourses.find((c) => c.id === grade.courseId);
            
            return (
              <Card key={grade.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
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
                  </div>
                  <CardTitle className="text-lg mt-3">{grade.courseName}</CardTitle>
                  <p className="text-sm text-muted-foreground">{grade.courseCode}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{course?.teacherName || 'Instructor TBA'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{course?.credits || 3} Credits</span>
                  </div>
                  
                  <div className="pt-3 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Grade</span>
                      <span className="font-medium text-foreground">{grade.total}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Attendance</span>
                      <span className="font-medium text-foreground">{grade.attendance}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
}