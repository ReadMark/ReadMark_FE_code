import "./profile.css";
import { Link } from "react-router-dom";
import profileDefault from "../mypage/profile.jpeg"; // 기본 프로필 이미지
import { useState, useEffect } from "react";

function Profile() {
  const [profileImage, setProfileImage] = useState(profileDefault);

  // localStorage에서 로그인한 사용자 정보 가져오기
  const username = localStorage.getItem("username");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) setProfileImage(storedImage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("createdAt");
    localStorage.removeItem("profileImage");
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
        <Link to="/login">
          <div className="my_top-logout" onClick={handleLogout}>로그아웃</div>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
