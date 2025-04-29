import api from "utils/api";

export const getAllCheckLogs = async () => {
  const res = await api.get('/CheckInOutLog/get-all');
  return res.data;
};