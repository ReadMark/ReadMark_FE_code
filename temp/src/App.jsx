import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import MainPage from './pages/Mainpage.jsx';
import Mypage from './pages/Mypage.jsx';
import WantPage from './pages/want.jsx';
import DonePage from './pages/done.jsx';
import Join from './pages/Join.jsx';
import Login from './pages/login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/want" element={<WantPage />} />
        <Route path="/done" element={<DonePage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

