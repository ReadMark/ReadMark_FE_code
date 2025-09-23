import ModifyIcon from './modify.svg';
import './mypage.css';

function Mypa({ showEdit, onEditClick, title, author, pageNumber, bookImage, createdAt, favPageId, onDelete }) {
  const serverUrl = "http://43.200.102.14:5000"; // 서버 주소 추가

  return (
    <div className="my-fa-page-each-container" style={{ position: "relative" }}>
      {showEdit && (
        <>
          <button 
            style={{
              position: "absolute",
              top: "-20px",
              left: "-15px",
              background: "none",
              border: "none",
              padding: 0,
              zIndex: 9999
            }}
            onClick={onEditClick}
          >
            <img src={ModifyIcon} alt="수정" style={{ width: "20px", height: "20px" }} />
          </button>

          <button
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              background: "none",
              border: "none",
              color: "red",
              fontSize: "18px",
              cursor: "pointer",
              zIndex: 9999
            }}
            onClick={() => onDelete(favPageId)}
          >
            🗑️
          </button>
        </>
      )}

      <div className="index">{pageNumber}p</div>

      <div>
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
