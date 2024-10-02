import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

console.log('Using BASE_URL:', BASE_URL);

// 더미 데이터 수정
const dummyAlarms = [
  { id: 1, title: 'MooBTI 확인', message: '9월 소비내역 분석이 완료되었어요', time: '2024-09-27T09:30:00', iconName: 'MooBTI' },
  { id: 2, title: '금융 상식 퀴즈 생성', message: '오늘의 금융 상식 퀴즈가 도착했어요', time: '2024-09-26T14:45:00', iconName: 'Quiz' },
  { id: 3, title: '타임 무 알림', message: '김나에서 심은 타임무를 수확할 시간이에요', time: '2024-09-25T18:20:00', iconName: 'TimeWu' },
  { id: 4, title: 'MooBTI 확인', message: '당신의 MooBTI에 맞는 금융 상품을 확인해보세요', time: '2024-09-24T10:00:00', iconName: 'MooBTI' },
  { id: 5, title: '금융 퀴즈 생성', message: '지난 달 소비에 대한 퀴즈를 풀어보세요', time: '2024-09-23T20:15:00', iconName: 'Quiz' },
  { id: 6, title: '타임 무 알림', message: '새로운 타임무를 심을 시간이에요', time: '2024-09-22T11:30:00', iconName: 'TimeWu' },
  { id: 7, title: 'MooBTI 확인', message: '당신의 MooBTI가 업데이트되었어요', time: '2024-09-21T16:40:00', iconName: 'MooBTI' },
  { id: 8, title: '금융 상식 퀴즈 생성', message: '오늘의 투자 상식 퀴즈에 도전해보세요', time: '2024-09-20T09:10:00', iconName: 'Quiz' },
  { id: 9, title: '타임 무 알림', message: '타임무에 물을 줄 시간이에요', time: '2024-09-19T13:25:00', iconName: 'TimeWu' },
  { id: 10, title: 'MooBTI 확인', message: '이번 주 MooBTI 챌린지에 참여해보세요', time: '2024-09-18T15:50:00', iconName: 'MooBTI' },
];

// 모든 알림 가져오기 (더미 데이터 사용)
export const getAllAlarms = async () => {
  try {
    // API 호출을 시뮬레이션하기 위해 setTimeout 사용
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyAlarms);
      }, 500); // 0.5초 지연
    });
  } catch (error) {
    console.error("알림 정보 불러오기 실패:", error);
    throw error;
  }
};

// 특정 카테고리의 알림 가져오기 (더미 데이터 사용)
export const getAlarmsByCategory = async (category) => {
  try {
    // API 호출을 시뮬레이션하기 위해 setTimeout 사용
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredAlarms = dummyAlarms.filter(alarm => alarm.title.includes(category));
        resolve(filteredAlarms);
      }, 500); // 0.5초 지연
    });
  } catch (error) {
    console.error("알림 정보 불러오기 실패:", error);
    throw error;
  }
};
