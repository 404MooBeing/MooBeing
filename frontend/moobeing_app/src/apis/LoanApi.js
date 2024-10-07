import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 나의 대출 총금액 확인
export const getLoanSum = async () => {
  try {
    const response = await api.get("/loan/sum");
    return response.data;
  } catch (error) {
    console.error("대출 총금액 불러오기 실패:", error);
    throw error;
  }
};

// 이번 달 상환 예정 금액 구하기
export const getLoanMonthly = async () => {
  try {
    const response = await api.get("/loan/monthly");
    console.log("이번 달 상환 예정 금액 불러오기 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("이번 달 상환 예정 금액 불러오기 실패:", error);
    throw error;
  }
};
// 나의 대출 확인
// getLoanSort("rate");   // 대출 정보를 금리에 따라 정렬하여 가져옴
// getLoanSort("amount"); // 대출 정보를 금액에 따라 정렬하여 가져옴
export const getLoanSort = async (sortType) => {
  try {
    const response = await api.get(`/loan?sort=${sortType}`);
    return response.data;
  } catch (error) {
    console.error("대출 정보 불러오기 실패:", error);
    throw error;
  }
};

// 모든 대출 예정지도 월별 확인
export const getAllLoanMapByMonth = async () => {
  try {
    const response = await api.get("/loan/all-map");
    return response.data;
  } catch (error) {
    console.error("모든 월별 대출 여정 지도 정보 불러오기 실패:", error);
    throw error;
  }
};

// 모든 대출 예정지도 월별 확인
export const getAllLoanMapByYear = async () => {
  try {
    const response = await api.get("/loan/all-map-year");
    return response.data;
  } catch (error) {
    console.error("모든 연별 대출 여정 지도 정보 불러오기 실패:", error);
    throw error;
  }
};

// 특정 대출 예정지도 월별 확인
export const getLoanMapByProductName = async (loanProductName) => {
  try {
    const response = await api.get(
      `/loan/map?loanProductName=${loanProductName}`
    );
    return response.data;
  } catch (error) {
    console.error("특정 대출 예정지도 정보 불러오기 실패:", error);
    throw error;
  }
};

//특정 대출 예정지도 연별 확인
export const getYearByProductName = async (loanProductName) => {
  try {
    const response = await api.get(
      `/loan/map-year?loanProductName=${loanProductName}`
    );
    return response.data;
  } catch (error) {
    console.error("특정 대출 여정 지도 연별 확인 불러오기 실패:", error);
    throw error;
  }
};

// 전체 또래 상환 내역 조회
export const getAllLoanBuddy = async () => {
  try {
    const response = await api.get("/loan/all-buddy");
    return response.data;
  } catch (error) {
    console.error("월별 또래 상환 내역 불러오기 실패:", error);
    throw error;
  }
};

// 전체 또래 상환 내역 조회
export const getYearLoanBuddy = async () => {
  try {
    const response = await api.get("/loan/all-buddy-year");
    return response.data;
  } catch (error) {
    console.error("연별 또래 상환 내역 불러오기 실패:", error);
    throw error;
  }
};

// 월별 또래 상환 내역 조회
export const getProductLoanBuddy = async (loanProductName) => {
  try {
    const response = await api.get(`/loan/buddy?loanName=${loanProductName}`);
    return response.data;
  } catch (error) {
    console.error("또래 상환 내역 불러오기 실패:", error);
    throw error;
  }
};

// 연별 또래 상환 내역 조회
export const getProductYearLoanBuddy = async (loanProductName) => {
  try {
    const response = await api.get(
      `/loan/buddy-year?loanName=${loanProductName}`
    );
    return response.data;
  } catch (error) {
    console.error("연별 또래 상환 내역 불러오기 실패:", error);
    throw error;
  }
};

// 몇 퍼센트 상환했는지 알아보는 API
export const getLoanPercent = async () => {
  try {
    const response = await api.get("/loan/percent");
    return response.data;
  } catch (error) {
    console.error("몇 퍼센트 상환인지 불러오기 실패:", error);
    throw error;
  }
};

// 상환완료 했을 때 무 뽑기
export const getRandomRadish = async () => {
  try {
    const response = await api.post("/loan/monthClick");
    console.log("무뽑는 axios 함수가 잘잘잘 호출되었습니다.", response.data);
    return response.data;
  } catch (error) {
    console.error("랜덤 무 뽑기 실패:", error);
    throw error;
  }
};
// 상환한 대출의 개수와 가입되어 있는 대출 상품의 개수
// 무뽑기 버튼의 활성화 유무
export const getLoanNumber = async () => {
  try {
    const response = await api.get("/loan/count");
    console.log(response);
    console.log(
      "대출상품 개수 함수 잘잘잘 출력되었습니다 지금 현재 버튼 활성화 유무는:",
      response.data.showButton
    );
    return response.data;
  } catch (error) {
    console.error("대출상품 개수 조회에 실패하였습니다 힝힝", error);
    throw error;
  }
};

// 금리혜택 -> 사용 안함
export const changeInterestRate = async () => {
  try {
    const response = await api.post("/loan/good");
    console.log("금리혜택을 받는 axios 함수가 호출 되었습니다");
    return response.data
  } catch (error) {
    console.error("금리혜택을 받는 함수 호출 실패", error);
  }
};

// 대출 상세 정보
export const getLoanDetail = async (loanName) => {
  try {
    const response = await api.get(`/loan/detail?loanProductName=${loanName}`);
    return response.data;
  } catch (error) {
    console.error("대출 상세 정보 불러오기 실패:", error);
    throw error;
  }
};

// 대출별 상환 퍼센트
export const getEachLoanPercent = async (loanName) => {
  try {
    const response = await api.get(`/loan/percent-name-detail?loanName=${loanName}`);
    return response.data;
  } catch (error) {
    console.error("대출별 상환 퍼센트 불러오기 실패:", error);
    throw error;
  }
}