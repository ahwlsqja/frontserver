import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/home';
import Upload from './pages/upload';
import CreateModel from './pages/create-model';
import OneModel from './pages/onemodel';

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';
  const loggedInUser = localStorage.getItem('loggedInUser');

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 w-full z-50">
      <h1 className="text-2xl font-bold">
        {isHomePage ? (
          <Link to="/home" className="text-white">CareCall</Link>
        ) : (
          <span className="text-white">CareCall</span>
        )}
      </h1>

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
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/create-model" element={<CreateModel />} />
          <Route path="/onemodel/:id" element={<OneModel />} /> {/* 모델 ID를 포함한 경로 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
