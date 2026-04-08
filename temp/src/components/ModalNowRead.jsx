import React, { useState } from "react";
import "./modalReading.css";
import axios from "axios";

function ModalNowRead({
  onClose,
  refreshBooks,
  currentPageFromEmbed = 0,
  readDateFromEmbed,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [bookImage, setBookImage] = useState(null);

  const token = localStorage.getItem("token");
  const rawUserId = localStorage.getItem("userId");
  const userId = rawUserId ? JSON.parse(rawUserId) : null;

  const handleSave = async () => {
    if (!title || !author || !totalPage) {
      return alert("제목, 작가, 총 페이지를 모두 입력해주세요!");
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("totalBook", totalPage);

      if (bookImage) formData.append("coverImage", bookImage);

      const bookRes = await axios.post(
        "http://example",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!bookRes.data.success) {
        return alert("책 등록 실패: " + bookRes.data.message);
      }

      const bookId = bookRes.data.data?.bookId || bookRes.data.bookId;

      const currentPage = Math.max(0, Number(currentPageFromEmbed || 0));
      const totalPageNum = Number(totalPage);
      const statusToSave =
        currentPage >= totalPageNum ? "READ_DONE" : "NOW_READ";
      const lastReadAt = readDateFromEmbed || new Date().toISOString();

      await axios.post(
        "http://example",
        {
          userId,
          bookId,
          status: statusToSave,
          currentPage: Math.min(currentPage, totalPageNum),
          maxPage: totalPageNum,
          lastReadAt,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (currentPage > 0) {
        await axios.post(
          "http://example",
          {
            userId,
            pagesRead: currentPage,
            readDate: lastReadAt,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      alert(
        statusToSave === "READ_DONE"
          ? "완료된 책으로 등록되었습니다!"
          : "지금 읽는 책 등록 완료!"
      );
      await refreshBooks();
      await new Promise((res) => setTimeout(res, 300));
      onClose();
    } catch (err) {
      console.error("등록 중 오류:", err);
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
            placeholder="책 제목 입력"
          />
        </div>

        <div>
          <p>작가명</p>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작가명 입력"
          />
        </div>

        <div>
          <p>책 표지</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBookImage(e.target.files[0])}
          />
        </div>

        <div>
          <p>총 페이지 수</p>
          <input
            type="number"
            min="1"
            value={totalPage}
            onChange={(e) => setTotalPage(e.target.value)}
            placeholder="예: 300"
          />
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button onClick={onClose}>닫기</button>
          <button
            onClick={() => {
              handleSave();
            }}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalNowRead;
