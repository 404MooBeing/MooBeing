import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getNotStartedQuiz = async () => {
  try {
    const response = await api.get("/quiz");
    return response.data;
  } catch (error) {
    console.error("퀴즈 정보 불러오기 실패했어요 슬퍼요", error);
    throw error;
  }
};

// 2. 정답 보내기
export const submitAnswer = async (quizNum, answer) => {
  try {
    const response = await api.post(`/quiz/${quizNum}`, { answer });
    return response.data;
  } catch (error) {
    console.error("정답 제출 실패:", error);
    throw error;
  }
};


// 경제 퀴즈 가져오기
export const getNotStartedEconomicQuiz = async () => {
  try {
    const response = await api.get("/quiz/economic");
    return response.data;
  } catch (error) {
    console.error("경제 퀴즈 정보 불러오기 실패했어요 슬퍼요", error);
    throw error;
  }
};

export const submitEconomicQuizAnswer = async (quizNum, answer) => {
  try {
    const response = await api.post(`/quiz/economic/${quizNum}`, { answer });
    return response.data;
  } catch (error) {
    console.error("정답 제출 실패:", error);
    throw error;
  }
};
