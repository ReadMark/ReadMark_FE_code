// CalendarPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import CalendarP from '../components/calendar';
import Mission from '../components/mission';
import Header from '../components/Header';
import axios from 'axios';
import './CalendarPage.css';

function CalendarPage() {
  const [stampDates, setStampDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`;

  // ✅ 과거 도장 가져오기
  useEffect(() => {
    const fetchStampDates = async () => {
      try {
        const res = await axios.get(
          `http://43.200.102.14:5000/api/stamps/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dates = res.data.stamps.map((stamp) => stamp.earnedDate);
        setStampDates(dates);
      } catch (err) {
        console.error('StampDates 조회 실패:', err.response || err);
      }
    };

    fetchStampDates();
  }, [token, userId]);

  // ✅ 자동 도장 추가 함수 (CalendarP에서 호출)
  const handleAutoStamp = useCallback(

    async (todayStr) => {
      try {
        // 이미 찍힌 날짜면 무시
        if (stampDates.includes(todayStr)) return;

        // 서버에 도장 추가 요청
        await axios.post(
          `http://43.200.102.14:5000/api/stamps`,
          { userId, earnedDate: todayStr },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // 로컬 상태 업데이트
        setStampDates((prev) => [...prev, todayStr]);
        console.log(`✅ ${todayStr} 도장 자동 등록 완료`);
      } catch (err) {
        console.error('자동 도장 등록 실패:', err.response || err);
      }
    },
    [stampDates, token, userId]
  );

  return (
    <>
      <Header />
      <div className="CalendarContainer">
        <CalendarP
          stampedDates={stampDates}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onAutoStamp={handleAutoStamp} // ✅ 이거 추가!
        />
        <Mission
          selectedDate={selectedDate}
          stampDates={stampDates}
          setStampDates={setStampDates}
        />
      </div>
    </>
  );
}

export default CalendarPage;
