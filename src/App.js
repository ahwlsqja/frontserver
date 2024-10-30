import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/home';
import Upload from './pages/upload';
import CreateModel from './pages/create-model'

function Header() {
  // 현재 페이지의 경로 정보를 얻기 위해 useLocation 훅을 사용
  const location = useLocation();

  // 현재 경로가 "/home" 인지 여부를 확인
  const isHomePage = location.pathname === '/home';

  // 로컬 스토리지에서 로그인된 사용자 정보를 가져옴
  const loggedInUser = localStorage.getItem('loggedInUser');

  return (
    // 헤더 섹션 스타일링과 레이아웃 설정
    <header className="bg-black text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 w-full z-50">
      <h1 className="text-2xl font-bold">
        {/* 현재 경로가 "/home" 인 경우, "CareCall" 링크를 제공 */}
        {location.pathname === '/home' ? (
          <Link to="/home" className="text-white">CareCall</Link>
        ) : (
          <span className="text-white">CareCall</span>
        )}
      </h1>

      {/* 현재 경로가 홈이 아니고, 로그인된 사용자가 없는 경우에만 네비게이션 링크 표시 */}
      {!isHomePage && !loggedInUser && (
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/signup">가입하기</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        {/* 헤더 컴포넌트 추가 */}
        <Header />

        {/* 라우트 설정: 각 경로에 맞는 컴포넌트를 렌더링 */}
        <Routes>
          {/* 회원가입 페이지 경로 */}
          <Route path="/signup" element={<SignUp />} />
          
          {/* 로그인 페이지 경로 */}
          <Route path="/login" element={<Login />} />

          {/* 홈 페이지 경로 */}
          <Route path="/home" element={<Home />} />

          {/* 음성 업로드 페이지 경로 */}
          <Route path="/upload" element={<Upload />} />

          {/* 모델 생성 페이지 경로 */}
          <Route path="/create-model" element={<CreateModel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
