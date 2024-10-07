import axios from "axios";
import useUserStore from "../store/UserStore";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 무 코인 개수 받아오기
export const getCoin = async () => {
    try {
      const response = await api.get("/point/my");
      return response.data;
    } catch (error) {
      console.error("무코인 가져오기 실패,", error);
      throw error;
    }
  };


  // 무 코인 개수 받아오기
export const getCoinHistory = async (requestBody) => {
    try {
        const response = await api.post('/point/history', {
            months: requestBody.months,
            transactionType: requestBody.transactionType,
            page: requestBody.page,
          });  
      return response.data;
    } catch (error) {
      console.error("무코인 가져오기 실패,", error);
      throw error;
    }
  };
  