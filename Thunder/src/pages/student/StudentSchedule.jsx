import React from 'react';
import StudentLayout from '@/components/layout/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockStudentSchedule } from '@/data/mockData';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function StudentSchedule() {
  /**
   * Filters and sorts classes for a specific day by start time.
   */
  const getClassesForDay = (day) => {
    return mockStudentSchedule
      .filter(item => item.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Schedule</h1>
          <p className="text-muted-foreground mt-1">View your weekly class schedule</p>
        </div>

        {/* Weekly Schedule Stack */}
        <div className="grid gap-4">
          {days.map((day) => {
            const classes = getClassesForDay(day);
            const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day;

            return (
              <Card key={day} className={isToday ? 'ring-2 ring-primary border-primary/50' : ''}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    {day}
                    {isToday && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 ml-2">
                        Today
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {classes.length > 0 ? (
                    <div className="space-y-3">
                      {classes.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors gap-3"
                        >
                          <div className="flex items-start gap-4">
                            {/* Visual indicator for class cards */}
                            <div className="w-1 h-full min-h-[60px] rounded-full bg-primary hidden sm:block" />
                            <div>
                              <p className="font-medium text-foreground">{item.courseName}</p>
                              <p className="text-sm text-muted-foreground">{item.courseCode}</p>
                              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="h-3.5 w-3.5" />
                                  {item.teacherName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {item.room}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1 w-fit font-mono">
                            <Clock className="h-3.5 w-3.5" />
                            {item.startTime} - {item.endTime}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-6 italic">No classes scheduled</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
}