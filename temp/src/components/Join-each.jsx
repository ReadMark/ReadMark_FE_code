import './join-each.css';

function JoinEach(props) {
  return (
    <>
        <div className='section'>
          <div className="login_title">{props.title}</div>
          <div className="login_input-container">
            <div><img className="person" src={props.Logo} alt="" /></div>
          <div className="login_input">
            <input type={props.type}  placeholder={props.title + " 입력"} />
          </div>
          </div>
        </div>
    </>
  );
}

export default JoinEach;
