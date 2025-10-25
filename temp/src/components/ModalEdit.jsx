// ModalEdit.jsx
import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from "axios";
import defaultBook from "../assets/bookImg.jpg";

function ModalEdit({ onClose, bookData, refreshBooks }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(defaultBook);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (bookData) {
      setTitle(bookData.title || "");
      setAuthor(bookData.author || "");
      setCoverPreview(bookData.coverImageUrl || defaultBook);
    }
  }, [bookData]);

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
      setCoverPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    if (!title || !author) return alert("제목과 저자는 필수입니다!");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      if (coverFile) formData.append("coverImage", coverFile);

      const res = await axios.put(
        `http://43.200.102.14:5000/api/books/${bookData.bookId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Content-Type 제거 -> axios가 자동으로 설정
          },
        }
      );

      if (res.data.success) {
        alert("책 정보가 수정되었습니다!");
        if (refreshBooks) refreshBooks();
        onClose();
      } else {
        alert("수정 실패: " + res.data.message);
      }
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정 중 오류 발생");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>책 수정</h2>

        <div className="modal-edit-container">
          <div className="modal-left">
            <p>책 표지</p>
            {coverPreview && (
              <img
                src={coverPreview}
                alt="책 표지 미리보기"
                style={{
                  width: "120px",
                  height: "150px",
                  objectFit: "cover",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                }}
              />
            )}
            <input type="file" onChange={handleCoverChange} />
            <p>책 이름</p>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <p>작가</p>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
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
