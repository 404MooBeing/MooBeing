// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.REACT_APP_BASE_URL + "/user",
//   withCredentials: true,
// });

// // 1. 사용자 무 컬렉션 확인
// export const getUserRadishCollection = async () => {
//   try {
//     const response = await api.get("/radish");
//     return response.data;
//   } catch (error) {
//     console.error("사용자 무 컬렉션 확인:", error);
//     throw error;
//   }
// };

// // 2. 사용자 무 변경하기
// export const selectRadish = async (radishName) => {
//   try {
//     const response = await api.post("/select", { radishName: radishName });
//     return response.data;
//   } catch (error) {
//     console.error("사용자 무 변경 실패!:", error);
//     throw error;
//   }
// };

// // 4. 사용자 애기 무 추가
// export const getBabyRadish = async () => {
//   try {
//     const response = await api.post("/baby");
//     return response.data;
//   } catch (error) {
//     console.error("애기 무 뽑기 실패:", error);
//     throw error;
//   }
// };

// // 5. 애기 무 5개 모였을 시에 상위등급으로 업그레이드
// export const growBabyRadish = async () => {
//   try {
//     const response = await api.post("/baby-merge");
//     return response.data;
//   } catch (error) {
//     console.error("애기 무 변신 실패:", error);
//     throw error;
//   }
// };
