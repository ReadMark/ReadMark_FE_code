import React, { useState } from "react";
import "./modalReading.css";
import axios from "axios";

function ModalNowRead({ onClose, refreshBooks, currentPageFromEmbed = 0, readDateFromEmbed }) {
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
      // 1️⃣ Book 등록
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("maxPage", maxPage);
      if (bookImage) formData.append("coverImage", bookImage);

      const bookRes = await axios.post(
        "http://43.200.102.14:5000/api/books",
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );

      if (!bookRes.data.success) return alert("책 등록 실패: " + bookRes.data.message);
      const bookId = bookRes.data.data?.bookId || bookRes.data.bookId;

      // 2️⃣ UserBook 등록
      const page = Math.max(0, Number(currentPageFromEmbed || 0));
      const totalPage = Number(maxPage);
      const statusToSave = page >= totalPage ? "READ_DONE" : "NOW_READ";
      const lastReadAt = readDateFromEmbed || new Date().toISOString();

      await axios.post(
        "http://43.200.102.14:5000/api/userbooks",
        {
          userId,
          bookId,
          status: statusToSave,
          currentPage: Math.min(page, totalPage),
          maxPage: totalPage,
          lastReadAt,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 3️⃣ 오늘 읽은 페이지 기록
      if (page > 0) {
        await axios.post(
          "http://43.200.102.14:5000/api/readinglogs",
          {
            userId,
            pagesRead: page,
            readDate: lastReadAt,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      alert(statusToSave === "READ_DONE" ? "🎉 완료 등록!" : "📚 지금 읽는 책 등록!");
      await refreshBooks(); // MainPage 갱신
      onClose();
    } catch (err) {
      console.error(err);
      alert("서버 오류: " + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>📖 새 책 추가</h2>

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
