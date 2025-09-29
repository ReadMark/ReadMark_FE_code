import React from "react";
import './book-each.css';

function Bookwant({ userBookId, title, author, coverImage, onDelete, deleteMode }) {

  const handleClick = () => {
    if (deleteMode) {
      // 삭제 모드일 때만 확인창
      if (window.confirm("정말 삭제하시겠습니까?")) {
        onDelete(userBookId);
      }
    }
  };

  return (
    <div
      className={`main__book-each ${deleteMode ? 'delete-hover' : ''}`}
      onClick={handleClick}
    >
      <div className="main__book-img-container">
        <img
          className="main__book-img"
          src={coverImage ? `http://43.200.102.14:5000${coverImage}` : "/default-book.jpg"}
          alt={title}
          onError={(e) => e.target.src = "/default-book.jpg"}
        />
      </div>
      <div className="main__books-texts">
        <div className="main__book-title">{title}</div>
        <div className="main__book-sub-text">{author}</div>
      </div>
    </div>
  );
}

export default Bookwant;
