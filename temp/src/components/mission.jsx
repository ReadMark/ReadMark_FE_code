import { useEffect, useState } from "react";
import axios from "axios";
import MissionEach from "./missionEach";
import "./misson.css";
import FirstImg from "../assets/missionF.svg";

function Mission() {
  const [completed, setCompleted] = useState(false);
  const [todayPages, setTodayPages] = useState(0);

  const userId = 4; // 로그인된 사용자 ID 예시
  const today = new Date().getDay();

  // ✅ 요일별 미션
  const missions = {
    1: { text: "오늘은 책 20p 돌파!", id: 1, requiredPages: 20 },
    2: { text: "20p 이상 읽기!", id: 2, requiredPages: 20 },
    3: { text: "10p 이상 읽기!", id: 3, requiredPages: 10 },
    4: { text: "30p 이상 읽기!", id: 4, requiredPages: 30 },
    5: { text: "30p 도전!", id: 5, requiredPages: 30 },
    6: { text: "자유롭게 독서하기", id: 6, requiredPages: 0 },
    0: { text: "편하게 책 읽기", id: 7, requiredPages: 0 },
  };

  const todayMission = missions[today] || { text: "오늘의 미션을 즐기세요!", id: null };

  // ✅ API로 오늘 미션 상태 불러오기
  useEffect(() => {
    const fetchMissionStatus = async () => {
      try {
        const baseURL = "http://43.200.102.14:5000/api";
        const response = await axios.get(`${baseURL}/missions/user/${userId}/today`);

        // todayPages가 undefined면 0으로 처리
        setTodayPages(response.data.todayPages ?? 0);
        setCompleted(response.data.completed ?? false);
      } catch (error) {
        console.error("미션 상태 불러오기 실패:", error);
        setTodayPages(0);
        setCompleted(false);
      }
    };

    fetchMissionStatus();
  }, [today]);

  return (
    <div className="mission_container">
      <div className="MissonTitle">오늘의 미션</div>

      <div
        className="mission-each"
        style={{
          backgroundColor: completed ? "#6abe32" : "#f5f5f5",
          color: completed ? "white" : "black",
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
          {completed
            ? "✅ 미션 완료!"
            : `📖 오늘 읽은 페이지: ${todayPages}p`}
        </div>
      </div>
    </div>
  );
}

export default Mission;
