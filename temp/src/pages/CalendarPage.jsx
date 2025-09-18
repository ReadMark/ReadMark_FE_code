import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';
import stamp from '../assets/stamp.svg'; // 도장 이미지 경로

function CalendarPage() {
  const [date, setDate] = useState(new Date());

  // 도장 찍을 날짜들 (예시)
  const stampedDates = ['2025-09-18', '2025-09-20'];

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
        tileContent={tileContent}  // 여기서 도장 이미지 넣음
      />
    </div>
  );
}

export default CalendarPage;
