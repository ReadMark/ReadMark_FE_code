// CalendarP.jsx
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import stamp from '../assets/stamp.svg';

function CalendarP({ stampedDates, selectedDate, onDateChange }) {
  const handleChange = (date) => onDateChange(date);

  const tileContent = ({ date }) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
    return stampedDates.includes(dateStr) ? <img className="stamp_img" src={stamp} alt="stamp" /> : null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      today.setHours(0,0,0,0);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
      if (stampedDates.includes(dateStr)) return 'completed';
      if (date < today) return 'missed';
    }
    return null;
  };

  return (
    <div className="calendar_container">
      <Calendar
        onChange={handleChange}
        value={selectedDate}
        tileContent={tileContent}
        tileClassName={tileClassName}
      />
    </div>
  );
}

export default CalendarP;
