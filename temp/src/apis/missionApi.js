import axios from "axios";

const api = axios.create({
  baseURL: "http://43.200.102.14:5000/api",
});

// 오늘 읽은 페이지 수 
export const getTodayPages = async (userId) => {
  try {
    const res = await api.get(`/readinglogs/user/${userId}/today`);
    return res.data;
  } catch (err) {
    console.error("오늘 읽은 페이지 수 불러오기 실패:", err);
    throw err;
  }
};

// 미션 완료
export const completeMission = async (missionId, userId) => {
  try {
    const res = await api.post(`/missions/${missionId}/complete?userId=${userId}`);
    return res.data;
  } catch (err) {
    console.error("미션 완료 실패:", err);
    throw err;
  }
};
