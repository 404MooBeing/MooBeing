import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 월별 소비내역 조회
export const getSpendDataByMonth = async (year, month) => {
  try {
    const response = await api.get(`/expense?year=${year}&month=${month}`);
    return response.data;
  } catch (error) {
    console.error("월별 소비내역 불러오기 실패:", error);
    throw error;
  }
};


// 계좌별 날짜 합계 조회
export const getSpendSummary = async (year, month, day) => {
  try {
    const response = await api.get(`/expense/account-summary?year=${year}&month=${month}&day=${day}`);
    return response.data;
  } catch (error) {
    console.error("계좌별 날짜 합계 불러오기 실패:", error);
    throw error;
  }
};

// 카테고리 파이차트 그리기
export const getPieChart = async (year, month) => {
  try {
    const response = await api.get(`/expense/pi?year=${year}&month=${month}`);
    return response.data;
  } catch (error) {
    console.error("카테고리 파이차트 가져오기 실패:", error);
    throw error;
  }
};

// 소비 카테고리별 조회
export const getSpendCategory = async (year, month) => {
  try {
    const response = await api.get(
      `/expense/category?year=${year}&month=${month}`
    );
    return response.data;
  } catch (error) {
    console.error("소비 카테고리별 조회 실패:", error);
    throw error;
  }
};


