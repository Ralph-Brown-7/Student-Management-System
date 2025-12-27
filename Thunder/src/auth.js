import api from "../api";

export const register = async (name, email, password, role = "student") => {
  const res = await api.post("/users/register", {
    name,
    email,
    password, // Now sending password to backend
    role,
  });

  // We don't automatically save token here because registration 
  // in your new controller doesn't return one (it asks you to login)
  return res.data;
};

export const login = async (email, password) => {
  const res = await api.post("/users/login", { 
    email, 
    password // Now sending password to backend
  });

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/"; // Optional: redirect to login
};