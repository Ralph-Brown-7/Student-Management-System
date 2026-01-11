import api from "../api/api";

export const getCourses = async () => {
  const res = await api.get("/courses");
  return res.data;
};
