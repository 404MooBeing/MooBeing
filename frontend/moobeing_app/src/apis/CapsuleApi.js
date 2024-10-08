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

// 무심기용 캐릭터 조회
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

// 지도 위에 출력할 캡슐들
/**
 * 지정된 영역 내의 캡슐(무) 데이터를 가져옵니다.
 * @param {Object} bounds - 지도의 경계 좌표
 * @param {number} bounds.latTopRight - 우상단 위도
 * @param {number} bounds.lngTopRight - 우상단 경도
 * @param {number} bounds.latBottomLeft - 좌하단 위도
 * @param {number} bounds.lngBottomLeft - 좌하단 경도
 * @returns {Promise<Array>} 캡슐 데이터 배열
 */
export const postCapsulesOnMap = async (bounds) => {
  try {
    const response = await api.post("/radish/area", {
      latTopRight: bounds.latTopRight,
      lngTopRight: bounds.lngTopRight,
      latBottomLeft: bounds.latBottomLeft,
      lngBottomLeft: bounds.lngBottomLeft,
    });

    console.log("API Response:", response.data); // 응답 데이터 로깅

    const radishes = response.data;

    // 데이터 유효성 검사
    if (!Array.isArray(radishes)) {
      throw new Error("Invalid response format");
    }

    const processedRadishes = radishes.map((radish) => {
      const processed = {
        id: radish.id,
        lat: parseFloat(radish.lat),
        lng: parseFloat(radish.lng),
        radishImageUrl: radish.radishImageUrl,
        remainingDays: radish.remainingDays,
      };
      console.log("Processed radish:", processed); // 각 처리된 무 데이터 로깅
      return processed;
    });

    return processedRadishes;
  } catch (error) {
    console.error("지도 위 캡슐 조회 실패", error);
    throw error;
  }
};
