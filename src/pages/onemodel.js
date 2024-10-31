import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OneModel() {
  const { id } = useParams(); // URL에서 ID 가져오기
  console.log('모델 ID:', id); // ID 확인
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

  return (
    <div className="p-4 mt-20"> {/* mt-20 추가 */}
      <h1 className="text-2xl font-bold">{model.detail.detail}</h1>
      <p>전화번호: {model.detail.modelPhones.map(phone => phone.phone).join(', ')}</p>
      <p>생성날짜: {new Date(model.createdAt).toLocaleString()}</p>
      <p>업데이트 날짜: {new Date(model.updatedAt).toLocaleString()}</p>
    </div>
  );
  
}

export default OneModel;
