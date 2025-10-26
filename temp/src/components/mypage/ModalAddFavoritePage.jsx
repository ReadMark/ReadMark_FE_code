// ModalAddFavoritePage.jsx
import React, { useState } from "react";
import "./Modall.css";
import axios from "axios";

function ModalAddFavoritePage({ onClose, refreshPages }) {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [coverFile, setCoverFile] = useState(null); // 업로드 파일
  const [coverUrl, setCoverUrl] = useState(""); // 이미지 URL 선택사항

  const token = localStorage.getItem("token");
  const rawUserId = localStorage.getItem("userId");
  const userId = rawUserId
    ? rawUserId.replace(/^["']+|["']+$/g, "").trim()
    : rawUserId;

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!bookTitle.trim()) return alert("책 제목을 입력해주세요!");
    if (!author.trim()) return alert("작가를 입력해주세요!");
    if (!pageNumber || pageNumber < 1)
      return alert("페이지 번호를 1 이상 입력해주세요.");

    try {
      // 1️⃣ 책 등록
      const bookFormData = new FormData();
      bookFormData.append("title", bookTitle);
      bookFormData.append("author", author);
      if (coverFile) bookFormData.append("coverImage", coverFile);
      if (coverUrl.trim()) bookFormData.append("coverImageUrl", coverUrl);

      const bookRes = await axios.post(
        "http://43.200.102.14:5000/api/books",
        bookFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const bookId = bookRes.data.bookId;
      if (!bookId) throw new Error("책 등록 실패: bookId가 반환되지 않음");

      // 2️⃣ 즐겨찾기 페이지 추가 (FormData)
      const favFormData = new FormData();
      favFormData.append("bookId", bookId);
      favFormData.append("pageNumber", Number(pageNumber));

      const favRes = await axios.post(
        `http://43.200.102.14:5000/api/mypage/user/${userId}/favorite-page`,
        favFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (favRes.data.success) {
        alert("즐겨찾기 페이지가 추가되었습니다!");
        if (refreshPages) refreshPages(favRes.data.favoritePage);
        onClose();
      } else {
        alert("추가 실패: " + favRes.data.message);
      }
    } catch (err) {
      console.error("추가 실패:", err.response?.data || err);
      alert("추가 중 오류 발생. 콘솔 확인");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>즐겨찾기 페이지 추가</h2>

        <div className="modal-edit-container">
          <div className="modal-left">
            <p>책 제목</p>
            <input
              type="text"
              value={bookTitle}
              placeholder="책 제목을 입력하세요"
              onChange={(e) => setBookTitle(e.target.value)}
            />

            <p>작가</p>
            <input
              type="text"
              value={author}
              placeholder="작가를 입력하세요"
              onChange={(e) => setAuthor(e.target.value)}
            />

            <p>페이지 번호</p>
            <input
              type="number"
              value={pageNumber}
              placeholder="페이지 번호를 입력하세요"
              onChange={(e) => setPageNumber(Number(e.target.value))}
              min={1}
            />

            <p>책 표지 업로드</p>
            <input type="file" onChange={handleCoverChange} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button onClick={onClose}>닫기</button>
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddFavoritePage;
