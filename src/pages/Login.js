import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // 페이지 이동을 위한 useNavigate 훅을 사용하여 navigate 함수 생성
  const navigate = useNavigate();

  // 이메일과 비밀번호 상태를 관리하기 위한 useState 훅 사용
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 폼 제출 시 호출되는 함수
  const handleLogin = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    // localStorage에서 저장된 사용자 데이터를 가져옴
    const savedUser = JSON.parse(localStorage.getItem('user'));

    // 입력된 이메일과 비밀번호가 저장된 사용자 정보와 일치하는지 확인
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      // 로그인된 사용자 이름을 localStorage에 저장
      localStorage.setItem('loggedInUser', savedUser.name);
      
      // 로그인 성공 후 홈 페이지로 이동
      navigate('/home');
    } else {
      // 이메일 또는 비밀번호가 일치하지 않을 경우 경고 메시지 표시
      alert('Invalid email or password');
    }
  };

  return (
    // 중앙 정렬을 위해 flex와 min-height 설정
    <div className="flex items-center justify-center min-h-screen">
      {/* 로그인 폼 컨테이너 */}
      <div className="w-full max-w-lg p-10 bg-white rounded-lg shadow-md flex flex-col items-center">
        {/* 로그인 제목 */}
        <h2 className="text-4xl font-bold mb-4">Welcome back!</h2>
        {/* 로그인 설명 텍스트 */}
        <p className="text-gray-600 mb-8">Enter your Credentials to access your account</p>
        
        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-6 w-full">
          {/* 이메일 입력 필드 */}
          <div>
            <label className="block mb-1 text-lg font-medium">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 w-full rounded"
            />
          </div>
          
          {/* 비밀번호 입력 필드 */}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 w-full rounded"
          />
          
          {/* "기억하기" 체크박스 */}
          <div className="flex items-center mt-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm">Remember for 30 days</label>
          </div>
          
          {/* 로그인 버튼 */}
          <button type="submit" className="bg-green-700 text-white px-4 py-3 rounded-full w-full font-semibold mt-4">
            Login
          </button>
        </form>
        
        {/* 회원가입 링크 */}
        <p className="mt-8 text-center">
          Don't have an account? <a href="/signup" className="text-blue-600 underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
