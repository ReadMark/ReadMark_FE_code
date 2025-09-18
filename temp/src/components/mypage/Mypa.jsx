import Bookimg from "../mypage/bookImg.jpg";

function Mypa() {
  return (
    <>
    <div className="my-fa-page-each-container">
      <div className="my-fa-page-index">
        <div className="my-fa-index-text">100p</div>
      </div>
      
        <div><img className="main__book-img" src={Bookimg} alt="" /></div>
        <div className="my-fa-page_books-texts">
          <div className="my-fa-page-book-title">트로피컬 나이트</div>
          <div className="my-fa-page-book-text">조예은</div>
          <div className="my-fa-page-book-text">저장한 날짜: 2025-07-15</div>
        </div>
      </div>
    </>
  );
}

export default Mypa;


