import React, { useEffect, useState } from 'react';
import Card from '../components/common/Card.jsx';
import { GraduationCap, BookOpen, DollarSign, ClipboardList } from 'lucide-react';
import api from '../api.js';

const Dashboard = ({ userId, userRole }) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    budget: '$0',
    pendingApprovals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, coursesRes, enrollmentsRes] = await Promise.all([
          api.get('/users'),
          api.get('/courses'),
          api.get('/enrollments'),
        ]);

        setStats({
          totalStudents: usersRes.data.filter(u => u.role === 'student').length,
          activeCourses: coursesRes.data.length,
          budget: '$1.5M',
          pendingApprovals: enrollmentsRes.data.filter(e => e.status === 'pending').length,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-3">Dashboard</h1>
      <p className="text-muted">User ID: {userId} — Role: {userRole}</p>
      <div className="row g-3">
        <div className="col-md-3">
          <Card title="Total Students" value={stats.totalStudents} icon={GraduationCap} bgClass="bg-primary" />
        </div>
        <div className="col-md-3">
          <Card title="Active Courses" value={stats.activeCourses} icon={BookOpen} bgClass="bg-success" />
        </div>
        <div className="col-md-3">
          <Card title="Annual Budget" value={stats.budget} icon={DollarSign} bgClass="bg-warning" />
        </div>
        <div className="col-md-3">
          <Card title="Pending Approvals" value={stats.pendingApprovals} icon={ClipboardList} bgClass="bg-danger" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
