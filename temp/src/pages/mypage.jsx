import './mypage.css';
import Header from '../components/Header';
import Mypa from "../components/mypage/Mypa";
import Profile from "../components/mypage/profile";
import Record from '../components/mypage/record';
import ProBlock from '../components/mypage/ProBlock';
import Mysen from '../components/mypage/Mysen';
import Book from '../components/Book-each';

function Mypage() {
  return (
    <>

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


    <div className="my_fa-page-container-container">

    <div className="my_fa-page-container">
      <div className="my-fa-page">
        <div className="my_fa-page-title">
          <div className="my-fa-page-title-real">
            즐겨찾기한 페이지
          </div>
        </div>

        <div className="my_fa-page-bottom-container">
          <Mypa />
          <Mypa />
          <Mypa />
          <Mypa />
        </div>

        <div className="my_fa-page-bottom-container">
          <Mypa />
          <Mypa />
          <Mypa />
          <Mypa />
        </div>
        
      </div>
    </div>


      <div class="my_fa-page-container my-fa-page-right">
        <div class="my-fa-page">
          <div class="my_fa-page-title">
            <div class="my-fa-page-title-real">
              즐겨찾기한 문장
            </div>
          </div>

          <div class="my_fa-page-bottom-container">
            <Mysen />
          </div>

          <div class="my_fa-page-bottom-container">
            <Mysen />
          </div>

      </div>
      </div>
    </div>
    </main>
    </>
  );
}

export default Mypage;
