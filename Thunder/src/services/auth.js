import api from "../api/api";

export const login = async (email, password) => {
  const res = await api.post("/users/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const register = async (name, email, password, role) => {
  const res = await api.post("/users/register", {
    name,
    email,
    password,
    role,
  });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
