import React, { useState, useEffect } from "react";
import './Modal.css';
import axios from "axios";

function ModalEdit({ onClose, refreshPages }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [bookFile, setBookFile] = useState(null);
  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // 전체 책 목록 불러오기
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://43.200.102.14:5000/api/books", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setBooks(res.data.books);
          console.log("전체 책 목록:", res.data.books);
        }
      } catch (err) {
        console.error("전체 책 조회 실패:", err);
      }
    };
    fetchBooks();
  }, [token]);

  const handleSave = async () => {
    if (!title || !author || !pages) return alert("모든 항목을 올바르게 입력해주세요!");

    try {
      console.log("책 등록 요청 시작");
      let bookId;

      // 이미 있는 책인지 확인
      const existingBook = books.find(b => b.title === title && b.author === author);
      if (existingBook) {
        bookId = existingBook.bookId || existingBook.id;
        console.log("기존 책 사용:", bookId);
      } else {
        // 새 책 등록
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        if (bookFile) formData.append("coverImage", bookFile);

        const bookRes = await axios.post(
          "http://43.200.102.14:5000/api/books",
          formData,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
        );

        console.log("책 등록 결과:", bookRes.data);
        if (!bookRes.data.success) return alert("책 등록 실패: " + bookRes.data.message);

        bookId = bookRes.data.bookId;
      }

      // 즐겨찾기 페이지 등록
      const favRes = await axios.post(
        `http://43.200.102.14:5000/api/mypage/user/${userId}/favorite-page`,
        new URLSearchParams({
          bookId,
          pageNumber: Number(pages)
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Bearer ${token}` } }
      );

      console.log("즐겨찾기 페이지 등록 결과:", favRes.data);
      if (!favRes.data.success) return alert("즐겨찾기 페이지 추가 실패: " + favRes.data.message);

      // 화면 갱신
      if (refreshPages) await refreshPages();

      onClose();
    } catch (err) {
      console.error("Axios 오류:", err.response || err);
      alert("저장 중 오류 발생: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>책 추가</h2>

        <div>
          <p>책표지 업로드</p>
          <input type="file" onChange={e => setBookFile(e.target.files[0])} />
          {bookFile && <p style={{ marginTop: "5px" }}>선택된 파일: {bookFile.name}</p>}
        </div>

        <div>
          <p>책 이름</p>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div>
          <p>작가</p>
          <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
        </div>

        <div>
          <p>페이지 수</p>
          <input type="number" value={pages} onChange={e => setPages(e.target.value)} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button onClick={onClose}>닫기</button>
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
}

export default ModalEdit;
