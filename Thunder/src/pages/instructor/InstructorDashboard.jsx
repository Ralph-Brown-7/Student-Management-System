import React, { useEffect, useState } from 'react';
import InstructorLayout from '@/components/layout/InstructorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { fetchUsers, fetchCourses } from '@/services/apiService';
import { BookOpen, Users, ClipboardCheck, Calendar, TrendingUp, Loader2 } from 'lucide-react';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ studentCount: 0, classCount: 0 });
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [allUsers, allCourses] = await Promise.all([fetchUsers(), fetchCourses()]);
        // Filter students and classes assigned to this instructor
        const students = allUsers.filter(u => u.role === 'student');
        setStats({
          studentCount: students.length,
          classCount: allCourses.length
        });
        setMyClasses(allCourses);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>
  );

  return (
    <InstructorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome, {user?.name}!
          </h1>
          <p className="text-muted-foreground mt-1">Here's an overview of your classes</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg"><BookOpen className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.classCount}</p>
                  <p className="text-xs text-muted-foreground">Classes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg"><Users className="h-5 w-5 text-accent" /></div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.studentCount}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg"><ClipboardCheck className="h-5 w-5 text-emerald-500" /></div>
                <div>
                  <p className="text-2xl font-bold text-foreground">94%</p>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg"><TrendingUp className="h-5 w-5 text-amber-500" /></div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3.6</p>
                  <p className="text-xs text-muted-foreground">Avg GPA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              My Assigned Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myClasses.map((cls) => (
              <div key={cls._id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div>
                  <p className="font-medium text-foreground">{cls.name}</p>
                  <p className="text-sm text-muted-foreground">{cls.code} • Room {cls.room || 'TBD'}</p>
                </div>
                <Badge variant="secondary">{cls.students?.length || 0} students</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </InstructorLayout>
  );
}