import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 무심기
export const postFCMRegister = async (formData) => {
  try {
    const response = await api.post("/subscription/register", formData);
    return response.data;
  } catch (error) {
    console.error("token 구독 실패", error);
    throw error;
  }
};
