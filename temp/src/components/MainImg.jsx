import React, { useState, useEffect } from "react";
import mainImg from "../assets/MainImg.jpg";
import "./MainImg.css";
import { getTodayPages } from "../apis/readingApi"; // API 파일 연결

function MainImage() {
  const [todayPages, setTodayPages] = useState(0);

  const token = localStorage.getItem("token");
  const rawUserId = localStorage.getItem("userId");
  const userId = rawUserId ? rawUserId.replace(/^["']+|["']+$/g, "").trim() : rawUserId;

  useEffect(() => {
    if (!token || !userId) return;

    const fetchTodayPages = async () => {
      const pages = await getTodayPages(userId, token);
      setTodayPages(pages);
    };

    fetchTodayPages();
  }, [token, userId]);

  return (
    <div className="main_img-container">
      <img className="main_img-img" src={mainImg} alt="메인 이미지" />
      <div className="main_img-text-container" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      }}>
        <div className="main_img-text">
          오늘 읽은 페이지 수: {todayPages}p
          {todayPages > 0 && <><br />잘 하고 있어요!</>}
        </div>
        <div className="main_img-text">
          {todayPages === 0 && "1일째 책장이 비어있어요ㅜ_ㅜ"}
        </div>
      </div>
    </div>
  );
}

export default MainImage;
