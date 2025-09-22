import profile from "../mypage/profile.jpeg";
import "./profile.css";
import { Link } from "react-router-dom";


function Profile() {
  return (
    <>
      <div className="my_profile-container">
      <div><img className="my_profile-img" src={profile} alt="logo" /></div>
      <div className="my_profile-text">
        <div className="my_top-main">goyeonghee</div>
        <div className="my_top-text">고양이</div>
        <div className="my_top-text">goyeonghee@gmail.com</div>
        <Link to="/login"><div className="my_top-logout">로그아웃</div></Link>
      </div>
    </div>
    </>
  );
}

export default Profile;
