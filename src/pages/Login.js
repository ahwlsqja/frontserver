import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 오류 메시지 상태 추가

  const handleLogin = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    const token = btoa(`${email}:${password}`);

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {}, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      });

      // 로그인 성공 시 토큰을 localStorage에 저장
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      navigate('/home');
    } catch (error) {
      // 오류 처리
      if (error.response) {
        // 서버가 응답을 했지만 오류 코드가 2xx가 아닐 때
        setError('로그인 정보가 잘못되었습니다.'); // 사용자에게 보여줄 메시지
      } else if (error.request) {
        // 요청이 이루어졌지만 응답을 받지 못한 경우
        setError('서버에 연결할 수 없습니다.'); // 사용자에게 보여줄 메시지
      } else {
        // 오류가 발생한 이유
        setError('로그인 중 오류가 발생했습니다.'); // 사용자에게 보여줄 메시지
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-10 bg-white rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-4">환영합니다</h2>
        <p className="text-gray-600 mb-8">계정 로그인하기</p>
        
        {/* 오류 메시지 표시 */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6 w-full">
          <div>
            <label className="block mb-1 text-lg font-medium">이메일주소</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 w-full rounded"
            />
          </div>
          
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 w-full rounded"
          />
          
          <div className="flex items-center mt-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm">Remember for 30 days</label>
          </div>
          
          <button type="submit" className="bg-green-700 text-white px-4 py-3 rounded-full w-full font-semibold mt-4">
            Login
          </button>
        </form>
        
        <p className="mt-8 text-center">
          계정을 잊으셨나요? <a href="/signup" className="text-blue-600 underline">회원가입</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
