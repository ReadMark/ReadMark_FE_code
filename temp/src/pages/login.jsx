import "./Join.css";
import JoinEach from "../components/Join-each";
import person from "../assets/Login/person.svg";
import pw from "../assets/Login/pw.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    userId: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://43.200.102.14:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: form.userId,
          password: form.password
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("로그인 성공 🎉");
        console.log("로그인 결과:", data);

        // JWT 토큰 저장 (ex: localStorage)
        localStorage.setItem("token", data.token);

        // 메인 페이지로 이동
        navigate("/");
      } else {
        alert(`로그인 실패: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류 발생");
    }
  };

  return (
    <main className='Join-all'>
      <div className="login_container">
        <div className="title">Read Mark</div>

        <div className='sections'>
          <JoinEach 
            title="아이디" 
            type="text" 
            Logo={person}
            onChange={(e) => handleChange("userId", e.target.value)}
          />
          <JoinEach 
            title="비밀번호" 
            type="password" 
            Logo={pw}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        
        <div className="login_button-container">
          <div className="login_button"> 
            <button onClick={handleLogin}>로그인</button>
          </div>
        </div>

        <div className="bottom_container">
          <div className="front">계정이 없으신가요?</div>
          <Link to="/join"><div className="back">회원가입</div></Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
