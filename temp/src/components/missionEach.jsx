import './misson.css';

function MissionEach(props) {
  return (
    <>
      <div className='MissonText'>
        <img src={props.Img} alt="" />
        {props.mission}
      </div>
    

    </>
  );
}

export default MissionEach;