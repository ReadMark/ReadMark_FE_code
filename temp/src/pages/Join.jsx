import './join.css';
import JoinEach from '../components/Join-each';
import id from "../assets/Login/id.svg";
import mail from "../assets/Login/mail.svg";
import person from "../assets/Login/person.svg";
import pw from "../assets/Login/pw.svg";
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Join() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    userId: "",
    password: ""
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleJoin = async () => {
  try {
    const res = await fetch("http://43.200.102.14:5000/api/users/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: form.userId,
        password: form.password,
        email: form.email,
        name: form.name,
      }),
    });

    let data;
    try {
      data = await res.json(); // JSON 파싱 시도
    } catch {
      data = { message: "서버에서 JSON이 아니라 다른 걸 보냄" };
    }

    console.log("📡 status:", res.status);
    console.log("📡 response:", data);

    if (res.ok) {
      alert("회원가입 성공! 🎉");
      console.log("가입 결과:", data);
      // TODO: 로그인 페이지로 이동
    } else {
      alert(`회원가입 실패: ${data.message || "알 수 없는 오류"}`);
    }
  } catch (err) {
    console.error("❌ 네트워크 에러:", err);
    alert("서버 연결 실패");
  }
};


  return (
    <div className='Join-all'>
      <main>
        <div className="join">
          <div className="title">Read Mark</div>

          <div className='sections'>
            <JoinEach title="이름" type="text" Logo={person} 
              onChange={(e) => handleChange("name", e.target.value)} />
            <JoinEach title="이메일" type="email" Logo={mail}
              onChange={(e) => handleChange("email", e.target.value)} />
            <JoinEach title="아이디" type="text" Logo={id}
              onChange={(e) => handleChange("userId", e.target.value)} />
            <JoinEach title="비밀번호" type="password" Logo={pw}
              onChange={(e) => handleChange("password", e.target.value)} />
          </div>

          <div className="login_button-container">
            <div className="login_button"> 
              <button onClick={handleJoin}>가입하기</button>
            </div>
          </div>

          <div className="bottom_container">
            <div className="front">계정이 있으신가요?</div>
            <Link to="/login"><div className="back">로그인</div></Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Join;
