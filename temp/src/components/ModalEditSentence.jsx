import React, { useState, useEffect } from "react";
import axios from "axios";
import './Modal.css';
import DefaultBookImg from '../assets/bookImg.jpg'; // 기본 책 이미지

function ModalEditsen({ favQuote, onClose, refreshSentences }) {
  const [content, setContent] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (favQuote) {
      setContent(favQuote.content || "");
      setPageNumber(favQuote.pageNumber || 1);
    } else {
      setContent("");
      setPageNumber(1);
    }
  }, [favQuote]);

  const handleSave = async () => {
    if (!content.trim()) {
      alert("문장을 입력해주세요.");
      return;
    }

    try {
      if (favQuote && favQuote.favQuoteId) {
        const res = await axios.put(
          `http://43.200.102.14:5000/api/mypage/favorite-quote/${favQuote.favQuoteId}`,
          new URLSearchParams({ pageNumber, content }),
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        if (res.data.success) {
          alert("문장이 수정되었습니다.");
          refreshSentences();
          onClose();
        }
      } else {
        const res = await axios.post(
          `http://43.200.102.14:5000/api/mypage/user/${userId}/favorite-quote`,
          new URLSearchParams({ bookId: 1, pageNumber, content }),
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        if (res.data.success) {
          alert("즐겨찾기한 문장이 저장되었습니다.");
          refreshSentences();
          onClose();
        }
      }
    } catch (err) {
      console.error(err);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{favQuote ? "문장 수정" : "문장 추가"}</h2>

        {/* 책 제목 & 표지 */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px' }}>
          <img
            src={favQuote?.coverImageUrl || DefaultBookImg}
            alt={favQuote?.bookTitle || "선택된 책 없음"}
            style={{ width: '60px', height: '80px', objectFit: 'cover', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <span style={{ fontWeight: 'bold' }}>{favQuote?.bookTitle || "선택된 책 없음"}</span>
        </div>

        <div>
          <p>페이지 번호</p>
          <input type="number" value={pageNumber} onChange={e => setPageNumber(Number(e.target.value))} />
        </div>
        <div>
          <p>문장</p>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={4} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button onClick={onClose}>닫기</button>
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
}

export default ModalEditsen;
