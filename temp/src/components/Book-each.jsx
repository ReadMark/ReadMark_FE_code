import './book-each.css';
import bookImg from "../assets/bookImg.jpg";

function Book() {
  return (
    <main>
      <div className="main__book-each">
        <div className="main__book-img-container">
          <img className="main__book-img" src={bookImg} alt="book" />
        </div>
        <div className="main__books-texts">
          <div className="main__book-title">트로피컬 나이트</div>
          <div className="main__book-sub-text">조예은</div>
          <div className="main__book-sub-text">34p/223p</div>
          <div className="main__book-sub-text">독서시간: 1h</div>
          <div className="main__book-sub-text">마지막으로 읽은 날짜: 2025-07-15</div>
        </div>
      </div>
    </main>
  );
}

export default Book;
