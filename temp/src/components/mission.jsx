import MissionEach from './missionEach';
import './misson.css';
import FirstImg from '../assets/missionF.svg';
import SecondImg from '../assets/missionS.svg';

function Mission() {
  // 현재 요일 가져오기 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const today = new Date().getDay();

  // 요일별 미션 문장
  const missions = {
    1: "오늘은 책 20p 돌파! 페이지마다 작은 모험이 기다린다",        // 월요일
    2: "20p 읽고 마음에 드는 문장 3개 즐겨찾기에 저장",     // 화요일
    3: "책 10p 이상 읽고 메모하기", // 수요일
    4: "마음에 남는 문장 3개 기록", // 목요일
    5: "책 30p 도전!",             // 금요일
    6: "자유롭게 독서하기",         // 토요일
    0: "편하게 책 읽기"             // 일요일
  };

  const todayMission = missions[today] || "오늘의 미션을 즐기세요!";

  return (
    <div className='mission_container'>
      <div className='MissonTitle'>오늘의 미션</div>
      <div className='mission-each'>
        <MissionEach Img={FirstImg} mission={todayMission} />
      </div>
    </div>
  );
}

export default Mission;
