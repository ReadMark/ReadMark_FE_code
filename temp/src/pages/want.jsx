import Header from '../components/Header.jsx';
import Book from '../components/Book-each.jsx';
import MainImage from "../components/MainImg.jsx";
import BookStatew from "../components/BookStatew.jsx";
import './want.css';

function WantPage() {
  return (
    <>
      <MainImage />
      <BookStatew />

      <div className="main__books-container">
        <Book/>
        <Book/>
        <Book/>
        <Book/>
      </div>

      <div className="main__books-container">
        <Book/>
        <Book/>
        <Book/>
        <Book/>
      </div>
    </>
  );
}

export default WantPage;
