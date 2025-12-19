import axios from "./api";

/**
 * ======================
 * REGISTER
 * ======================
 */
export const register = async (name, email, role = "student") => {
  const res = await axios.post("/users", {
    name,
    email,
    role,
    status: "active"
  });

  // Save token if backend sends one later (future-proof)
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return {
    userId: res.data.userId,
    role: res.data.role,
    user: res.data.user,
  };
};

/**
 * ======================
 * LOGIN
 * ======================
 */
export const login = async (email) => {
  const res = await axios.post("/users/login", { email });

  // Save JWT
  localStorage.setItem("token", res.data.token);

  return {
    userId: res.data.userId,
    role: res.data.role,
    user: res.data.user,
    token: res.data.token,
  };
};

/**
 * ======================
 * LOGOUT
 * ======================
 */
export const logout = () => {
  localStorage.removeItem("token");
};
