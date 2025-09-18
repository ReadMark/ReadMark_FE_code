import MissionEach from './missionEach';
import './misson.css';
import FirstImg from '../assets/missionF.svg'
import SecondImg from '../assets/missionS.svg';

function Mission() {
  return (
    <>

    <div className='mission_container'>
        <div className='MissonTitle'>
        오늘의 미션
      </div>

    <div className='mission-each'>
        <MissionEach Img={FirstImg} mission="책 20p 이상 읽기" />
    </div>

     <div className='mission-each'>
        <MissionEach Img={SecondImg} mission="20분 독서" />
    </div>
    </div>
      
      
      



    </>
  );
}

export default Mission;