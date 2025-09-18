import React from 'react';
import mainImg from '../assets/MainImg.jpg';
import './MainImg.css';

function MainImage() {
  return (
    <div className="main_img-container">
      <img className="main_img-container" src={mainImg} alt="메인 이미지" />
      <div className="main_img-text-container">
        <div className="main_img-text">오늘 읽은 페이지 수: 0p</div>
        <div className="main_img-text">3일째 책장이 비어있어요ㅜ_ㅜ</div>
      </div>
    </div>
  );
}

export default MainImage;
