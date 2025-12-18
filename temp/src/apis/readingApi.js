import axios from "axios";

const api = axios.create({
  baseURL: "http://43.200.102.14:5000/api",
});

// ✅ 오늘 읽은 페이지 수
export const getTodayPages = async (userId, token) => {
  try {
    const res = await api.get(`/readinglogs/user/${userId}/today`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.pagesRead ?? 0;
  } catch (err) {
    console.error("❌ 오늘 읽은 페이지 수 가져오기 실패:", err);
    return 0;
  }
};

// ✅ 현재 연속 독서일수 (메인페이지용)
export const getCurrentConsecutiveDays = async (userId, token) => {
  try {
    const res = await api.get(`/calendar/${userId}/current-consecutive`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // 🎯 숫자만 반환 (중요!)
    return res.data.currentConsecutiveDays ?? 0;
  } catch (err) {
    console.error("❌ 현재 연속 독서일 가져오기 실패:", err);
    return 0;
  }
};

// ✅ 독서 통계 (마이페이지용)
export const getReadingStats = async (userId, token) => {
  try {
    const res = await api.get(`/readinglogs/user/${userId}/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      maxConsecutiveDays: res.data.maxConsecutiveDays ?? 0,
      totalReadingDays: res.data.totalReadingDays ?? 0,
    };
  } catch (err) {
    console.error("❌ 독서 통계 가져오기 실패:", err);
    return { maxConsecutiveDays: 0, totalReadingDays: 0 };
  }
};
