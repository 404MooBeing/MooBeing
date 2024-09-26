import axios from "axios";

// CRA와 Vite 모두에서 동작하도록 환경 변수 접근
const BASE_URL = process.env.REACT_APP_BASE_URL || import.meta.env?.VITE_APP_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

console.log('Using BASE_URL:', BASE_URL);

// 더미 데이터
const dummyAlarms = [
  { id: 1, title: 'MooBTI 학인', message: '이번 달 소비내역 분석을 할 수 있어요', time: '15시간 전', iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9' },
  { id: 2, title: '금융 상식 퀴즈 생성', message: '오늘의 금융 상식 퀴즈를 맞춰보세요.', time: '17일전', iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9' },
  { id: 3, title: '금융 퀴즈 생성', message: '저번 달 소비에 대한 퀴즈를 맞춰보세요.', time: '2일전', iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9' },
  { id: 4, title: '타임 무 알림', message: '김나에서 심은 타임무를 수확할 시간이에요', time: '6일전', iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9' },
  { id: 1, title: 'MooBTI 학인', message: '이번 달 소비내역 분석을 할 수 있어요', time: '15시간 전', iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9' },
  { id: 2, title: '금융 상식 퀴즈 생성', message: '오늘의 금융 상식 퀴즈를 맞춰보세요.', time: '17일전', iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9' },
  { id: 3, title: '금융 퀴즈 생성', message: '저번 달 소비에 대한 퀴즈를 맞춰보세요.', time: '2일전', iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9' },
  { id: 4, title: '타임 무 알림', message: '김나에서 심은 타임무를 수확할 시간이에요', time: '6일전', iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9' },
  { id: 1, title: 'MooBTI 학인', message: '이번 달 소비내역 분석을 할 수 있어요', time: '15시간 전', iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9' },
  { id: 2, title: '금융 상식 퀴즈 생성', message: '오늘의 금융 상식 퀴즈를 맞춰보세요.', time: '17일전', iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9' },
  { id: 3, title: '금융 퀴즈 생성', message: '저번 달 소비에 대한 퀴즈를 맞춰보세요.', time: '2일전', iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9' },
  { id: 4, title: '타임 무 알림', message: '김나에서 심은 타임무를 수확할 시간이에요', time: '6일전', iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9' },
];

// 모든 알림 가져오기
export const getAllAlarms = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("모든 알림을 가져옵니다.");
    return dummyAlarms;
  } catch (error) {
    console.error("알림 정보 불러오기 실패:", error);
    throw error;
  }
};

// 특정 카테고리의 알림 가져오기
export const getAlarmsByCategory = async (category) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`${category} 카테고리의 알림을 가져옵니다.`);
    return dummyAlarms.filter(alarm => {
      if (category === '퀴즈') return alarm.title.includes('퀴즈');
      if (category === '타임무') return alarm.title.includes('타임 무');
      if (category === 'MooBTI') return alarm.title.includes('MooBTI');
      return true; // '전체' 카테고리인 경우
    });
  } catch (error) {
    console.error("알림 정보 불러오기 실패:", error);
    throw error;
  }
};
