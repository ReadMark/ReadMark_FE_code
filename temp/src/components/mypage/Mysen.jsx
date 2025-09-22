import Bookimg from './bookImg.jpg';
import ModifyIcon from './modify.svg'; 

function Mysen({ showEdit, onEditClick }) {  // 여기서 onEditClick 받기
  return (
    <div className="my-fa-page-each-container ma-fa-moon-container" style={{ position: "relative" }}>
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
          onClick={onEditClick} // 이제 클릭하면 모달 열림
        >
          <img src={ModifyIcon} alt="수정" style={{ width: "20px", height: "20px" }} />
        </button>
      )}
      <div><img className="main__book-img my-fa-book-img" src={Bookimg} alt="" /></div>
      <div className="my-fa-page_books-texts">
        <div className="my-fa-page-book-title my-fa-page-moon-title">트로피컬 나이트</div>
        <div className="my-fa-page-book-text-center">
          <div className="my-fa-page-moon-text page">p105</div>
          <div className="my-fa-page-moon-text">
            이건 확신이야. 내 애정이, 내 목소리가 너에게 어떤 방식으로든 닿을 거라고 믿어.
          </div>
        </div>
        <div className="my-fa-page-moon-date">저장한 날짜: 2025-07-15</div>
      </div>
    </div>
  );
}

export default Mysen;
