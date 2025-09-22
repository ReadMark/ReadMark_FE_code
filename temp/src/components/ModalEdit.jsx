import React, { useState } from "react";
import Bookimg from "../assets/bookImg.jpg"; // 기본 표지 이미지
import './Modal.css';

function ModalEdit({ book, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [page, setPage] = useState(book?.page || "");
  const [file, setFile] = useState(null);

  const handleSave = () => {
    // 저장 시 부모에게 데이터 전달
    onSave({ ...book, title, author, page, img: file ? URL.createObjectURL(file) : book.img });
    onClose();
  };

  const handleDelete = () => {
    onDelete(book.id);
    onClose();
  };

  return (
    <div className="modal">
      <h2>책 정보 수정</h2>

      <div style={{ marginTop: "10px" }}>
        <p>책 표지</p>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <div style={{ marginTop: "10px" }}>
          <img 
            src={file ? URL.createObjectURL(file) : book.img || Bookimg} 
            alt="책표지" 
            style={{ width: "100px", height: "auto" }} 
          />
        </div>
      </div>

      <div style={{ marginTop: "10px" }}>
        <p>책 제목</p>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <p>작가 이름</p>
        <input 
          type="text" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <p>페이지 수</p>
        <input 
          type="number" 
          value={page} 
          onChange={(e) => setPage(e.target.value)} 
        />
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <button onClick={handleSave}>수정</button>
        <button onClick={handleDelete}>삭제</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default ModalEdit;
