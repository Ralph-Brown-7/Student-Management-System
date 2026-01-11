import React from 'react';
import InstructorLayout from '@/components/layout/InstructorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockInstructorClasses } from '@/data/mockData';
import { BookOpen, Users, MapPin, Clock } from 'lucide-react';

export default function InstructorClasses() {
  return (
    <InstructorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Classes</h1>
          <p className="text-muted-foreground mt-1">Manage your assigned classes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {mockInstructorClasses.map((cls) => (
            <Card key={cls.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary">{cls.section}</Badge>
                </div>
                <CardTitle className="mt-3">{cls.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{cls.code}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{cls.students} Students Enrolled</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{cls.room}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{cls.schedule}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </InstructorLayout>
  );
}