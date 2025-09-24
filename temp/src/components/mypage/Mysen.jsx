import React from "react";
import ModifyIcon from './modify.svg';

function Mysen({ sentenceData, showEdit, onDelete, onEditClick }) {
  const {
    favQuoteId,
    bookTitle,
    content,
    pageNumber,
    coverImageUrl,
    createdAt
  } = sentenceData;

  return (
    <div className="my-fa-page-each-container ma-fa-moon-container" style={{ position: "relative" }}>
      {showEdit && (
        <div style={{ position: "absolute", top: "-20px", left: "-15px", display: "flex", gap: "5px", zIndex: 10 }}>
          <button
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            onClick={() => onEditClick(sentenceData)}
          >
            <img src={ModifyIcon} alt="수정" style={{ width: "20px", height: "20px" }} />
          </button>
          <button
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "red", fontWeight: "bold" }}
            onClick={() => onDelete(favQuoteId)}
          >
            삭제
          </button>
        </div>
      )}

      <div>
        <img
          className="main__book-img my-fa-book-img"
          src={coverImageUrl || "/bookImg.jpg"}
          alt={bookTitle}
        />
      </div>

      <div className="my-fa-page_books-texts">
        <div className="my-fa-page-book-title my-fa-page-moon-title">{bookTitle}</div>
        <div className="my-fa-page-book-text-center">
          <div className="my-fa-page-moon-text page">p{pageNumber}</div>
          <div className="my-fa-page-moon-text">{content}</div>
        </div>
        <div className="my-fa-page-moon-date">저장한 날짜: {createdAt}</div>
      </div>
    </div>
  );
}

export default Mysen;
