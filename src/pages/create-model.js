import React, { useState } from 'react';
import axios from 'axios';

function CreateModel() {
  const [detail, setDetail] = useState('');
  const [modelPhones, setModelPhones] = useState(['']); // 전화번호를 저장할 배열
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [responseData, setResponseData] = useState(null); // 서버 응답 데이터 저장

  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...modelPhones];
    updatedPhones[index] = value;
    setModelPhones(updatedPhones);
  };

  const handleAddPhone = () => {
    if (modelPhones.length < 3) {
      setModelPhones([...modelPhones, '']);
    }
  };

  const handleRemovePhone = (index) => {
    const updatedPhones = modelPhones.filter((_, i) => i !== index);
    setModelPhones(updatedPhones);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    const token = localStorage.getItem('accessToken');
    // 데이터 유효성 검사
    const phonePattern = /^010-\d{4}-\d{4}$/;
    for (const phone of modelPhones) {
      if (!phonePattern.test(phone)) {
        setError('전화번호는 010-xxxx-xxxx 형식이어야 합니다.');
        return;
      }else{
        try {
          const response = await axios.post('http://localhost:3000/models', {
            detail,
            modelPhones,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          setSuccess('모델이 성공적으로 생성되었습니다.');
          setResponseData(response.data); // 서버 응답 데이터 저장
          console.log(response.data);
        } catch (err) {
          console.error('모델 생성 중 오류 발생:', err);
          setError('모델 생성 중 오류가 발생했습니다.',err);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">모델 생성</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">세부사항</label>
          <input
            type="text"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        {modelPhones.map((phone, index) => (
          <div key={index} className="flex mb-4">
            <input
              type="text"
              value={phone}
              onChange={(e) => handlePhoneChange(index, e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="전화번호 (예: 010-1234-5678)"
              required
            />
            <button
              type="button"
              onClick={() => handleRemovePhone(index)}
              className="ml-2 bg-red-500 text-white rounded px-4 py-2"
              disabled={modelPhones.length <= 1}
            >
              삭제
            </button>
          </div>
        ))}
        {modelPhones.length < 3 && (
          <button
            type="button"
            onClick={handleAddPhone}
            className="bg-blue-500 text-white rounded px-4 py-2 mb-4"
          >
            + 전화번호 추가
          </button>
        )}
        <button type="submit" className="bg-green-500 text-white rounded px-4 py-2">
          생성하기
        </button>
      </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && (
          <div className="text-green-500 mt-4">
            <p>{success}</p>
            {responseData && (
              <div>
                <h2 className="font-bold">생성된 모델 정보:</h2>
                <p>모델 ID: {responseData.id}</p>
                <p>세부사항: {responseData.detail.detail}</p>
                <p>전화번호: {responseData.detail.modelPhones.map(phone => phone.phone).join(', ')}</p>
              </div>
            )}
          </div>
        )}
    </div>
  );
}

export default CreateModel;
