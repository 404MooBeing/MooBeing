import axios from "axios";
import useCapsuleStore from "../store/Capsule";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// const {
//   dealId,
//   imgFile,
//   description,
//   type,
//   lat,
//   lng,
//   addressName,
//   placeName,
//   radishId,
// } = useCapsuleStore();

// 무심기
export const postPlantCapsule = async (capsuleData) => {
  try {
    const response = await api.post("radish", capsuleData);
    return response.data;
  } catch (error) {
    console.error("무캡슐 정보 보내기 실패ㅠㅠ", error);
    throw error;
  }
};
