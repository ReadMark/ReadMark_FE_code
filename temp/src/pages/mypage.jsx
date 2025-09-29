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
import DefaultBookImg from '../assets/bookImg.jpg';

function Mypage() {
  const [showModal, setShowModal] = useState(false);
  const [showSentenceModal, setShowSentenceModal] = useState(false);
  const [editingSentence, setEditingSentence] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);

  const [stats, setStats] = useState(null);
  const [pages, setPages] = useState(null);
  const [sentences, setSentences] = useState(null);

  const token = localStorage.getItem("token");
  const rawUserId = localStorage.getItem("userId");
  const userId = rawUserId ? rawUserId.replace(/^["']+|["']+$/g, "").trim() : rawUserId;

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.replace("/login"); // 뒤로가기 방지
  };

  useEffect(() => {
    if (!token || !userId || userId === "undefined") {
      alert("로그인 후 접근하세요.");
      window.location.replace("/login"); // 뒤로가기 방지
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get(`http://43.200.102.14:5000/api/mypage/user/${userId}/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setStats({
            readingStreak: res.data.stats.maxConsecutiveDays,
            totalBooks: res.data.stats.totalStamps,
            totalDays: res.data.stats.totalReadingDays,
            readingBooks: res.data.stats.nowReadingCount,
            wishlistBooks: res.data.stats.wannaReadCount,
            finishedBooks: res.data.stats.readDoneCount
          });
        }
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

  const refreshSentences = async (newSentence) => {
    if (newSentence) {
      setSentences(prev => prev ? [...prev, newSentence] : [newSentence]);
      return;
    }
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

        <div className='button-containers'>
          <button className='modify-button' onClick={() => setShowModal(true)}>페이지 추가</button>
          <button className='modify-button' onClick={() => { setEditingSentence(null); setShowSentenceModal(true); }}>문장 추가</button>
          <button className='modify-button' onClick={() => setDeleteMode(prev => !prev)}>
            {deleteMode ? "확인" : "삭제"}
          </button>
        </div>

        <div className="my_fa-page-container-container">
          <div className="my_fa-page-container">
            <div className="my-fa-page-title-real">즐겨찾기한 페이지</div>
            <div className="my_fa-page-bottom-container page-grid">
              {pages === null ? <p>페이지 로딩 중...</p> :
                pages.length === 0 ? <div className="riri">즐겨찾기한 페이지가 없습니다.</div> :
                pages.map(page => (
                  <Mypa
                    key={page.favPageId}
                    favPageId={page.favPageId}
                    title={page.bookTitle}
                    pageNumber={page.pageNumber}
                    bookImage={page.coverImageUrl || DefaultBookImg}
                    createdAt={page.createdAt}
                    deleteMode={deleteMode}
                    onDelete={handleDeletePage}
                    onEditClick={() => {/* 필요시 수정 */}}
                  />
                ))
              }
            </div>
          </div>

         <div className="my_fa-page-container my-fa-page-right">
          <div className="my-fa-page-title-real">즐겨찾기한 문장</div>
          <div className="my_fa-page-bottom-container sentence-grid">
            {sentences === null ? (
              <p>문장 로딩 중...</p>
            ) : sentences.length === 0 ? (
              <div className="riri">즐겨찾기한 문장이 없습니다.</div>
            ) : (
              sentences
                .filter(sentence => sentence && sentence.favQuoteId)
                .map(sentence => (
                  <Mysen
                    key={sentence.favQuoteId}
                    sentenceData={sentence}
                    showEdit={false}
                    deleteMode={deleteMode}
                    onDelete={handleDeleteSentence}
                    onEditClick={(data) => {
                      setEditingSentence(data);
                      setShowSentenceModal(true);
                    }}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </main>

    {showModal && <ModalEdit onClose={() => setShowModal(false)} refreshPages={refreshPages} />}
    {showSentenceModal &&
      <ModalEditsen
        onClose={() => { setShowSentenceModal(false); setEditingSentence(null); }}
        setSentences={setSentences} 
        favQuote={editingSentence}
      />
    }
  </>
  );
}

export default Mypage;
