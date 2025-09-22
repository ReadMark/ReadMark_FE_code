import "./Join.css";
import JoinEach from "../components/Join-each";
import person from "../assets/Login/person.svg";
import pw from "../assets/Login/pw.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleLogin = async () => {
    try {
      const res = await fetch("http://43.200.102.14:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        console.log("로그인 결과:", data);
        alert(data.message);

        // ✅ 사용자 정보 localStorage에 저장
        const { userId, username, name, email, profileImageUrl, createdAt } = data.data;
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profileImage", profileImageUrl ? `http://43.200.102.14:5000${profileImageUrl}` : "");
        localStorage.setItem("createdAt", createdAt);

        navigate("/"); // 로그인 성공 후 메인 페이지 이동
      } else {
        alert(`로그인 실패: ${data.message || "알 수 없는 오류"}`);
      }
    } catch (err) {
      console.error("서버 오류:", err);
      alert("서버 오류 발생");
    }
  };

  return (
    <main className="Join-all">
      <div className="login_container">
        <div className="title">Read Mark</div>

        <div className="sections">
          <JoinEach
            title="아이디"
            type="text"
            Logo={person}
            onChange={(e) => handleChange("username", e.target.value)}
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
          <Link to="/join">
            <div className="back">회원가입</div>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
