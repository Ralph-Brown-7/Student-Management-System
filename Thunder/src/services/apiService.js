import api from "../api/api";

// These are the specific functions your Instructor pages are asking for
export const fetchUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const fetchCourses = async () => {
  const res = await api.get("/courses");
  return res.data;
};

export const apiService = {
  get: (url) => api.get(url),
  post: (url, data) => api.post(url, data),
};

export default apiService;