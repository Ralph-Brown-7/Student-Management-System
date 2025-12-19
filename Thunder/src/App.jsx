import React, { useState } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminUserManagement from "./pages/UserManagement.jsx";
import Settings from "./pages/Settings.jsx";
import Enrollments from "./pages/Enrollments.jsx";
import Grades from "./pages/Grades.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import Header from "./components/layout/Header.jsx";
import { Home, Users, Settings as SettingsIcon, BookOpen, ClipboardList } from "lucide-react";

import { login, register, logout } from "./auth.js";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [userId, setUserId] = useState(null);

  /* =====================
     LOGIN
     ===================== */
  const handleLogin = async (email) => {
    const data = await login(email);
    setUserId(data.userId);
    setUserRole(data.role);
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  /* =====================
     REGISTER
     ===================== */
  const handleRegister = async (name, email, role) => {
    const data = await register(name, email, role);
    setUserId(data.userId);
    setUserRole(data.role);
    setIsAuthenticated(true);
    setShowRegister(false);
    setCurrentPage("dashboard");
  };

  /* =====================
     LOGOUT
     ===================== */
  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUserRole("guest");
    setUserId(null);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "users", label: "User Management", icon: Users, roles: ["admin"] },
    { id: "enrollments", label: "Enrollments", icon: BookOpen, roles: ["student", "instructor"] },
    { id: "grades", label: "Grades", icon: ClipboardList, roles: ["student", "instructor"] },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const renderPage = () => {
    if (currentPage === "dashboard") return <Dashboard userId={userId} userRole={userRole} />;
    if (currentPage === "users" && userRole === "admin") return <AdminUserManagement />;
    if (currentPage === "enrollments") return <Enrollments userId={userId} userRole={userRole} />;
    if (currentPage === "grades") return <Grades userId={userId} userRole={userRole} />;
    if (currentPage === "settings") return <Settings userId={userId} />;
    return <div className="p-4">Access denied</div>;
  };

  /* =====================
     AUTH SCREENS
     ===================== */
  if (!isAuthenticated) {
    return showRegister ? (
      <RegisterPage
        onBack={() => setShowRegister(false)}
        onRegister={handleRegister}
      />
    ) : (
      <LoginPage
        onLogin={handleLogin}
        onRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <div className="d-flex">
      <aside className="sidebar bg-dark text-white p-3" style={{ width: 250 }}>
        <Sidebar
          navItems={navItems}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          userRole={userRole}
        />
      </aside>

      <div className="flex-grow-1">
        <Header onLogout={handleLogout} userRole={userRole} />
        <main className="p-4">{renderPage()}</main>
      </div>
    </div>
  );
}
