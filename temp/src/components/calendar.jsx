import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../components/calendar.css';
import stamp from '../assets/stamp.svg';
import axios from 'axios';

function CalendarP() {
  const [date, setDate] = useState(new Date());
  const [stampedDates, setStampedDates] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) return;

    const fetchStampedDates = async () => {
      try {
        const res = await axios.get(`http://43.200.102.14:5000/api/image/stats/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // 예: res.data.readingDays = ['2025-09-18', '2025-09-20']
        setStampedDates(res.data.readingDays || []);
      } catch (err) {
        console.error("도장 날짜 불러오기 실패:", err);
      }
    };

    fetchStampedDates();
  }, [token, userId]);

  const tileContent = ({ date, view }) => {
    const dateStr = date.toISOString().split('T')[0];
    if (stampedDates.includes(dateStr)) {
      return <img className="stamp_img" src={stamp} alt="stamp" />;
    }
  };

  return (
    <div className="calendar_container">
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
      />
    </div>
  );
}

export default CalendarP;
