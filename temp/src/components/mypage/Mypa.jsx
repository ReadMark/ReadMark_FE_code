import React from "react";
import "./mypage.css";
import DefaultBookImg from "../../assets/bookImg.jpg";

function Mypa({
  deleteMode,
  title,
  author,
  pageNumber,
  bookImage,
  createdAt,
  favPageId,
  onDelete,
}) {
  const serverUrl = "http://43.200.102.14:5000";

  const handleClick = () => {
    if (deleteMode) {
      onDelete(favPageId);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const imageSrc = bookImage
    ? bookImage.startsWith("http")
      ? bookImage
      : `${serverUrl}${bookImage}`
    : DefaultBookImg;

  return (
    <div
      className={`my-fa-page-each-container ${
        deleteMode ? "delete-hover" : ""
      }`}
      onClick={handleClick}
    >
      <div className="index">{pageNumber}p</div>

      <div className="book-image-wrapper">
        <img
          className="main__book-imgs"
          src={imageSrc}
          alt={title || "책 표지"}
          onError={(e) => (e.target.src = DefaultBookImg)}
        />
      </div>

      <div className="my-fa-page_books-texts">
        <div className="my-fa-page-book-title">{title}</div>
        <div className="my-fa-page-book-text">{author}</div>
        <div className="my-fa-page-book-text">
          저장한 날짜:{" "}
          {createdAt
            ? formatDate(createdAt)
            : formatDate(new Date().toISOString())}
        </div>
      </div>
    </div>
  );
}

export default Mypa;
