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

  useEffect(() => {
    const fetchStampDates = async () => {
      try {
        const res = await axios.get(
          `http://example/api/stamps/user/${userId}`,
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
  const handleAutoStamp = useCallback(

    async (todayStr) => {
      try {
        if (stampDates.includes(todayStr)) return;

        await axios.post(
          `http://example/api/stamps`,
          { userId, earnedDate: todayStr },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setStampDates((prev) => [...prev, todayStr]);
        console.log(`${todayStr} 도장 자동 등록 완료`);
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
          onAutoStamp={handleAutoStamp}
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
