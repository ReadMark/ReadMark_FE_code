import Header from '../components/Header.jsx';
import Book from '../components/Book-each.jsx';
import MainImage from "../components/MainImg.jsx";
import BookStated from "../components/BookStated.jsx";
import './want.css';

function DonePage() {
  return (
    <>
      <MainImage />
      <BookStated />

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

export default DonePage;
