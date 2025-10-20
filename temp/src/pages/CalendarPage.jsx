import CalendarP from '../components/calendar';
import Mission from '../components/mission'; 
import './CalendarPage.css';
import Header from '../components/Header';

function CalendarPage() {
  return (
    <>
      <Header />
      <div className='CalendarContainer'>
        <CalendarP />
        <Mission />
      </div>
    </>
  );
}

export default CalendarPage;