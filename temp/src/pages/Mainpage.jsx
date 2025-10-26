// MainPage.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import MainImage from "../components/MainImg.jsx";
import BookState from "../components/BookState.jsx";
import ModalNowRead from "../components/modalReading.jsx";
import ModalEdit from "../components/ModalEdit.jsx";
import axios from "axios";
import "./mainpage.css";
import defaultBook from "../assets/bookImg.jpg";

function MainPage() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const token = localStorage.getItem("token");
  const userId = Number(localStorage.getItem("userId"));

  // 1️⃣ 읽고 있는 책 불러오기
  const fetchBooks = async () => {
    if (!token || !userId) return;
    try {
      const res = await axios.get(
        `http://43.200.102.14:5000/api/userbooks/user/${userId}/status/NOW_READ`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success && Array.isArray(res.data.data)) {
        const mapped = res.data.data.map((item) => ({
          userBookId: item.userBookId,
          bookId: item.book?.bookId ?? item.userBookId,
          title: item.book?.title ?? "제목 없음",
          author: item.book?.author ?? "작가 정보 없음",
          coverImageUrl: item.book?.coverImageUrl
            ? `http://43.200.102.14:5000${item.book.coverImageUrl}`
            : defaultBook,
          currentPage: item.currentPage ?? 0,
          maxPage: item.maxPage ?? 300,
          lastRead: item.updatedAt
            ? new Date(item.updatedAt).toLocaleDateString()
            : new Date().toLocaleDateString(),
          favorite: item.favorite ?? false,
          status: item.status ?? "NOW_READ",
        }));
        setBooks(mapped);
      } else setBooks([]);
    } catch (err) {
      console.error("지금 읽는 책 조회 실패:", err);
      setBooks([]);
    }
  };

  // 2️⃣ ESP32 currentPage & 총 읽은 페이지 한번에 반영
  const fetchCurrentPagesAndToday = async () => {
    if (!userId) return;
    try {
      const [embedRes, logRes] = await Promise.all([
        axios.get(`http://43.200.102.14:5000/api/upload/frontend/book-info/${userId}`),
        axios.get(`http://43.200.102.14:5000/api/readinglogs/user/${userId}/today`)
      ]);

      const embedData = embedRes.data;
      const logData = logRes.data;

      setBooks((prev) =>
        prev.map((b) =>
          embedData.success && embedData.bookId === b.bookId
            ? { ...b, currentPage: embedData.currentPage }
            : b
        )
      );

      return logData.success ? logData.totalPagesRead ?? 0 : 0;
    } catch (err) {
      console.error("페이지 정보 조회 실패:", err);
      return 0;
    }
  };

  // 3️⃣ 다 읽은 책으로 상태 변경
  const moveBookToDone = async (userBookId) => {
    try {
      await axios.put(
        `http://43.200.102.14:5000/api/userbooks/${userBookId}/status`,
        { status: "READ_DONE" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks((prev) => prev.filter((b) => b.userBookId !== userBookId));
      console.log(`✅ ${userBookId}번 책을 완독 처리`);
    } catch (err) {
      console.error("완독 상태 변경 실패:", err);
    }
  };

  // 4️⃣ 책 삭제
  const handleDeleteBook = async (userBookId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(
        `http://43.200.102.14:5000/api/userbooks/${userBookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks((prev) => prev.filter((b) => b.userBookId !== userBookId));
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류 발생");
    }
  };

  // 초기 데이터 fetch
  useEffect(() => {
    fetchBooks().then(fetchCurrentPagesAndToday);
  }, []);

  return (
    <>
      <Header />
      <MainImage />
      <BookState todayPages={0} />

      <div className="button-container">
        <button className="button" onClick={() => setShowModal(true)}>
          추가하기
        </button>
        <button className="button" onClick={() => setEditMode((prev) => !prev)}>
          {editMode ? "수정 완료" : "수정하기"}
        </button>
        <button
          className="button"
          onClick={() => setDeleteMode((prev) => !prev)}
        >
          {deleteMode ? "확인" : "삭제"}
        </button>
      </div>

      {showModal && (
        <ModalNowRead
          onClose={() => setShowModal(false)}
          refreshBooks={fetchBooks}
        />
      )}

      {showEditModal && selectedBook && (
        <ModalEdit
          onClose={() => setShowEditModal(false)}
          bookData={selectedBook}
          refreshBooks={fetchBooks}
        />
      )}

      <div className="main__books-container">
        {books.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777", marginTop: "40px" }}>
            지금 읽고 있는 책이 없습니다.
          </p>
        ) : (
          books.map((book) => {
            const progress = Math.min(
              (book.currentPage / book.maxPage) * 100,
              100
            );

            // 진행률 100%이면 자동 완독 처리
            if (progress >= 100) {
              moveBookToDone(book.userBookId);
            }

            const borderClass = editMode
              ? "edit-border"
              : deleteMode
              ? "delete-hover"
              : "";

            return (
              <div
                key={book.userBookId}
                className={`main__book-each ${borderClass}`}
                onClick={() => {
                  if (deleteMode) handleDeleteBook(book.userBookId);
                  if (editMode) {
                    setSelectedBook(book);
                    setShowEditModal(true);
                  }
                }}
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
                  <div className="book-progress-container">
                    <div className="book-progress-bar">
                      <div
                        className="book-progress-bar-fill"
                        style={{
                          width: `${progress}%`,
                          background: "#0800ff",
                        }}
                      />
                    </div>
                  </div>
                  <div className="main__book-sub-text">{book.author}</div>
                  <div className="main__book-sub-text">
                    총 읽은 페이지: {book.currentPage}/{book.maxPage} (
                    {progress.toFixed(1)}%)
                  </div>
                  <div className="main__book-sub-text">
                    마지막으로 읽은 날짜: {book.lastRead}
                  </div>
                  {book.favorite && (
                    <div
                      className="main__book-sub-text"
                      style={{ color: "gold" }}
                    >
                      즐겨찾기
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default MainPage;
