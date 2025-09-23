import React, { useState } from "react";
import './book-each.css';

function Bookwant({ userBookId, title, author, coverImage, onDelete, deleteMode }) {
  const [hover, setHover] = useState(false);

  // 클릭 시 삭제 요청만 호출 (확인은 WantPage에서)
  const handleClick = () => {
    if (deleteMode) {
      onDelete(userBookId);
    }
  };

  return (
    <div
      className="main__book-each"
      style={{
        border: hover && deleteMode ? "2px solid red" : "1px solid #ccc",
        cursor: deleteMode ? "pointer" : "default",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <div className="main__book-img-container">
        <img
          className="main__book-img"
          src={coverImage ? `http://43.200.102.14:5000${coverImage}` : "/default-book.jpg"}
          alt={title}
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
