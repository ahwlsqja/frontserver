import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VoiseUpload() {
  const { id } = useParams(); // URL에서 ID 가져오기
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUserName(loggedInUser);
    }
  }, []);

  const handleIconClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  // 커스텀 보이스 추가 버튼 클릭 시 호출되는 함수
  const handleAddCustomVoice = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('업로드된 파일:', file);
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await axios.post(`http://localhost:3000/models/voisedata/${id}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('파일 업로드 성공:', response.data);
      } catch (error) {
        console.error('파일 업로드에 실패했습니다:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <header className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between bg-black text-white w-full z-50">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigateTo('/home')}>
          CareVerse
        </div>
        <div className="flex space-x-6">
          <span className="cursor-pointer hover:underline text-white" onClick={() => navigateTo('/home')}>
            돌아가기
          </span>
        </div>
        {userName && (
          <div className="relative">
            <div
              className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-semibold cursor-pointer"
              onClick={handleIconClick}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2">
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                  개인 정보 수정
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </header>
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="border-2 border-purple-500 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
          onClick={handleAddCustomVoice}
        >
          <p className="text-xl text-purple-500 mb-4">학습 시킬 목소리를 업로드 해주세요</p>
          <p className="text-4xl text-purple-500">+</p>
        </div>
        {/* 파일 입력 요소 (숨김 처리) */}
        <input
          type="file"
          accept="audio/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      {/* 돌아가기 버튼 추가 */}
      <div className="mt-4">
        <button
          onClick={() => navigateTo('/home')} // 홈으로 돌아가기
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}

export default VoiseUpload;
