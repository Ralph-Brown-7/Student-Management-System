// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api.js";

const Dashboard = ({ userId, userRole }) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    budget: "$0",
    pendingApprovals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, coursesRes, enrollmentsRes] = await Promise.all([
          api.get("/users"),
          api.get("/courses"),
          api.get("/enrollments"),
        ]);

        setStats({
          totalStudents: usersRes.data.filter((u) => u.role === "student").length,
          activeCourses: coursesRes.data.length,
          budget: "$1.5M",
          pendingApprovals: enrollmentsRes.data.filter((e) => e.status === "pending").length,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
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
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <h6>Total Students</h6>
              <h3>{stats.totalStudents}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <h6>Active Courses</h6>
              <h3>{stats.activeCourses}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white h-100">
            <div className="card-body">
              <h6>Annual Budget</h6>
              <h3>{stats.budget}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white h-100">
            <div className="card-body">
              <h6>Pending Approvals</h6>
              <h3>{stats.pendingApprovals}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
