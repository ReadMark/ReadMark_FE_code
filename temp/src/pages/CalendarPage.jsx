import CalendarP from '../components/calendar';
import Mission from '../components/mission'; 
import './CalendarPage.css';

function CalendarPage() {
  return (
    <>
    <div className='CalendarContainer'>
      <CalendarP />
      <Mission />
    </div>
      
    </>
  );
}

export default CalendarPage;
