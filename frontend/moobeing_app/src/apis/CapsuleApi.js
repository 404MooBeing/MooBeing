import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 무심기
export const postPlantCapsule = async (formData) => {
  try {
    const response = await api.post("/radish", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("무캡슐 정보 보내기 실패ㅠㅠ", error);
    throw error;
  }
};

export const getCharacter = async () => {
  try {
    const response = await api.get("/radish/characters");
    // console.log("해치웠나..?");
    return response.data;
  } catch (error) {
    console.error("무 캐릭터 받아오기 실패힝", error);
    throw error;
  }
};
