import api from "../api/api";

export const loginApi = async (email, password) => {
  const res = await api.post("/users/login", { email, password });
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data; 
};

export const registerApi = async (name, email, password, role) => {
  const res = await api.post("/users/register", { name, email, password, role });
  return res.data;
};

export const logoutApi = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};