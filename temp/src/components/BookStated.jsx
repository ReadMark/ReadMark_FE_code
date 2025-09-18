import './bookState.css';
import { Link } from 'react-router-dom';

function BookStated() {
  return (
    <main>
      <div className="main__books">
        <div className="main__books-state-container">
          <Link className="main__books-state" to="/">지금 읽고 있는 책</Link>
          <Link className="main__books-state" to="/want">읽고 싶은 책</Link>
          <Link className="main__books-state now" to="/done">다 읽은 책</Link>
        </div>
      </div>

      <div className="main__line-container">
        <div className="main__line"></div>
      </div>
    </main>
  );
}

export default BookStated;
