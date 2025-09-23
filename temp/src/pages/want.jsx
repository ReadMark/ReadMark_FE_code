import React, { useState, useEffect } from "react";
import Header from '../components/Header.jsx';
import MainImage from "../components/MainImg.jsx";
import BookStatew from "../components/BookStatew.jsx";
import Bookwant from '../components/bookwant.jsx';
import './want.css';
import ModalWant from '../components/modalwant.jsx';
import axios from "axios";

function WantPage() {
  const [showModal, setShowModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // 읽고 싶은 책 조회
  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `http://43.200.102.14:5000/api/userbooks/user/${userId}/status/WANNA_READ`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setBooks(res.data.data);
      } else {
        alert("읽고 싶은 책 조회 실패: " + res.data.message);
      }
    } catch (err) {
      console.error("========== Axios Error ==========");
      console.error("Message:", err.message);
      console.error("Code:", err.code);
      console.error("Request:", err.request);
      console.error("Response:", err.response);
      console.error("=================================");
      alert("서버 오류 발생: " + err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 삭제 핸들러 (한 곳에서만 확인)
  const handleDeleteBook = async (userBookId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await axios.delete(
        `http://43.200.102.14:5000/api/userbooks/${userBookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        fetchBooks();
      } else {
        alert("삭제 실패: " + res.data.message);
      }
    } catch (err) {
      console.error("========== Delete Error ==========");
      console.error("Message:", err.message);
      console.error("Code:", err.code);
      console.error("Request:", err.request);
      console.error("Response:", err.response);
      console.error("==================================");
      alert("서버 오류 발생: " + err.message);
    }
  };

  return (
    <>
      <Header />
      <MainImage />
      <BookStatew />

      <button onClick={() => setShowModal(true)}>추가하기</button>
      <button onClick={() => setDeleteMode(prev => !prev)}>
        {deleteMode ? "확인" : "삭제"}
      </button>

      {showModal && <ModalWant onClose={() => setShowModal(false)} refreshBooks={fetchBooks} />}

      <div className="main__books-container">
        {books.map(book => (
          <Bookwant
            key={book.userBookId}
            userBookId={book.userBookId}
            title={book.book.title}
            author={book.book.author}
            coverImage={book.book.coverImageUrl}
            onDelete={handleDeleteBook}
            deleteMode={deleteMode}
          />
        ))}
      </div>
    </>
  );
}

export default WantPage;