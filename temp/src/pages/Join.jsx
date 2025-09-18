import './join.css';
import '../assets/logo.png';
import JoinEach from '../components/Join-each';
import id from "../assets/Login/id.svg";
import mail from "../assets/Login/mail.svg"
import person from "../assets/Login/person.svg"
import pw from "../assets/Login/pw.svg"

function Join() {
  return (
    <>
    <div className='Join-all'>
  <main>
    <div className="join">
      <div className="title">Read Mark</div>

      <div className='sections'>
        <JoinEach className="person" title="이름" type="text" Logo={person} />
        <JoinEach title="이메일" type="email" Logo={mail}/>
        <JoinEach title="아이디" type="text" Logo={id}/>
        <JoinEach title="비밀번호" type="password" Logo={pw}/>
      </div>

      <div className="login_button-container">
        <div className="login_button"> 
          <button>가입하기</button>
        </div>
      </div>

      <div className="bottom_container">
        <div className="front">계정이 있으신가요?</div>
        <div className="back">로그인</div>
      </div>
    </div>
  </main>
</div>


    </>
  );
}

export default Join;
