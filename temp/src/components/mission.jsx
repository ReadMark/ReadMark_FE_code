import { useEffect, useState } from "react";
import MissionEach from "./missionEach";
import FirstImg from "../assets/missionF.svg";
import axios from "axios";

function Mission({ selectedDate, stampDates, setStampDates }) {
  const [completed, setCompleted] = useState(false);
  const [todayPages, setTodayPages] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const dateObj = selectedDate || new Date();
  const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(dateObj.getDate()).padStart(2, "0")}`;

  const missions = {
    1: { text: "오늘은 책 20p 돌파!", requiredPages: 20 },
    2: { text: "20p 이상 읽기!", requiredPages: 20 },
    3: { text: "10p 이상 읽기!", requiredPages: 10 },
    4: { text: "책 30분 이상 읽기!", requiredMinutes: 30 },
    5: { text: "30p 도전!", requiredPages: 30 },
    6: { text: "자유롭게 독서하기", requiredPages: 0 },
    0: { text: "편하게 책 읽기", requiredPages: 0 },
  };

  const todayMission = missions[dateObj.getDay()] || { text: "오늘의 미션을 즐기세요!" };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchDailySummary = async () => {
      try {
        const res = await axios.get(
          `http://example/api/calendar/${userId}/stamp/${dateStr}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!isMounted) return;

        const stampInfo = res.data.stampInfo || {};
        const pages = stampInfo.pagesRead ?? 0;
        const minutes = stampInfo.minutesRead ?? 0;

        setTodayPages(pages);
        setTodayMinutes(minutes);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(dateObj);
        selected.setHours(0, 0, 0, 0);

        let isMissionDone = false;
        if (stampDates.includes(dateStr) || stampInfo.hasStamp) isMissionDone = true;
        else if (todayMission.requiredPages && pages >= todayMission.requiredPages) isMissionDone = true;
        else if (todayMission.requiredMinutes && minutes >= todayMission.requiredMinutes) isMissionDone = true;

        if (selected < today && !isMissionDone) isMissionDone = false;

        setCompleted(isMissionDone);

        if (isMissionDone && selected.getTime() === today.getTime() && !stampDates.includes(dateStr)) {
          setStampDates(prev => [...prev, dateStr]);
          await axios.post(
            `http://example/api/missions/${dateStr}/complete?userId=${userId}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }

      } catch (err) {
        console.error("Daily summary 조회 실패:", err.response || err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDailySummary();
    return () => { isMounted = false; };
  }, [selectedDate, stampDates]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(dateObj);
  selected.setHours(0, 0, 0, 0);

  const backgroundColor = completed ? "#6abe32" : selected < today ? "#df241d" : "#f5f5f5";
  const textColor = completed || selected < today ? "white" : "black";

  return (
    <div className="mission_container">
      <div className="MissonTitle">{dateStr} 미션</div>
      <div
        className="mission-each"
        style={{
          backgroundColor,
          color: textColor,
          borderRadius: "12px",
          padding: "16px",
          transition: "0.3s ease",
          position: "relative",
        }}
      >
        <MissionEach Img={FirstImg} mission={todayMission.text} />
        <div
          style={{
            right: "60px",
            position: "absolute",
            fontWeight: "bold",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {loading
            ? "⏳ 로딩 중..."
            : completed
            ? "미션 완료!"
            : todayMission.requiredPages !== undefined
            ? `읽은 페이지: ${todayPages}p`
            : `읽은 시간: ${todayMinutes}분`}
        </div>
      </div>
    </div>
  );
}

export default Mission;
