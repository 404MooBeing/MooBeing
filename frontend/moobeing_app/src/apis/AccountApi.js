import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

console.log('Using BASE_URL:', BASE_URL);

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
export const postAccountLoan = async (accountData) => {
  try {
    const response = await api.post('/account', {
      accountNum: accountData.accountNum,  
      loanName: accountData.loanName,
      money: accountData.money,
    });
    return response.data;
  } catch (error) {
    console.error("상환 실패:", error);  
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
export const getSpendSummary = async () => {
  try {
    const response = await api.get('/expense/summary');
    return response.data;
  } catch (error) {
    console.error("계좌별 날짜 합계 불러오기 실패:", error);
    throw error;
  }
};