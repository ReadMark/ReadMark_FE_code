import React, { useState, useEffect } from "react";
import mainImg from "../assets/MainImg.jpg";
import "./MainImg.css";
import { getTodayPages, getConsecutiveDays } from "../apis/readingApi";

function MainImage() {
  const [todayPages, setTodayPages] = useState(0);
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const rawUserId = localStorage.getItem("userId");
  const userId = rawUserId ? rawUserId.replace(/^["']+|["']+$/g, "").trim() : null;

  useEffect(() => {
    if (!token || !userId) {
      console.warn("⚠️ 사용자 인증 정보 없음");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [pages, days] = await Promise.all([
          getTodayPages(userId, token),
          getConsecutiveDays(userId, token),
        ]);

        setTodayPages(pages);
        setConsecutiveDays(days);
      } catch (err) {
        console.error("❌ 데이터 가져오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, userId]);

  if (loading) {
    return (
      <div className="main_img-container">
        <img className="main_img-img" src={mainImg} alt="메인 이미지" />
        <div className="main_img-text-container">불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="main_img-container">
      <img className="main_img-img" src={mainImg} alt="메인 이미지" />

      <div
        className="main_img-text-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* ✅ 오늘 페이지 표시 */}
        <div className="main_img-text">
          오늘 읽은 페이지 수: {todayPages}p
          {todayPages > 0 && <><br />잘 하고 있어요! 👏</>}
        </div>

        {/* ✅ 연속 독서 상태 표시 */}
        <div className="main_img-text" style={{ marginTop: "10px" }}>
          {todayPages === 0 && consecutiveDays < 2 && (
            <span>{consecutiveDays}일째 책장이 비어있어요 🥺</span>
          )}
          {todayPages === 0 && consecutiveDays >= 2 && (
            <span>오늘은 쉬지만, 연속 {consecutiveDays}일째 기록 유지 중 🔥</span>
          )}
          {todayPages > 0 && consecutiveDays > 1 && (
            <span>연속 {consecutiveDays}일 독서 달성 중! 📚</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainImage;
