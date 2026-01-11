import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockCourses, mockClasses } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const timeSlots = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Mock schedule data
const scheduleData = [
  { day: 'Monday', time: '8:00 AM', courseId: '1', classId: '1', room: 'Room 101' },
  { day: 'Monday', time: '10:00 AM', courseId: '2', classId: '2', room: 'Room 202' },
  { day: 'Monday', time: '1:00 PM', courseId: '3', classId: '1', room: 'Room 103' },
  { day: 'Tuesday', time: '9:00 AM', courseId: '4', classId: '2', room: 'Lab 1' },
  { day: 'Tuesday', time: '11:00 AM', courseId: '5', classId: '3', room: 'Room 301' },
  { day: 'Tuesday', time: '2:00 PM', courseId: '1', classId: '3', room: 'Room 101' },
  { day: 'Wednesday', time: '8:00 AM', courseId: '2', classId: '1', room: 'Room 202' },
  { day: 'Wednesday', time: '10:00 AM', courseId: '3', classId: '2', room: 'Room 103' },
  { day: 'Thursday', time: '9:00 AM', courseId: '5', classId: '1', room: 'Room 301' },
  { day: 'Thursday', time: '11:00 AM', courseId: '4', classId: '3', room: 'Lab 1' },
  { day: 'Thursday', time: '2:00 PM', courseId: '1', classId: '2', room: 'Room 101' },
  { day: 'Friday', time: '8:00 AM', courseId: '3', classId: '3', room: 'Room 103' },
  { day: 'Friday', time: '10:00 AM', courseId: '2', classId: '3', room: 'Room 202' },
  { day: 'Friday', time: '1:00 PM', courseId: '5', classId: '2', room: 'Room 301' },
];

const courseColors = [
  'bg-primary/10 border-primary/30 text-primary',
  'bg-accent/10 border-accent/30 text-accent',
  'bg-success/10 border-success/30 text-success',
  'bg-warning/10 border-warning/30 text-warning',
  'bg-info/10 border-info/30 text-info',
];

export default function Schedule() {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getScheduleForSlot = (day, time) => {
    return scheduleData.filter((s) => s.day === day && s.time === time);
  };

  const getCourse = (courseId) => mockCourses.find((c) => c.id === courseId);
  const getClass = (classId) => mockClasses.find((c) => c.id === classId);

  const getWeekDates = () => {
    const start = new Date(currentWeek);
    start.setDate(start.getDate() - start.getDay() + 1);
    return days.map((_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Week Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
            <p className="text-muted-foreground mt-1">
              Weekly class timetable and schedule management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newDate = new Date(currentWeek);
                newDate.setDate(newDate.getDate() - 7);
                setCurrentWeek(newDate);
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">
                {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} -{' '}
                {weekDates[4].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newDate = new Date(currentWeek);
                newDate.setDate(newDate.getDate() + 7);
                setCurrentWeek(newDate);
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Timetable Grid */}
        <Card className="border-border/50 overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Weekly Timetable
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="p-4 text-left font-medium text-muted-foreground w-24">
                      Time
                    </th>
                    {days.map((day, i) => (
                      <th key={day} className="p-4 text-center">
                        <div className="font-semibold text-foreground">{day}</div>
                        <div className="text-sm text-muted-foreground">
                          {weekDates[i].toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time} className="border-b border-border/50 last:border-b-0">
                      <td className="p-4 font-medium text-muted-foreground text-sm">
                        {time}
                      </td>
                      {days.map((day) => {
                        const slots = getScheduleForSlot(day, time);
                        return (
                          <td key={`${day}-${time}`} className="p-2">
                            {slots.map((slot, idx) => {
                              const course = getCourse(slot.courseId);
                              const cls = getClass(slot.classId);
                              const colorClass = courseColors[parseInt(slot.courseId) % courseColors.length];

                              return (
                                <div
                                  key={idx}
                                  className={`p-3 rounded-lg border ${colorClass} animate-fade-in cursor-pointer hover:scale-[1.02] transition-transform`}
                                >
                                  <p className="font-semibold text-sm truncate">
                                    {course?.name}
                                  </p>
                                  <p className="text-xs opacity-80 truncate">
                                    {course?.code}
                                  </p>
                                  <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                                    <MapPin className="w-3 h-3" />
                                    {slot.room}
                                  </div>
                                  <Badge variant="secondary" className="mt-2 text-xs">
                                    {cls?.name}
                                  </Badge>
                                </div>
                              );
                            })}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Course Legend */}
        <div className="flex flex-wrap gap-4 justify-center">
          {mockCourses.slice(0, 5).map((course, i) => (
            <div key={course.id} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${courseColors[i].split(' ')[0]}`} />
              <span className="text-sm text-muted-foreground">{course.name}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}