import axios from "axios";
import FlexRad from "../assets/radishes/flexRadish.png"; // FlexRad를 여기에서 import

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 나의 대출 총금액 확인
export const getMoobti = async () => {
  try {
    const response = await api.get("/moobti");
    // 실제 API 호출 대신 더미 데이터를 반환하도록 수정
    return response.data; // 더미 데이터 반환
  } catch (error) {
    console.error("무비티아이 불러오기 실패:", error);
    // 기본값을 반환하여 에러를 방지
    return getDummyData(); // 더미 데이터 반환
  }
};

export const getDummyData = () => {
  return {
    character: {
      imageUrl: FlexRad,
      type: "소비 유형",
      name: "플렉스 (돈많아)",
      description: "주변에 배풀며 친구가 많은 분입니다. 즐거운 분위기를 좋아하시겠네요!"
    },
    categories: [
      { label: "식비", percent: 36.59 }, // 식비
      { label: "의료", percent: 25.59 }, // 의료
      { label: "문화", percent: 9.36 },  // 문화
      { label: "대출", percent: 98.73 }, // 대출
      { label: "유흥", percent: 100 }     // 유흥
    ],
  };
};