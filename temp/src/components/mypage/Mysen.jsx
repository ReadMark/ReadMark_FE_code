import Bookimg from './bookImg.jpg'

function Mysen(){
    return(
        <>
        <div class="my-fa-page-each-container ma-fa-moon-container">      
                <div><img class="main__book-img my-fa-book-img" src={Bookimg} alt="" /></div>
                <div class="my-fa-page_books-texts">
                  <div class="my-fa-page-book-title my-fa-page-moon-title">트로피컬 나이트</div>
                  <div class="my-fa-page-book-text-center">
                    <div class="my-fa-page-moon-text page">p105</div>
                    <div class="my-fa-page-moon-text">이건 확신이야. 내 애정이, 내 목소리가 
                    너에게 어떤 방식으로든 닿을 거라고 믿어.</div>
                  </div>
                  
                  <div class="my-fa-page-moon-date">저장한 날짜: 2025-07-15</div>
                </div>
              </div>
        </>
    )
}

export default Mysen;