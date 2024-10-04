import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

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


// 내가 가지고 있는 계좌 조회
export const getAccountInfo = async () => {
  try {
    const response = await api.get('/account')
    return response.data
  } catch (error) {
    console.error("통장 조회 실패:", error);
    throw error;
  }
};

// 계좌 대출금 총합 조회
export const getAccountSum = async () => {
  try {
    const response = await api.get('/account/sum')
    return response.data
  } catch (error) {
    console.error("대출금 총합 조회 실패:", error);
    throw error;
  }
};  

// 계좌 거래 내역 조회
export const postAccountHistory = async (accountHistoryData) => {
  try {
    const response = await api.post('/expense/history', {
      accountId: accountHistoryData.accountId,
      months: accountHistoryData.months,
      transactionType: accountHistoryData.transactionType,
      page: accountHistoryData.page,
    });  
    return response.data;
  } catch (error) {
    console.error("계좌 내역 조회 실패:", error);
    throw error;
  }  
};  


// 대출금을 내 계좌에서 상환하기
// export const postAccountLoan = async (accountData) => {
//   try {
//     const response = await api.post('/account', {
//       accountNum: accountData.accountNum,  
//       loanName: accountData.loanName,
//       money: accountData.money,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("상환 실패:", error);  
//     throw error;
//   }
// };


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
    const response = await api.get("/account/benefit");
    return response.data;
  } catch (error) {
    console.error("대출금 상환시 얻을 수 있는 이익 계산 실패:", error);
    throw error;
  }
};

// 계좌별 날짜 합계 조회
export const getSpendSummary = async (year, month, day) => {
  try {
    const response = await api.get(`/expense/account-summary?year=${year}&month=${month}&day=${day}`);
    return response.data;
  } catch (error) {
    console.error("계좌별 날짜 합계 불러오기 실패:", error);
    throw error;
  }
};