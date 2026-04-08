import React, { useState } from "react";
import "./modalReading.css";
import axios from "axios";

function ModalNowRead({ onClose, refreshBooks }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [maxPage, setMaxPage] = useState("");
  const [bookImage, setBookImage] = useState(null);

  const token = localStorage.getItem("token");
  const userId = Number(localStorage.getItem("userId"));

  const handleSave = async () => {
    if (!title || !author || !maxPage) {
      return alert("제목, 작가, 총 페이지를 입력해주세요!");
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("maxPage", maxPage);
      if (bookImage) formData.append("coverImage", bookImage);

      const bookRes = await axios.post(
        "http://example/api/books",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!bookRes.data.success)
        return alert("책 등록 실패: " + bookRes.data.message);
      const bookId = bookRes.data.data?.bookId || bookRes.data.bookId;

      // UserBook 등록
      await axios.post(
        "http://example/api/userbooks",
        {
          userId,
          bookId,
          status: "NOW_READ",
          currentPage: 0, // 기본값
          maxPage: Number(maxPage),
          lastReadAt: new Date().toISOString(), // 현재 시간
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await refreshBooks();
      onClose();
    } catch (err) {
      console.error(err);
      alert("서버 오류: " + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>새 책 추가</h2>

        <div>
          <p>책 제목</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="책 제목"
          />
        </div>

        <div>
          <p>작가</p>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작가명"
          />
        </div>

        <div>
          <p>책 표지</p>
          <input type="file" onChange={(e) => setBookImage(e.target.files[0])} />
        </div>

        <div>
          <p>총 페이지</p>
          <input
            type="number"
            min="1"
            value={maxPage}
            onChange={(e) => setMaxPage(e.target.value)}
            placeholder="예: 300"
          />
        </div>

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={onClose}>닫기</button>
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
}

export default ModalNowRead;
