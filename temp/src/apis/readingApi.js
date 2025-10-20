import axios from "axios";

const api = axios.create({
  baseURL: "http://43.200.102.14:5000/api",
});

// 오늘 읽은 페이지 수 가져오기
export const getTodayPages = async (userId, token) => {
  try {
    const res = await api.get(`/readinglogs/user/${userId}/today`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // todayPages가 없으면 0으로 처리
    return res.data.todayPages ?? 0;
  } catch (err) {
    console.error("오늘 읽은 페이지 수 가져오기 실패:", err);
    return 0;
  }
};
