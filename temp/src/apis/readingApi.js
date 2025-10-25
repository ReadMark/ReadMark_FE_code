import axios from "axios";

const api = axios.create({
  baseURL: "http://43.200.102.14:5000/api",
});

// 오늘 읽은 페이지 수
export const getTodayPages = async (userId, token) => {
  try {
    const res = await api.get(`/readinglogs/user/${userId}/today`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // 서버 응답 구조가 { pagesRead: number } 형태라면
    return res.data.pagesRead ?? 0;
  } catch (err) {
    console.error("❌ 오늘 읽은 페이지 수 가져오기 실패:", err);
    return 0;
  }
};

// 연속 독서일수
export const getConsecutiveDays = async (userId, token) => {
  try {
    const res = await api.get(`/user-time/${userId}/consecutive-days`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // API 응답 예시: { success: true, userId: 4, consecutiveDays: 5, message: ... }
    return res.data.consecutiveDays ?? 0;
  } catch (err) {
    console.error("❌ 연속 독서일수 가져오기 실패:", err);
    return 0;
  }
};
