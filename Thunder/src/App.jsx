import React, { useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import api from "./api.js";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  /* ========= LOGIN ========= */
  const handleLogin = async (email, password) => {
    try {
      // We now send both email and password
      const res = await api.post("/users/login", { email, password });

      setUserId(res.data.userId);
      setUserRole(res.data.role);
      localStorage.setItem("token", res.data.token);

      setCurrentPage("dashboard");
    } catch (err) {
      alert(
        "Login failed: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  /* ======== REGISTER ======== */
  const handleRegister = async (name, email, password, role) => {
    try {
      // We now send name, email, password, and role
      const res = await api.post("/users/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful! Please login with your new password.");
      setCurrentPage("login");
    } catch (err) {
      alert(
        "Registration failed: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  /* ======== VIEW LOGIC ======== */
  if (currentPage === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onRegister={() => setCurrentPage("register")}
      />
    );
  }

  if (currentPage === "register") {
    return (
      <RegisterPage
        onRegister={handleRegister}
        onBack={() => setCurrentPage("login")}
      />
    );
  }

  // If logged in, show Dashboard
  return <Dashboard userId={userId} userRole={userRole} />;
}

// Ensure this matches the function name exactly
export default App;