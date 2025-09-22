import './mypage.css';
import Header from '../components/Header';
import Mypa from "../components/mypage/Mypa";
import Mysen from '../components/mypage/Mysen';
import ProBlock from '../components/mypage/ProBlock';
import ModalEdit from '../components/ModalEdit';
import ModalEditsen from '../components/ModalEditSentence';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Record from '../components/mypage/record';
import Profile from '../components/mypage/profile'; // 네가 준 Profile 컴포넌트

function Mypage() {
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSentenceModal, setShowSentenceModal] = useState(false);

  const [stats, setStats] = useState(null);
  const [pages, setPages] = useState([]);
  const [sentences, setSentences] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) return;

    const fetchStats = async () => {
      try {
        const res = await axios.get(`http://43.200.102.14:5000/api/image/stats/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("독서 통계 불러오기 실패:", err);
      }
    };

    const fetchPages = async () => {
      try {
        const res = await axios.get(`http://43.200.102.14:5000/api/user/pages/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPages(res.data);
      } catch (err) {
        console.error("즐겨찾기 페이지 불러오기 실패:", err);
      }
    };

    const fetchSentences = async () => {
      try {
        const res = await axios.get(`http://43.200.102.14:5000/api/user/sentences/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSentences(res.data);
      } catch (err) {
        console.error("즐겨찾기 문장 불러오기 실패:", err);
      }
    };

    fetchStats();
    fetchPages();
    fetchSentences();
  }, [token, userId]);

  return (
    <>
      <Header />

      <main className='Mypage-all'>
        <div className="my_top_container">
          {/* 로그인한 계정 프로필 */}
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
          <button className='modify-button' onClick={() => setShowEditButtons(!showEditButtons)}>
            추가하기
          </button>
          <button className='modify-button' onClick={() => setShowEditButtons(!showEditButtons)}>
            삭제하기
          </button>
        </div>

        <div className="my_fa-page-container-container">
          {/* 즐겨찾기 페이지 */}
          <div className="my_fa-page-container">
            <div className="my-fa-page">
              <div className="my_fa-page-title">
                <div className="my-fa-page-title-real">즐겨찾기한 페이지</div>
              </div>
              <div className="my_fa-page-bottom-container">
                {pages.map(page => (
                  <Mypa key={page.id} showEdit={showEditButtons} onEditClick={() => setShowSentenceModal(true)} {...page} />
                ))}
              </div>
            </div>
          </div>

          {/* 즐겨찾기 문장 */}
          <div className="my_fa-page-container my-fa-page-right">
            <div className="my-fa-page">
              <div className="my_fa-page-title">
                <div className="my-fa-page-title-real">즐겨찾기한 문장</div>
              </div>
              <div className="my_fa-page-bottom-container">
                {sentences.map(sentence => (
                  <Mysen key={sentence.id} showEdit={showEditButtons} onEditClick={() => setShowSentenceModal(true)} {...sentence} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 페이지 모달 */}
      {showModal && <ModalEdit onClose={() => setShowModal(false)} />}
      {/* 문장 모달 */}
      {showSentenceModal && <ModalEditsen onClose={() => setShowSentenceModal(false)} />}
    </>
  );
}

export default Mypage;
