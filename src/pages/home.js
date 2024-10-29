import React, { useEffect, useState } from 'react';

function Home() {
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <header className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between bg-black text-white w-full z-50">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigateTo('/home')}>
          CareCall
        </div>
        <div className="flex space-x-6">
          <span
            className="cursor-pointer hover:underline text-white"
            onClick={() => navigateTo('/Upload')}
          >
            음성 업로드
          </span>
          <span
            className="cursor-pointer hover:underline text-white"
            onClick={() => navigateTo('/create-model')}
          >
            모델 만들기
          </span>
          <span
            className="cursor-pointer hover:underline text-white"
            onClick={() => navigateTo('/generate-model')}
          >
            모델 생성
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
      <div className="pt-20">
        <h1 className="text-3xl font-bold mb-6">환영합니다! 홈 페이지입니다.</h1>
      </div>
    </div>
  );
}

export default Home;
