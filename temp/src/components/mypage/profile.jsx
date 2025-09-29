import "./profile.css";
import { useNavigate } from "react-router-dom";
import profileDefault from "../mypage/profile.jpeg"; // 기본 프로필 이미지
import { useState, useEffect } from "react";

function Profile() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(profileDefault);

  // localStorage에서 로그인한 사용자 정보 가져오기
  const username = localStorage.getItem("username");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  // 페이지 접근 시 로그인 체크
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true }); // 뒤로가기 방지
    }
  }, [navigate]);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) setProfileImage(storedImage);
  }, []);

  const handleLogout = () => {
    // 모든 로그인 관련 정보 제거
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("createdAt");
    localStorage.removeItem("profileImage");

    navigate("/login", { replace: true }); // 로그인 페이지 이동 + 뒤로가기 방지
  };

  return (
    <div className="my_profile-container">
      <div>
        <img className="my_profile-img" src={profileImage} alt="profile" />
      </div>
      <div className="my_profile-text">
        <div className="my_top-main">{username || "username"}</div>
        <div className="my_top-text">{name || "이름"}</div>
        <div className="my_top-text">{email || "이메일"}</div>
        <div className="my_top-logout" onClick={handleLogout}>
          로그아웃
        </div>
      </div>
    </div>
  );
}

export default Profile;
