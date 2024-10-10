import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 모든 알림 가져오기 (실제 API 호출)
export const getAllAlarms = async () => {
  try {
    const response = await api.get('/alarm');
    return response.data;
  } catch (error) {
    console.error("알림 정보 불러오기 실패:", error);
    throw error;
  }
};

// 특정 카테고리의 알림 가져오기 (실제 API 호출)
export const getAlarmsByCategory = async (category) => {
  try {
    const response = await api.get(`/alarm?category=${category}`);
    return response.data;
  } catch (error) {
    console.error("알림 정보 불러오기 실패:", error);
    throw error;
  }
};

// 특정 카테고리의 알림 가져오기 (실제 API 호출)
export const getIsAlarm = async () => {
  try {
    const response = await api.get(`/alarm/unread`);
    return response.data;
  } catch (error) {
    console.error("알림 유무 불러오기 실패:", error);
    throw error;
  }
};
