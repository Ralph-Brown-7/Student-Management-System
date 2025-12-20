import axios from "./api";

export const register = async (name, email, password, role = "student") => {
  const res = await axios.post("/users/register", { name, email, password, role });
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

export const login = async (email, password) => {
  const res = await axios.post("/users/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};