import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import {
  mockDashboardStats,
  mockEnrollmentData,
  mockGradeDistribution,
  mockStudents,
} from '@/data/mockData';
import {
  Users,
  GraduationCap,
  BookOpen,
  UserCheck,
  TrendingUp,
  Calendar,
  Award,
  UserPlus,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const COLORS = ['hsl(152, 69%, 43%)', 'hsl(174, 62%, 47%)', 'hsl(38, 92%, 50%)', 'hsl(262, 83%, 58%)', 'hsl(0, 84%, 60%)'];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's an overview of your school.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={mockDashboardStats.totalStudents.toLocaleString()}
            icon={Users}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Classes"
            value={mockDashboardStats.totalClasses}
            icon={GraduationCap}
            variant="accent"
          />
          <StatCard
            title="Total Courses"
            value={mockDashboardStats.totalCourses}
            icon={BookOpen}
            variant="success"
          />
          <StatCard
            title="Total Teachers"
            value={mockDashboardStats.totalTeachers}
            icon={UserCheck}
            variant="warning"
          />
        </div>

        {/* Performance Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Average GPA"
            value={mockDashboardStats.averageGPA.toFixed(2)}
            subtitle="Across all students"
            icon={Award}
          />
          <StatCard
            title="Attendance Rate"
            value={`${mockDashboardStats.attendanceRate}%`}
            icon={TrendingUp}
            trend={{ value: 2.3, isPositive: true }}
          />
          <StatCard
            title="Graduation Rate"
            value={`${mockDashboardStats.graduationRate}%`}
            icon={GraduationCap}
          />
          <StatCard
            title="New Enrollments"
            value={mockDashboardStats.newEnrollments}
            subtitle="This semester"
            icon={UserPlus}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enrollment Trend Area Chart */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border/50 shadow-sm animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-6">Enrollment Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockEnrollmentData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(174, 62%, 47%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(174, 62%, 47%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="hsl(174, 62%, 47%)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorStudents)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grade Distribution Pie Chart */}
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-6">Grade Distribution</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockGradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {mockGradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {mockGradeDistribution.map((item, index) => (
                <div key={item.grade} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.grade} ({item.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Students List */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Students</h3>
            <a href="/students" className="text-sm text-primary hover:underline font-medium">
              View all
            </a>
          </div>
          <div className="space-y-4">
            {mockStudents.slice(0, 5).map((student, index) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">Grade {student.grade}</Badge>
                  <span
                    className={cn(
                      'font-semibold text-sm',
                      student.gpa && student.gpa >= 3.5 ? 'text-emerald-500' : 'text-foreground'
                    )}
                  >
                    GPA: {student.gpa?.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}