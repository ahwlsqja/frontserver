import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

function ModelModify() {
  const { id } = useParams(); // URL에서 ID 가져오기
  const location = useLocation();
  const { model } = location.state; // 전달된 모델 데이터

  const [formData, setFormData] = useState({
    detail: model.detail,
    modelPhones: model.modelPhones.map(phone => phone.phone), // 전화번호 배열 초기화
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPhone = () => {
    if (formData.modelPhones.length < 3) {
      setFormData(prev => ({
        ...prev,
        modelPhones: [...prev.modelPhones, ''], // 새로운 빈 전화번호 추가
      }));
    }
  };

  const handleRemovePhone = (index) => {
    const newPhones = formData.modelPhones.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      modelPhones: newPhones,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      const response = await axios.patch(`http://localhost:3000/models/${id}`, {
        detail: formData.detail,
        modelPhones: formData.modelPhones,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('모델 수정 성공:', response.data);
      // 수정이 완료된 후 다른 페이지로 이동하거나 안내 메시지를 표시할 수 있습니다.
    } catch (err) {
      console.error('모델 수정 중 오류 발생:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">모델 수정</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mt-4">
          <label>상세 정보:</label>
          <input
            type="text"
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mt-4">
          <label>전화번호:</label>
          {formData.modelPhones.map((phone, index) => (
            <div key={index} className="mt-2 flex items-center">
              <input
                type="text"
                name={`phone-${index}`}
                value={phone}
                onChange={(e) => {
                  const newPhones = [...formData.modelPhones];
                  newPhones[index] = e.target.value;
                  setFormData(prev => ({ ...prev, modelPhones: newPhones }));
                }}
                required
                className="border p-2 rounded w-full"
              />
              {formData.modelPhones.length > 1 && ( // 최소 1개 이상일 때만 삭제 버튼 표시
                <button 
                  type="button" 
                  onClick={() => handleRemovePhone(index)} 
                  className="ml-2 text-red-500"
                >
                  삭제
                </button>
              )}
            </div>
          ))}
          {formData.modelPhones.length < 3 && ( // 전화번호가 3개 미만일 때만 추가 버튼 표시
            <button 
              type="button" 
              onClick={handleAddPhone} 
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              전화번호 추가
            </button>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">
          수정하기
        </button>
      </form>
    </div>
  );
}

export default ModelModify;
