import React, { useState } from "react";
import './Modal.css';
import axios from "axios";

function ModalWant({ onClose, refreshBooks }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const token = localStorage.getItem("token");
  const userId = Number(localStorage.getItem("userId"));

  const handleSave = async () => {
    if (!title || !author) return alert("책 제목과 작가를 입력해주세요!");

    try {
      console.log("책 등록 요청 시작", { title, author, bookImage });

      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      if (bookImage) formData.append("coverImage", bookImage);

      const bookRes = await axios.post(
        "http://example/api/books",
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
      console.log("책 등록 응답:", bookRes.data);

      if (!bookRes.data.success) return alert("책 등록 실패: " + bookRes.data.message);
      const bookId = bookRes.data.data?.bookId || bookRes.data.bookId;

      console.log("읽고 싶은 책 추가 요청", { userId, bookId });
      const wishRes = await axios.post(
        "http://example/api/userbooks",
        { userId, bookId, status: "WANNA_READ" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("읽고 싶은 책 추가 응답:", wishRes.data);

      if (!wishRes.data.success) return alert("읽고 싶은 책 추가 실패");

      await refreshBooks();
      onClose();
    } catch (err) {
      console.error("책 추가 에러:", err.response?.data || err.message);
      alert("서버 오류 발생: " + JSON.stringify(err.response?.data || err.message));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBookImage(file);
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>읽고 싶은 책 추가</h2>

        <div>
          <p>책 제목</p>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="책 제목" />
        </div>

        <div>
          <p>작가</p>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="작가" />
        </div>

        <div>
          <p>책표지</p>
          <input type="file" onChange={handleFileChange} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="책표지 미리보기"
              style={{ width: "80px", marginTop: "10px", borderRadius: "6px" }}
            />
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button onClick={onClose}>닫기</button>
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
}

export default ModalWant;
