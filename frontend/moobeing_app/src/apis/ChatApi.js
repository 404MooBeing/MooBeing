import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL + '/py';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const postChat = async (question) => {
    try {
      const response = await api.post("/chat", { question });
      return response.data;
    } catch (error) {
      console.error("채팅 가져오기 실패:", error);
      throw error;
    }
  };
