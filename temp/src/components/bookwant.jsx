import './book-each.css';
import bookImg from "../assets/bookImg.jpg";

function Bookwant() {
  return (
    <main>
      <div className="main__book-each">
        <div className="main__book-img-container">
          <img className="main__book-img" src={bookImg} alt="book" />
        </div>
        <div className="main__books-texts">
          <div className="main__book-title">트로피컬 나이트</div>
          <div className="main__book-sub-text">조예은</div>
        </div>
      </div>
    </main>
  );
}

export default Bookwant;
