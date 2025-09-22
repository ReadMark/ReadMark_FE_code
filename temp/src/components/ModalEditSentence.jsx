import React, { useState } from "react";
import Bookimg from "../assets/bookImg.jpg";
import './Modal.css';

function ModalEditsen({ onClose }) {
  const [title, setTitle] = useState("트로피컬 나이트");
  const [sen, setsen] = useState("조예은");
  const [pages, setPages] = useState(100);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>책 수정</h2>
        <div>
          <p>책표지</p>
          <img src={Bookimg} alt="책표지" style={{ width: "80px" }} />
          <input type="file" />
        </div>
        <div>
          <p>책 이름</p>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <p>글</p>
          <input type="text" value={sen} onChange={(e) => setsen(e.target.value)} />
        </div>
        <div>
          <p>페이지 수</p>
          <input type="number" value={pages} onChange={(e) => setPages(e.target.value)} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button onClick={onClose}>닫기</button>
          <button onClick={onClose}>저장</button>
          <button onClick={onClose}>삭제</button>
        </div>
      </div>
    </div>
  );
}

export default ModalEditsen;
