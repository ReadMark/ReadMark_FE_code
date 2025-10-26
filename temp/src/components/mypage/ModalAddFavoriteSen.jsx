// ModalAddFavoriteQuote.jsx
import React, { useState } from "react";
import "./Modall.css";
import axios from "axios";

function ModalAddFavoriteQuote({ onClose, refreshQuotes }) {
  const [bookTitle, setBookTitle] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [content, setContent] = useState(""); // 인용문 내용
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
    if (!content.trim()) return alert("인용문 내용을 입력해주세요!");
    if (!pageNumber || pageNumber < 1)
      return alert("페이지 번호를 1 이상 입력해주세요.");

    try {
      const formData = new FormData();
      formData.append("bookTitle", bookTitle);
      formData.append("content", content);
      formData.append("pageNumber", String(pageNumber));
      if (coverFile) formData.append("coverImage", coverFile);
      if (coverUrl.trim()) formData.append("coverImageUrl", coverUrl);

      const res = await axios.post(
        `http://43.200.102.14:5000/api/mypage/user/${userId}/favorite-quote`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("즐겨찾기 인용문이 추가되었습니다!");
        if (refreshQuotes) refreshQuotes(res.data.favoriteQuote);
        onClose();
      } else {
        alert("추가 실패: " + res.data.message);
      }
    } catch (err) {
      console.error("추가 실패:", err.response?.data || err);
      alert("추가 중 오류 발생. 콘솔 확인");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>즐겨찾기 인용문 추가</h2>

        <div className="modal-edit-container">
          <div className="modal-left">
            <p>책 제목</p>
            <input
              type="text"
              value={bookTitle}
              placeholder="책 제목을 입력하세요"
              onChange={(e) => setBookTitle(e.target.value)}
            />

            <p>페이지 번호</p>
            <input
              type="number"
              value={pageNumber}
              placeholder="페이지 번호를 입력하세요"
              onChange={(e) => setPageNumber(Number(e.target.value))}
              min={1}
            />

            <p>인용문 내용</p>
            <textarea
              value={content}
              placeholder="인용문 내용을 입력하세요"
              onChange={(e) => setContent(e.target.value)}
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

export default ModalAddFavoriteQuote;
