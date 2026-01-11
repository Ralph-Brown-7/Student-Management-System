import api from "../api";

export const getGrades = async () => {
  const res = await api.get("/grades");
  return res.data;
};
