import './bookState.css';

function BookStated() {
  return (
    <main>
      <div className="main__books">
        <div className="main__books-state-container">
          <div className="main__books-state">지금 읽고 있는 책</div>
          <div className="main__books-state">읽고 싶은 책</div>
          <div className="main__books-state now">다 읽은 책</div>
        </div>
      </div>

      <div className="main__line-container">
        <div className="main__line"></div>
      </div>
    </main>
  );
}

export default BookStated;
