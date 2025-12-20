import React, { useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import api from "./api.js"; // your API helper

export default function App() {
  const [currentPage, setCurrentPage] = useState("login"); // login/register/dashboard
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Login handler
  const handleLogin = async (email) => {
    const res = await api.post("/login", { email });
    if (res.data.success) {
      setUserId(res.data.userId);
      setUserRole(res.data.role);
      setCurrentPage("dashboard"); // go to dashboard
    } else {
      alert("Login failed!");
    }
  };

  // Register handler
  const handleRegister = async (name, email, role) => {
    const res = await api.post("/register", { name, email, role });
    if (res.data.success) {
      setUserId(res.data.userId);
      setUserRole(res.data.role);
      setCurrentPage("dashboard"); // go to dashboard
    } else {
      alert("Registration failed!");
    }
  };

  // Navigation between login/register
  const goToRegister = () => setCurrentPage("register");
  const goToLogin = () => setCurrentPage("login");

  // Render page
  switch (currentPage) {
    case "login":
      return <LoginPage onLogin={handleLogin} onRegister={goToRegister} />;
    case "register":
      return <RegisterPage onRegister={handleRegister} onBack={goToLogin} />;
    case "dashboard":
      return <Dashboard userId={userId} userRole={userRole} />;
    default:
      return <p>Page not found</p>;
  }
}
