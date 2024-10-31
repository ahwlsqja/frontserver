import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [models, setModels] = useState([]); // 모델 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUserName(loggedInUser);
    }
    const token = localStorage.getItem('accessToken');

    // 모델 데이터 가져오기
    const fetchModels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/models', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setModels(response.data); // 모델 데이터 저장
      } catch (err) {
        console.error('모델 데이터를 가져오는 데 오류가 발생했습니다.', err);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchModels();
  }, []);

  const handleIconClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  const handleCreateModel = () => {
    navigateTo('/create-model'); // 모델 생성 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      <header className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between bg-black text-white w-full z-50 shadow-md">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigateTo('/home')}>
          CareVerse
        </div>
        <div className="flex items-center space-x-6">
          <span className="cursor-pointer hover:underline text-white" onClick={() => navigateTo('/create-model')}>
            모델 생성
          </span>
          {userName && (
            <div className="text-white">
              {userName} (로그인 중)
            </div>
          )}
        </div>
        {userName && (
          <div className="relative">
            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-semibold cursor-pointer" onClick={handleIconClick}>
              {userName.charAt(0).toUpperCase()}
            </div>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2">
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">개인 정보 수정</button>
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleLogout}>로그아웃</button>
              </div>
            )}
          </div>
        )}
      </header>
      <div className="pt-20 w-full flex flex-wrap justify-center">
        {loading && <p className="text-gray-500">로딩 중...</p>}
        {models.length > 0 ? (
          models.map((model) => (
            <div key={model.id} className="m-4 border rounded-lg p-4 shadow-lg w-64 bg-white transition-transform transform hover:scale-105">
              <h2 
                className="font-bold text-lg cursor-pointer text-blue-600 hover:underline" 
                onClick={() => navigateTo(`/onemodel/${model.id}`)} // 클릭 시 모델 ID를 포함하여 이동
              >
                {model.detail.detail}
              </h2>
              <p className="text-gray-600">허용된 전화번호: {model.detail.modelPhones[0]?.phone}</p>
              <p className="text-gray-500">업데이트 날짜: {new Date(model.updatedAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-gray-600">모델이 없습니다. 모델을 생성하시겠습니까?</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
              onClick={handleCreateModel}
            >
              모델 생성
            </button>
          </div>
        )}
      </div>
      {/* 안내 메시지 추가 */}
      <div className="text-center mt-4">
        <h2 className="text-lg font-semibold">모델을 수정하거나 음성, 음성 대화 데이터를 업로드 학습하려면 각 박스를 클릭해주세요.</h2>
      </div>
    </div>
  );
}

export default Home;
