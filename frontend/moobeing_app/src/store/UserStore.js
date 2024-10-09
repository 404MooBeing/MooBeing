import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

// Zustand 스토어 생성
const useUserStore = create(
  persist(
    (set) => ({
      userInfo: null, // 사용자 정보를 저장할 상태
      isLoading: true, // 로딩 상태를 저장할 상태
      creditRate: {
        ratingName: "A", // 기본값
        ratingPercent: 100, // 기본값
      },
      canAccessQuiz: false,

      // accounts와 totalAccountAmount 상태 추가
      accounts: [],
      totalAccountAmount: 0,
      loanSum: 0, // 대출 합계
      accountBenefit: {}, // 계좌 혜택 데이터
      radishSummary: {}, // 무 요약 데이터
      spendSummary: {}, 

      // 퀴즈로 바로 갈 수 있는건지
      setCanAccessQuiz: (value) => set({ canAccessQuiz: value }),
      
      // 사용자 정보를 설정하는 액션
      setUserInfo: (info) => set({ userInfo: info, isLoading: false }),

      setLoading: (loading) => set({ isLoading: loading }), // 로딩 상태 설정 함수

      // 신용등급 정보를 설정하는 액션
      setCreditRate: (rate) => set({ creditRate: rate }),

      // 계좌 목록 및 총 금액 설정 함수 추가
      setAccounts: (accounts) => set({ accounts }),
      setTotalAccountAmount: (amount) => set({ totalAccountAmount: amount }),

      // 대출 합계 설정 함수
      setLoanSum: (sum) => set({ loanSum: sum }),

      // 계좌 혜택 설정 함수
      setAccountBenefit: (benefit) => set({ accountBenefit: benefit }),

      // 무 요약 데이터 설정 함수
      setRadishSummary: (summary) => set({ radishSummary: summary }),

      // 소비 요약 설정 함수
      setSpendSummary: (summary) => set({ spendSummary: summary }),
      
      // 로그아웃 기능: 사용자 정보와 계좌 관련 데이터를 초기화
      logout: () => {
        set({
          userInfo: null,
          creditRate: { ratingName: "A", ratingPercent: 100 },
          canAccessQuiz: false,
          accounts: [],
          totalAccountAmount: 0,
          loanSum: 0, 
          accountBenefit: {},
          radishSummary: {},
          spendSummary: {},
        });
        sessionStorage.removeItem("user-store");
      },
    }),
    {
      name: "user-store", // 세션 스토리지에 저장될 key
      storage: createJSONStorage(() => sessionStorage), // 세션 스토리지 사용
      // persist할 상태를 선택적으로 저장
      partialize: (state) => ({
        userInfo: state.userInfo,
        creditRate: state.creditRate,
        canAccessQuiz: state.canAccessQuiz,
        accounts: state.accounts,
        totalAccountAmount: state.totalAccountAmount,
        loanSum: state.loanSum,
        accountBenefit: state.accountBenefit,
        radishSummary: state.radishSummary,
        spendSummary: state.spendSummary,
      }),
    }
  )
);

export default useUserStore;
