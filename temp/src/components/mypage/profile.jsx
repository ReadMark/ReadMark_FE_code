import "./profile.css";
import { useNavigate } from "react-router-dom";
import profileDefault from "../mypage/profile.jpeg"; // 기본 프로필 이미지
import { useState, useEffect } from "react";

function Profile() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(profileDefault);

  const username = localStorage.getItem("username");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const rawUserId = localStorage.getItem("userId");
  const userId = rawUserId ? rawUserId.replace(/^["']+|["']+$/g, "").trim() : "없음";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) setProfileImage(storedImage);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
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
         <div className="my_top-text">User ID: {userId}</div>
        <div className="my_top-logout" onClick={handleLogout}>
          로그아웃
        </div>
      </div>
    </div>
  );
}


export default Profile;
