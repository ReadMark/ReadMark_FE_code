import "./Join.css";
import JoinEach from "../components/Join-each";
import person from "../assets/Login/person.svg"
import pw from "../assets/Login/pw.svg"

function Login() {
  return (
    <>
      <main className='Join-all'>
        <div class="login_container">
      <div class="title">Read Mark</div>

    <div className='sections'>
      <JoinEach title="아이디" type="text" Logo={person}/>
      <JoinEach title="비밀번호" type="password" Logo={pw}/>
    </div>
      
      <div class="login_button-container">
        <div class="login_button"> <button>로그인</button></div>
      </div>

      <div class="bottom_container">
        <div class="front">계정이 없으신가요?</div>
        <div class="back">회원가입</div>
      </div>
    </div>
  </main>

    </>
  );
}

export default Login;
