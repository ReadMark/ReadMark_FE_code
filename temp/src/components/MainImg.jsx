import React, { useState, useEffect } from "react";
import mainImg from "../assets/MainImg.jpg";
import "./MainImg.css";
import { getTodayPages, getReadingStats } from "../apis/readingApi";

function MainImage() {
  const [todayPages, setTodayPages] = useState(0);
  const [currentDays, setCurrentDays] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId")?.replace(/^["']+|["']+$/g, "").trim();

  useEffect(() => {
    if (!token || !userId) {
      console.warn("⚠️ 사용자 인증 정보 없음");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        // 오늘 읽은 페이지 수
        const pages = await getTodayPages(userId, token);
        // 전체 통계 가져오기
        const stats = await getReadingStats(userId, token);

        setTodayPages(pages);
        // 오늘 안 읽었으면 0, 오늘 읽으면 maxConsecutiveDays
        setCurrentDays(pages > 0 ? stats.maxConsecutiveDays : 0);
      } catch (err) {
        console.error("❌ 메인 데이터 가져오기 실패:", err);
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
        {/* 오늘 읽은 페이지 표시 */}
        <div className="main_img-text">
          오늘 읽은 페이지 수: {todayPages}p
          {todayPages > 0 && (
            <>
              <br />잘 하고 있어요! 👏
            </>
          )}
        </div>

        {/* 연속 독서일 표시 */}
        <div className="main_img-text" style={{ marginTop: "10px" }}>
          {todayPages === 0 ? (
            <span>
              {currentDays === 0
                ? "책장이 비어있어요 🥺"
                : `연속 ${currentDays}일 읽었지만 오늘은 아직이에요 ☁️`}
            </span>
          ) : (
            <span>
              {currentDays > 1
                ? `연속 ${currentDays}일 독서 중! 📚`
                : "오늘부터 다시 시작!"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainImage;
