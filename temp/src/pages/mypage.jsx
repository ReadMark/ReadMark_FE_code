import React, { useState, useEffect } from "react";
import './mypage.css';
import Header from '../components/Header';
import Mypa from "../components/mypage/Mypa";
import Mysen from '../components/mypage/Mysen';
import ProBlock from '../components/mypage/ProBlock';
import Record from '../components/mypage/record';
import Profile from '../components/mypage/profile';
import ModalEdit from '../components/ModalEdit';
import ModalEditsen from '../components/ModalEditSentence';
import axios from "axios";

function Mypage() {
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSentenceModal, setShowSentenceModal] = useState(false);

  const [stats, setStats] = useState(null);
  const [pages, setPages] = useState(null);
  const [sentences, setSentences] = useState(null);

  // ✅ localStorage에서 토큰과 userId 가져오기
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // 로그인 안 되어있으면 로그인 페이지로 이동
  useEffect(() => {
    if (!token || !userId || userId === "undefined") {
      alert("로그인 후 접근하세요.");
      window.location.href = "/login";
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get(`http://43.200.102.14:5000/api/image/stats/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Stats fetch error:", err);
      }
    };

    const fetchPages = async () => {
      try {
        const res = await axios.get(`http://43.200.102.14:5000/api/mypage/user/${userId}/favorite-pages`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPages(res.data.success ? res.data.favoritePages : []);
      } catch (err) {
        console.error("Pages fetch error:", err);
        setPages([]);
      }
    };

    const fetchSentences = async () => {
      try {
        const res = await axios.get(`http://43.200.102.14:5000/api/mypage/user/${userId}/favorite-quotes`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSentences(res.data.success ? res.data.favoriteQuotes : []);
      } catch (err) {
        console.error("Sentences fetch error:", err);
        setSentences([]);
      }
    };

    fetchStats();
    fetchPages();
    fetchSentences();
  }, [token, userId]);

  const refreshPages = async () => {
    if (!token || !userId || userId === "undefined") return;
    try {
      const res = await axios.get(`http://43.200.102.14:5000/api/mypage/user/${userId}/favorite-pages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPages(res.data.success ? res.data.favoritePages : []);
    } catch (err) {
      console.error("Refresh pages error:", err);
      setPages([]);
    }
  };

  const refreshSentences = async () => {
    if (!token || !userId || userId === "undefined") return;
    try {
      const res = await axios.get(`http://43.200.102.14:5000/api/mypage/user/${userId}/favorite-quotes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSentences(res.data.success ? res.data.favoriteQuotes : []);
    } catch (err) {
      console.error("Refresh sentences error:", err);
      setSentences([]);
    }
  };

  const handleDeletePage = async (favPageId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    if (!token || !userId || userId === "undefined") return;
    try {
      const res = await axios.delete(`http://43.200.102.14:5000/api/mypage/favorite-page/${favPageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setPages(prev => prev.filter(p => p.favPageId !== favPageId));
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  const handleDeleteSentence = async (favQuoteId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    if (!token || !userId || userId === "undefined") return;
    try {
      const res = await axios.delete(`http://43.200.102.14:5000/api/mypage/favorite-quote/${favQuoteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setSentences(prev => prev.filter(s => s.favQuoteId !== favQuoteId));
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  return (
    <>
      <Header />
      <main className='Mypage-all'>
        <div className="my_top_container">
          <Profile />
          <div className="my_top-right-container">
            <ProBlock title="최대 연속으로" day="읽은 날 수" count={stats?.readingStreak || 0}/>
            <ProBlock title="총 모은" day="도장 개수" count={stats?.totalBooks || 0}/>
            <ProBlock title="총 읽은 날 수" count={stats?.totalDays || 0}/>
          </div>
        </div>

        <div className="my_center-container">
          <Record title="읽고 있는 책" count={stats?.readingBooks || 0}/>
          <Record title="읽고 싶은 책" count={stats?.wishlistBooks || 0}/>
          <Record title="다 읽은 책" count={stats?.finishedBooks || 0}/>
        </div>

        <div className='button-container'>
          <button className='modify-button' onClick={() => setShowModal(true)}>즐겨찾기 페이지 추가</button>
          <button className='modify-button' onClick={() => setShowSentenceModal(true)}>즐겨찾기 문장 추가</button>
          <button className='modify-button' onClick={() => setShowEditButtons(!showEditButtons)}>삭제하기</button>
        </div>

        <div className="my_fa-page-container-container">
          <div className="my_fa-page-container">
            <div className="my-fa-page-title-real">즐겨찾기한 페이지</div>
            <div className="my_fa-page-bottom-container page-grid">
              {pages === null ? <p>페이지 로딩 중...</p> :
                pages.length === 0 ? <p>즐겨찾기한 페이지가 없습니다.</p> :
                pages.map(page => (
                  <Mypa
                    key={page.favPageId}
                    favPageId={page.favPageId}
                    title={page.bookTitle}
                    pageNumber={page.pageNumber}
                    bookImage={page.coverImageUrl}
                    createdAt={page.createdAt}
                    showEdit={showEditButtons}
                    onDelete={handleDeletePage}
                  />
                ))
              }
            </div>
          </div>

          <div className="my_fa-page-container my-fa-page-right">
            <div className="my-fa-page-title-real">즐겨찾기한 문장</div>
            <div className="my_fa-page-bottom-container sentence-grid">
              {sentences === null ? <p>문장 로딩 중...</p> :
                sentences.length === 0 ? <p>즐겨찾기한 문장이 없습니다.</p> :
                sentences.map(sentence => (
                  <Mysen
                    key={sentence.favQuoteId}
                    id={sentence.favQuoteId}
                    sentence={sentence.content}
                    showEdit={showEditButtons}
                    onDelete={handleDeleteSentence}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </main>

      {showModal && <ModalEdit onClose={() => setShowModal(false)} refreshPages={refreshPages} />}
      {showSentenceModal && <ModalEditsen onClose={() => setShowSentenceModal(false)} refreshSentences={refreshSentences} />}
    </>
  );
}

export default Mypage;
