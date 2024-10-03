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

    // response.data의 형태를 예상하여 타입 체크 및 변환
    const radishes = response.data;

    // 데이터 유효성 검사 (선택적)
    if (!Array.isArray(radishes)) {
      throw new Error("Invalid response format");
    }

    return radishes.map((radish) => ({
      id: radish.id,
      lat: parseFloat(radish.lat),
      lng: parseFloat(radish.lng),
      radishImage: radish.radishImage,
      remainingDays: radish.remainingDays,
    }));
  } catch (error) {
    console.error("지도 위 캡슐 조회 실패", error);

    // 에러 종류에 따른 처리
    if (error.response) {
      // 서버가 응답을 반환했지만 2xx 범위가 아닌 경우
      console.error("서버 응답 에러:", error.response.data);
      throw new Error(error.response.data.message || "서버 응답 에러");
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      throw new Error("서버에서 응답이 없습니다");
    } else {
      // 요청 설정 중 문제가 발생한 경우
      throw new Error("요청 설정 중 에러가 발생했습니다");
    }
  }
};
