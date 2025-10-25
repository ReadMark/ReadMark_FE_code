import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import MainImage from '../components/MainImg.jsx';
import BookStated from "../components/BookStated.jsx";
import axios from 'axios';
import defaultBook from "../assets/bookImg.jpg";
import './want.css';

function DoneBook({ book, deleteMode, onDelete }) {
  return (
    <div
      className={`main__book-each ${deleteMode ? "delete-hover" : ""}`}
      onClick={() => deleteMode && onDelete(book.userBookId, book.bookId)}
    >
      <div className="main__book-img-container">
        <img
          className="main__book-img"
          src={book.coverImageUrl}
          alt={book.title}
          onError={(e) => (e.target.src = defaultBook)}
        />
      </div>
      <div className="main__books-texts">
        <div className="main__book-title">{book.title}</div>
        <div className="main__book-sub-text">{book.author}</div>
        <div className="main__book-sub-text">독서시간: {book.readTime || "00:45"}</div>
        <div className="main__book-sub-text">완독 날짜: {book.lastRead}</div>
      </div>
    </div>
  );
}

function DonePage() {
  const [books, setBooks] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [usedBookIds, setUsedBookIds] = useState([]); // ✅ 삭제 후 다시 선택 가능하도록 관리
  const token = localStorage.getItem("token");
  const userId = Number(localStorage.getItem("userId"));

  const fetchDoneBooks = async () => {
    try {
      const res = await axios.get(
        `http://43.200.102.14:5000/api/userbooks/user/${userId}/status/READ_DONE`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        const mapped = res.data.data.map(item => ({
          userBookId: item.userBookId,
          bookId: item.book?.bookId,
          title: item.book?.title || "제목 없음",
          author: item.book?.author || "작가 정보 없음",
          coverImageUrl: item.book?.coverImageUrl
            ? `http://43.200.102.14:5000${item.book.coverImageUrl}`
            : defaultBook,
          readTime: item.readTime || "00:45",
          lastRead: new Date().toLocaleDateString(), // ✅ 항상 오늘 날짜
        }));
        setBooks(mapped);
        setUsedBookIds(mapped.map(b => b.bookId)); // ✅ 선택된 bookId 저장
      } else {
        console.warn("완독 책 불러오기 실패:", res.data.message);
      }
    } catch (err) {
      console.error("완독 책 조회 실패:", err);
    }
  };

  const handleDeleteBook = async (userBookId, bookId) => {
    try {
      if (!window.confirm("정말 삭제하시겠습니까?")) return;
      await axios.delete(
        `http://43.200.102.14:5000/api/userbooks/${userBookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks(prev => prev.filter(b => b.userBookId !== userBookId));
      setUsedBookIds(prev => prev.filter(id => id !== bookId)); // ✅ 삭제 시 다시 선택 가능
      alert("삭제 완료");
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류 발생");
    }
  };

  useEffect(() => {
    fetchDoneBooks();
  }, []);

  return (
    <>
      <Header />
      <MainImage />
      <BookStated />

      <div className="button-container">
        <button className="button" onClick={() => setDeleteMode(prev => !prev)}>
          {deleteMode ? "확인" : "삭제"}
        </button>
      </div>

      <div className="main__books-container">
        {books.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "40px", color: "#777" }}>
            완독한 책이 없습니다.
          </p>
        ) : (
          books.map(book => (
            <DoneBook
              key={book.userBookId}
              book={book}
              deleteMode={deleteMode}
              onDelete={handleDeleteBook}
            />
          ))
        )}
      </div>
    </>
  );
}

export default DonePage;
