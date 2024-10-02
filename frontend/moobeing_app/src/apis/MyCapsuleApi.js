import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

console.log('Using BASE_URL:', BASE_URL);

// 더미 데이터
const dummyData = [
  {
    id: 1,
    date: '9월 12일',
    title: '참순불가마',
    amount: '30,000',
    imageUrl: 'https://github.com/user-attachments/assets/ca076534-070a-441b-b270-f65740b6c35f',
    iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9',
    content: '오늘 포동포동한 소풍을 갔다.\n국밥중앙 박물관 오픈런을 하였다.'
  },
  {
    id: 2,
    date: '9월 10일',
    title: '스타벅스',
    amount: '15,000',
    imageUrl: 'https://github.com/user-attachments/assets/5e71b0fe-31ea-4e10-a7a4-39efe92edf8e',
    iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9',
    content: '친구와 함께 커피를 마셨다.\n새로 나온 메뉴를 시도해 보았다.'
  },
  {
    id: 3,
    date: '9월 8일',
    title: '영화관',
    amount: '25,000',
    imageUrl: 'https://github.com/user-attachments/assets/03dd01fd-9e46-4c9f-b411-be78e72fd4e3',
    iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9',
    content: '오랜만에 영화를 보러 갔다.\n팝콘과 콜라도 함께 즐겼다.'
  }
];

// 특정 년월의 캡슐 정보 가져오기
export const getCapsulesByYearMonth = async (year, month) => {
  try {
    // API 호출을 시뮬레이션하기 위한 지연
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`${year}년 ${month}월의 캡슐 정보를 가져옵니다.`);
    return dummyData;
  } catch (error) {
    console.error("캡슐 정보 불러오기 실패:", error);
    throw error;
  }
};

// 전체 캡슐 정보 가져오기
export const getAllCapsules = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log("전체 캡슐 정보를 가져옵니다.");
    return dummyData;
  } catch (error) {
    console.error("전체 캡슐 정보 불러오기 실패:", error);
    throw error;
  }
};

// 새 캡슐 추가하기
export const addNewCapsule = async (capsuleData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log("새 캡슐을 추가합니다:", capsuleData);
    return { ...capsuleData, id: dummyData.length + 1 };
  } catch (error) {
    console.error("새 캡슐 추가 실패:", error);
    throw error;
  }
};

// 캡슐 정보 수정하기
export const updateCapsule = async (capsuleId, updatedData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`캡슐 ID ${capsuleId}의 정보를 수정합니다:`, updatedData);
    return { ...updatedData, id: capsuleId };
  } catch (error) {
    console.error("캡슐 정보 수정 실패:", error);
    throw error;
  }
};

// 캡슐 삭제하기
export const deleteCapsule = async (capsuleId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`캡슐 ID ${capsuleId}를 삭제합니다.`);
    return { success: true, message: "캡슐이 성공적으로 삭제되었습니다." };
  } catch (error) {
    console.error("캡슐 삭제 실패:", error);
    throw error;
  }
};

// 캡슐 상세 정보 가져오기
export const getCapsuleDetail = async (capsuleId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const capsule = dummyData.find(item => item.id === capsuleId);
    if (capsule) {
      console.log(`캡슐 ID ${capsuleId}의 상세 정보를 가져옵니다.`);
      return capsule;
    } else {
      throw new Error("캡슐을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("캡슐 상세 정보 불러오기 실패:", error);
    throw error;
  }
};
