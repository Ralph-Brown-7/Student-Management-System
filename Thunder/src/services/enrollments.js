import api from "../api";

export const getEnrollments = async () => {
  const res = await api.get("/enrollments");
  return res.data;
};
