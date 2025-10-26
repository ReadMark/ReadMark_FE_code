import './join.css';
import JoinEach from '../components/Join-each';
import id from "../assets/Login/id.svg";
import mail from "../assets/Login/mail.svg";
import person from "../assets/Login/person.svg";
import pw from "../assets/Login/pw.svg";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Join() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    userId: "",
    password: "",
    profileImage: null
  });

  const navigate = useNavigate();

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleJoin = async () => {
    try {
      // 이메일 간단 체크
      if (!form.email.includes("@")) {
        alert("이메일 형식이 올바르지 않습니다.");
        return;
      }

      // 필수 값 체크
      if (!form.name || !form.userId || !form.password) {
        alert("모든 필수 항목을 입력해주세요.");
        return;
      }

      // 서버 요구 요청 body
      const bodyData = {
        name: form.name,
        username: form.userId, // username 필드로 전송
        email: form.email,
        password: form.password,
      };

      console.log("회원가입 요청 body:", bodyData);

      const res = await fetch("http://43.200.102.14:5000/api/users/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      console.log("서버 응답 전체:", data);

      if (!res.ok) {
        alert(`회원가입 실패: ${data.message || "알 수 없는 오류"}`);
        return;
      }

      alert("회원가입 성공!");

      // 서버 반환 userId 가져오기
      const userId = data.data?.userId;
      if (!userId) return alert("서버에서 userId를 가져오지 못했습니다.");

      // 프로필 이미지 업로드 (선택 사항)
      if (form.profileImage) {
        const imgData = new FormData();
        imgData.append("image", form.profileImage);

        const imgRes = await fetch(`http://43.200.102.14:5000/api/users/${userId}/profile-image`, {
          method: "POST",
          body: imgData
        });

        const imgDataJson = await imgRes.json();
        if (imgRes.ok && imgDataJson.success) {
          localStorage.setItem("profileImage", `http://43.200.102.14:5000${imgDataJson.profileImageUrl}`);
        } else {
          console.error("프로필 업로드 실패:", imgDataJson);
        }
      }

      // localStorage에 회원 정보 저장
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", form.userId);
      localStorage.setItem("name", form.name);
      localStorage.setItem("email", form.email);

      navigate("/login"); // 가입 후 로그인 페이지 이동

    } catch (err) {
      console.error("네트워크 에러:", err);
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
            <JoinEach title="프로필 사진" type="file" 
              onChange={(e) => handleChange("profileImage", e.target.files[0])} />
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
