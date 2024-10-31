import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function OneModel() {
  const { id } = useParams(); // URL에서 ID 가져오기
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동
  const [model, setModel] = useState(null); // 모델 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const fetchModel = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/models/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('모델 데이터:', response.data); // API 응답 확인
        setModel(response.data); // 모델 데이터 저장
      } catch (err) {
        console.error('모델 데이터를 가져오는 데 오류가 발생했습니다.', err);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchModel();
  }, [id]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!model) {
    return <p>모델을 찾을 수 없습니다.</p>;
  }

  const handleModify = () => {
    // 수정 페이지로 이동, ID를 URL 파라미터로 전달
    navigate(`/modelmodify/${model.id}`, { state: { model: model.detail } });
  };

  const handleUpload = () => {
    // 업로드 페이지로 이동
    navigate(`/upload/${model.id}`);
  };

  const handleVoiseUpload = () => {
    navigate(`/voiseupload/${model.id}`)
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-20">
      <h1 className="text-2xl font-bold text-center">{model.detail.detail}</h1>
      <p className="text-center">전화번호: {model.detail.modelPhones.map(phone => phone.phone).join(', ')}</p>
      <p className="text-center">생성날짜: {new Date(model.createdAt).toLocaleString()}</p>
      <p className="text-center">업데이트 날짜: {new Date(model.updatedAt).toLocaleString()}</p>
      <div className="mt-4">
        <button onClick={handleModify} className="bg-blue-500 text-white px-4 py-2 rounded">
          수정하기
        </button>
        <button onClick={handleUpload} className="ml-4 bg-green-500 text-white px-4 py-2 rounded">
          음성 대화 파일 업로드
        </button>
        <button onClick={handleVoiseUpload} className='ml-4 bg-green-500 text-white px-4 py-2 rounded'>
          음성 파일 업로드
        </button>
      </div>
    </div>
  );
}

export default OneModel;
