import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

function Header() {
  return (
    <header className="header_container">
      <div className="header_img-container">
        <Link to="/">
          <img className="header_img" src={logo} alt="logo" />
        </Link>
      </div>

      <div className="header_title">
        <Link to="/">Read Mark</Link>
      </div>

      <div className="header_right">
        <Link className="header__text" to="/mypage">마이페이지</Link>
        <Link className="header__text" to="/want">캘린더</Link>
      </div>
    </header>
  );
}

export default Header;