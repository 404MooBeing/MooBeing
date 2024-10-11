import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 1. 사용자 무 컬렉션 확인
export const getUserRadishCollection = async () => {
  try {
    const response = await api.get("/radish/characters");
    return response.data;
  } catch (error) {
    console.error("사용자 무 컬렉션 확인:", error);
    throw error;
  }
};

// 2. 사용자 무 변경하기
export const selectRadish = async (radishName) => {
  try {
    const response = await api.post("/user/select", { radishName: radishName });
    return response.data;
  } catch (error) {
    console.error("사용자 무 변경 실패!:", error);
    throw error;
  }
};

// 4. 사용자 애기 무 추가
export const getBabyRadish = async () => {
  try {
    const response = await api.post("/user/baby");
    return response.data;
  } catch (error) {
    console.error("애기 무 뽑기 실패:", error);
    throw error;
  }
};

// 5. 애기 무 5개 모였을 시에 상위등급으로 업그레이드
export const growBabyRadish = async () => {
  try {
    const response = await api.post("/user/baby-merge");
    return response.data;
  } catch (error) {
    console.error("애기 무 변신 실패:", error);
    throw error;
  }
};

// 아직 뽑지 않은 무가 몇개 남았고, 몇 분 남았는지 확인하는 api
export const getRadishSummary = async () => {
  try {
    const response = await api.get('radish/summary');
    return response.data;
  } catch (error) {
    console.error("무 정보 갖고 오기 실패", error);
    throw error;
  }
}