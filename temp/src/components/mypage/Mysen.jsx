import React from "react";
import './mypage.css';
import DefaultBookImg from '../../assets/bookImg.jpg';

function Mysen({ sentenceData, deleteMode, onDelete }) {
  const { favQuoteId, bookTitle, content, pageNumber, coverImageUrl, createdAt } = sentenceData;
  const serverUrl = "http://43.200.102.14:5000";

  const handleClick = () => {
    if (deleteMode && window.confirm("정말 삭제하시겠습니까?")) {
      onDelete(favQuoteId);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const imageSrc = coverImageUrl
    ? (coverImageUrl.startsWith("http") ? coverImageUrl : `${serverUrl}${coverImageUrl}`)
    : DefaultBookImg;

  return (
    <div className={`my-fa-page-each-container-sen ${deleteMode ? 'delete-hover' : ''}`} onClick={handleClick}>
      <div className="book-image-wrapper">
        <img
          className="my-fa-book-img"
          src={imageSrc}
          alt={bookTitle || "책 표지"}
          onError={(e) => (e.target.src = DefaultBookImg)}
        />
      </div>

      <div className="my-fa-page-books-info">
        <div className="my-fa-page-book-title-sen">{bookTitle}</div>
        <div className="my-fa-page-book-tex-sen">
          <div className="pag-sen">p{pageNumber}</div> - {content}
        </div>
        <div className="my-fa-page-moon-date-sen">
          저장한 날짜: {formatDate(createdAt)}
        </div>
      </div>
    </div>
  );
}

export default Mysen;
