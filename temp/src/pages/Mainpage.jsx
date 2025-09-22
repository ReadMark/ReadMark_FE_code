import Header from '../components/Header.jsx';
import Booking from "../components/booking.jsx";
import MainImage from "../components/MainImg.jsx";
import BookState from "../components/BookState.jsx";
import './mainpage.css';


function MainPage() {
  return (
    <>
    <Header />
      <MainImage />
      <BookState />

      <div className="main__books-container">
        <Booking/>
        <Booking/>
        <Booking/>
        <Booking/>
      </div>

      <div className="main__books-container">
        <Booking/>
        <Booking/>
        <Booking/>
        <Booking/>
      </div>
    </>
  );
}

export default MainPage;
