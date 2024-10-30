import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 오류 메시지 상태 추가

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Basic Auth 형식으로 토큰 생성
    const token = btoa(`${email}:${password}`);

    try {
      // 서버에 회원가입 요청 보내기
      const response = await axios.post('http://localhost:3000/auth/register', {}, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      });

      // 회원가입 성공 시
      alert('Sign up successful! Please log in.');
      navigate('/login'); // 로그인 페이지로 이동
    } catch (error) {
      // 오류 처리
      if (error.response) {
        // 서버가 응답을 했지만 오류 코드가 2xx가 아닐 때
        setError('이미 가입한 이메일입니다!'); // 사용자에게 보여줄 메시지
      } else if (error.request) {
        // 요청이 이루어졌지만 응답을 받지 못한 경우
        setError('서버에 연결할 수 없습니다.'); // 사용자에게 보여줄 메시지
      } else {
        // 오류가 발생한 이유
        setError('회원가입 중 오류가 발생했습니다.'); // 사용자에게 보여줄 메시지
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Get Started Now</h2>
        
        {/* 오류 메시지 표시 */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">이름</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">이메일 주소</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">비밀번호</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 w-full rounded"
              required
            />
          </div>
          <button type="submit" className="bg-green-700 text-white px-4 py-3 rounded-full w-full font-semibold">
            Signup
          </button>
        </form>
        <p className="mt-6 text-center">
          계정이 이미 있으신가요? <a href="/login" className="text-blue-600 underline">로그인</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
