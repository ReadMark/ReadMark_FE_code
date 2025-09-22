import Bookimg from "../mypage/bookImg.jpg";
import ModifyIcon from './modify.svg';
import './mypage.css';

function Mypa({ showEdit }) {
  return (
    <div className="my-fa-page-each-container" style={{ position: "relative" }}>
      {showEdit && (
        <button 
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "start",
            top: "-20px",
            left: "-15px",
            zIndex: 10,
            background: "none",
            border: "none",
            padding: 0,
          }}
        >
          <img src={ModifyIcon} alt="수정" style={{ width: "20px", height: "20px" }} />
        </button>
      )}
      <div className="index">100p</div>
      <div><img className="main__book-img" src={Bookimg} alt="" /></div>
      <div className="my-fa-page_books-texts">
        <div className="my-fa-page-book-title">트로피컬 나이트</div>
        <div className="my-fa-page-book-text">조예은</div>
        <div className="my-fa-page-book-text">저장한 날짜: 2025-07-15</div>
      </div>
    </div>
  );
}

export default Mypa;
