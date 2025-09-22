// Mypage.js
import './mypage.css';
import Header from '../components/Header';
import Mypa from "../components/mypage/Mypa";
import Profile from "../components/mypage/profile";
import Record from '../components/mypage/record';
import ProBlock from '../components/mypage/ProBlock';
import Mysen from '../components/mypage/Mysen';
import React, { useState } from "react";

function Mypage() {
  const [showEditButtons, setShowEditButtons] = useState(false);

  return (
    <>
      <Header />
      <main className='Mypage-all'>
        <div className="my_top_container">
          <Profile />
          <div className="my_top-right-container">
            <ProBlock title="최대 연속으로" day="읽은 날 수" count="10일"/>
            <ProBlock title="총 모은" day="도장 개수" count="10개"/>
            <ProBlock title="총 읽은 날 수" count="10일"/>
          </div>
        </div>

        <div className="my_center-container">
          <Record title="읽고 있는 책" count="5권"/>
          <Record title="읽고 싶은 책" count="5권"/>
          <Record title="다 읽은 책" count="5권"/>
        </div>

        {/* 수정하기 버튼 */}
        <button 
          className='modify-button' 
          onClick={() => setShowEditButtons(!showEditButtons)}
        >
          수정하기
        </button>

        <div className="my_fa-page-container-container">
          <div className="my_fa-page-container">
            <div className="my-fa-page">
              <div className="my_fa-page-title">
                <div className="my-fa-page-title-real">
                  즐겨찾기한 페이지
                </div>
              </div>

              <div className="my_fa-page-bottom-container">
                <Mypa showEdit={showEditButtons} />
                <Mypa showEdit={showEditButtons} />
                <Mypa showEdit={showEditButtons} />
                <Mypa showEdit={showEditButtons} />
              </div>

              <div className="my_fa-page-bottom-container">
                <Mypa showEdit={showEditButtons} />
                <Mypa showEdit={showEditButtons} />
                <Mypa showEdit={showEditButtons} />
                <Mypa showEdit={showEditButtons} />
              </div>
            </div>
          </div>

          <div className="my_fa-page-container my-fa-page-right">
            <div className="my-fa-page">
              <div className="my_fa-page-title">
                <div className="my-fa-page-title-real">
                  즐겨찾기한 문장
                </div>
              </div>

              <div className="my_fa-page-bottom-container">
                <Mysen showEdit={showEditButtons} />
              </div>

              <div className="my_fa-page-bottom-container">
                <Mysen showEdit={showEditButtons} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Mypage;
