import Header from '../components/Header.jsx';
import Book from '../components/Book-each.jsx';
import MainImage from "../components/MainImg.jsx";
import BookStated from "../components/BookStated.jsx";
import Bookdone from '../components/bookdone.jsx';
import './want.css';

function DonePage() {
  return (
    <>
    <Header />
      <MainImage />
      <BookStated />

      <div className="main__books-container">
        <Bookdone/>
        <Bookdone/>
        <Bookdone/>
        <Bookdone/>
      </div>

      <div className="main__books-container">
        <Bookdone/>
        <Bookdone/>
        <Bookdone/>
        <Bookdone/>
      </div>
    </>
  );
}

export default DonePage;
