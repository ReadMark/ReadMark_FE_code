import React from "react";
import './mypage.css';

function Mypa({ deleteMode, title, author, pageNumber, bookImage, createdAt, favPageId, onDelete }) {
  const serverUrl = "http://43.200.102.14:5000";

  const handleClick = () => {
    if (deleteMode && window.confirm("정말 삭제하시겠습니까?")) {
      onDelete(favPageId);
    }
  };

  return (
    <div
      className={`my-fa-page-each-container ${deleteMode ? 'delete-mode' : ''}`}
      onClick={handleClick}
    >
      <div className="index">{pageNumber}p</div>

      <div className="book-image-wrapper">
        {bookImage ? (
          <img
            className="main__book-img"
            src={bookImage.startsWith("http") ? bookImage : `${serverUrl}${bookImage}`}
            alt={title}
          />
        ) : (
          <div className="main__book-img placeholder">이미지 없음</div>
        )}
      </div>

      <div className="my-fa-page_books-texts">
        <div className="my-fa-page-book-title">{title}</div>
        <div className="my-fa-page-book-text">{author}</div>
        <div className="my-fa-page-book-text">
          저장한 날짜: {createdAt ? createdAt : new Date().toISOString().split('T')[0]}
        </div>
      </div>
    </div>
  );
}

export default Mypa;
