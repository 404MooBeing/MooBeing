import axios from "axios";
import { useUserStore } from "../store/UserStore";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 회원가입
export const postSignUp = async (email, password, name, humanNumber) => {
  try {
    const response = await api.post("/user/signup", {
      email: email,
      password: password,
      name: name,
      humanNumber: humanNumber,
    });
    return response.data;
  } catch (error) {
    console.error("회원 가입 실패:", error);
    throw error;
  }
};

// 로그인
export const postLogin = async (email, password) => {
  // Zustand 스토어에서 setUserInfo 함수 가져오기
  const setUserInfo = useUserStore.getState().setUserInfo;

  try {
    const response = await api.post("/user/login", {
      email: email,
      password: password,
    });

    setUserInfo(response.data); // 로그인 성공 시 사용자 정보를 Zustand 스토어에 저장
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

// 유저 정보
export const getUserInfo = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.error("유저 정보 불러오기 실패:", error);
    throw error;
  }
};

// 이메일 중복 체크
export const postEmailCheck = async (email) => {
  try {
    const response = await api.post("/user/email", { email: email });
    return response.data;
  } catch (error) {
    console.error("이메일 중복 체크 실패:", error);
    throw error;
  }
};

// 비밀번호 변경
export const postPasswordChange = async (oldPassword, newPassword) => {
  try {
    const response = await api.post("/user/pw", {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("패스워드 변경 실패:", error);
    throw error;
  }
};

// 신용등급 조회
export const getCreditRate = async () => {
  // Zustand 스토어에서 setCreditRate 함수 가져오기
  const setCreditRate = useUserStore.getState().setCreditRate;
  try {
    const response = await api.get("/credit");
    setCreditRate(response.data); // 신용등급 정보를 Zustand 스토어에 저장
    return response.data;
  } catch (error) {
    console.error("신용등급 불러오기 실패:", error);
    throw error;
  }
};

// 연속으로 무를 받았는지 체크하기
export const getStreamCnt = async () => {
  try {
    const response = await api.get("/user/streamCnt");
    return response.data;
  } catch (error) {
    console.error("연속 무 개수 받기 실패:", error);
    throw error;
  }
};
