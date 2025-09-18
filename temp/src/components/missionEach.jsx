import './misson.css';
import '../pages/CalendarPage.css';

function MissionEach(props) {
  return (
    <>
      <div className='MissonText'>
        <img src={props.Img} alt="" />
        <div className='mission'>
          {props.mission}
        </div>
       
      </div>
    

    </>
  );
}

export default MissionEach;