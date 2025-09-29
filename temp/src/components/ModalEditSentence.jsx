import React, { useState, useEffect } from "react";
import axios from "axios";
import './Modal.css';
import DefaultBookImg from '../assets/bookImg.jpg';

function ModalEditsen({ favQuote, bookData, onClose, setSentences }) {
  const [bookTitle, setBookTitle] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState(DefaultBookImg);
  const [content, setContent] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (favQuote) {
      setBookTitle(favQuote.bookTitle || "");
      setContent(favQuote.content || "");
      setPageNumber(favQuote.pageNumber || 1);
      setCoverImageUrl(favQuote.coverImageUrl || DefaultBookImg);
    } else if (bookData) {
      setBookTitle(bookData.bookTitle || "");
      setContent("");
      setPageNumber(1);
      setCoverImageUrl(bookData.coverImageUrl || DefaultBookImg);
    } else {
      setBookTitle("");
      setContent("");
      setPageNumber(1);
      setCoverImageUrl(DefaultBookImg);
    }
  }, [favQuote, bookData]);

  const handleSave = async () => {
    if (!content.trim()) return alert("문장을 입력해주세요.");
    if (!bookTitle.trim()) return alert("책 제목을 입력해주세요.");
    if (!pageNumber || pageNumber < 1) return alert("페이지 번호를 1 이상 입력해주세요.");

    try {
      const formParams = new URLSearchParams();
      formParams.append("bookTitle", bookTitle);
      formParams.append("coverImageUrl", coverImageUrl);
      formParams.append("pageNumber", pageNumber.toString());
      formParams.append("content", content);

      if (favQuote && favQuote.favQuoteId) {
        const res = await axios.put(
          `http://43.200.102.14:5000/api/mypage/favorite-quote/${favQuote.favQuoteId}`,
          new URLSearchParams({ pageNumber: pageNumber.toString(), content, coverImageUrl }),
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        if (res.data.success) {
          alert("문장이 수정되었습니다.");
          const fetchRes = await axios.get(
            `http://43.200.102.14:5000/api/mypage/user/${userId}/favorite-quotes`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setSentences(fetchRes.data.success ? fetchRes.data.favoriteQuotes : []);
          onClose();
        }
      } else {
        const res = await axios.post(
          `http://43.200.102.14:5000/api/mypage/user/${userId}/favorite-quote`,
          formParams,
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        if (res.data.success) {
          alert("즐겨찾기한 문장이 저장되었습니다.");
          setSentences(prev => prev ? [...prev, res.data.favoriteQuote] : [res.data.favoriteQuote]);
          onClose();
        } else {
          alert("저장 실패: " + res.data.message);
        }
      }
    } catch (err) {
      console.error("저장 실패:", err.response?.data || err.message);
      alert("저장 실패: " + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{favQuote ? "문장 수정" : "문장 추가"}</h2>

        <div>
          <p>책 제목</p>
          <input
            type="text"
            value={bookTitle}
            onChange={e => setBookTitle(e.target.value)}
            placeholder="책 제목을 입력하세요"
          />
        </div>

        <div>
          <p>책 표지 URL</p>
          <input
            type="text"
            value={coverImageUrl}
            onChange={e => setCoverImageUrl(e.target.value)}
            placeholder="책 표지 URL을 입력하세요"
          />
          <div style={{ marginTop: "10px" }}>
            <img
              src={coverImageUrl}
              alt="책 표지 미리보기"
              style={{ width: "80px", height: "100px", objectFit: "cover", border: "1px solid #ccc" }}
              onError={(e) => (e.target.src = DefaultBookImg)}
            />
          </div>
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
