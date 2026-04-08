import axios from "axios";

const api = axios.create({
  baseURL: "http://example/api",
});

export const getTodayPages = async (userId, token) => {
  try {
    const res = await api.get(`/readinglogs/user/${userId}/today`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.pagesRead ?? 0;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const getCurrentConsecutiveDays = async (userId, token) => {
  try {
    const res = await api.get(`/calendar/${userId}/current-consecutive`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.currentConsecutiveDays ?? 0;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

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
    console.error(err);
    return { maxConsecutiveDays: 0, totalReadingDays: 0 };
  }
};
