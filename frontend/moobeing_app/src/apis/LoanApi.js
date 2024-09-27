import axios from "axios";

// CRA와 Vite 모두에서 동작하도록 환경 변수 접근
const BASE_URL = process.env.REACT_APP_BASE_URL || import.meta.env?.VITE_APP_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

console.log('Using BASE_URL:', BASE_URL);

// 더미 데이터
const dummyLoanData = {
  totalLoan: 50000000,
  monthlyLoanAmount: 500000,
  interestRate: 3.5,
  remainingPeriod: 24,
  loanProducts: [
    { name: "주택담보대출", amount: 30000000, rate: 3.2 },
    { name: "신용대출", amount: 20000000, rate: 4.5 }
  ]
};

// 나의 대출 총금액 확인
export const getLoanSum = async () => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ totalLoan: dummyLoanData.totalLoan });
      }, 500);
    });
  } catch (error) {
    console.error("대출 총금액 불러오기 실패:", error);
    throw error;
  }
};

// 이번 달 상환 예정 금액 구하기
export const getLoanMonthly = async () => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ monthlyLoanAmount: dummyLoanData.monthlyLoanAmount });
      }, 500);
    });
  } catch (error) {
    console.error("이번 달 상환 예정 금액 불러오기 실패:", error);
    throw error;
  }
};

// 나의 대출 확인
export const getLoanSort = async (sortType) => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        let sortedLoans = [...dummyLoanData.loanProducts];
        if (sortType === "rate") {
          sortedLoans.sort((a, b) => a.rate - b.rate);
        } else if (sortType === "amount") {
          sortedLoans.sort((a, b) => b.amount - a.amount);
        }
        resolve(sortedLoans);
      }, 500);
    });
  } catch (error) {
    console.error("대출 정보 불러오기 실패:", error);
    throw error;
  }
};

// 대출 상세 정보
export const getLoanDetail = async (loanName) => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        const loanDetail = dummyLoanData.loanProducts.find(loan => loan.name === loanName);
        resolve(loanDetail || null);
      }, 500);
    });
  } catch (error) {
    console.error("대출 상세 정보 불러오기 실패:", error);
    throw error;
  }
};

// 몇 퍼센트 상환했는지 알아보는 API
export const getLoanPercent = async () => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        const percent = Math.floor(Math.random() * 100);
        resolve({ percent });
      }, 500);
    });
  } catch (error) {
    console.error("몇 퍼센트 상환인지 불러오기 실패:", error);
    throw error;
  }
};

// 상환완료 했을 때 무 뽑기
export const getRandomRadish = async () => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        const radishTypes = ["작은 무", "중간 무", "큰 무", "황금 무"];
        const randomRadish = radishTypes[Math.floor(Math.random() * radishTypes.length)];
        resolve({ radish: randomRadish });
      }, 500);
    });
  } catch (error) {
    console.error("랜덤 무 뽑기 실패:", error);
    throw error;
  }
};
