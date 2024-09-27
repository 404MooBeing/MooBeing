import axios from "axios";

// CRA와 Vite 모두에서 동작하도록 환경 변수 접근
const BASE_URL = process.env.REACT_APP_BASE_URL || import.meta.env?.VITE_APP_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

console.log('Using BASE_URL:', BASE_URL);

// 더미 데이터
const dummyAccountInfo = {
  balance: 1000000,
  transactions: [
    { id: 1, date: '2024-09-27', description: '급여', amount: 3000000, type: 'income' },
    { id: 2, date: '2024-09-26', description: '식비', amount: -50000, type: 'expense' },
    { id: 3, date: '2024-09-25', description: '교통비', amount: -30000, type: 'expense' },
  ],
  loanAmount: 50000000,
  interestRate: 3.5
};

// 통장 조회
export const getAccountInfo = async () => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyAccountInfo);
      }, 500);
    });
  } catch (error) {
    console.error("통장 조회 실패:", error);
    throw error;
  }
};

// 대출금 상환하기
export const postAccountLoan = async (requestBody) => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { amount } = requestBody;
        dummyAccountInfo.loanAmount -= amount;
        dummyAccountInfo.balance -= amount;
        resolve({ success: true, message: `${amount}원이 성공적으로 상환되었습니다.` });
      }, 500);
    });
  } catch (error) {
    console.error("대출금 상환 실패:", error);
    throw error;
  }
};

// 대출금 상환시 얻을 수 있는 이익 계산
export const getAccountBenefit = async () => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        const benefit = Math.floor(dummyAccountInfo.loanAmount * dummyAccountInfo.interestRate / 100);
        resolve({ benefit });
      }, 500);
    });
  } catch (error) {
    console.error("대출금 상환시 얻을 수 있는 이익 계산 실패:", error);
    throw error;
  }
};
