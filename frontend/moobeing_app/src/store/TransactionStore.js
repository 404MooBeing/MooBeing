import { create } from 'zustand';

const useTransactionStore = create((set) => ({
  // 초기 상태
  account: null,
  accounts: [],
  sortCriteria: { period: "1개월", type: "전체" },
  isRadishSelected: false,

  // 계좌 변경 함수
  setAccount: (selectedAcc) => set({ account: selectedAcc }),

  // 정렬 기준 변경 함수
  setSortCriteria: (selectedSort) => set({ sortCriteria: selectedSort }),

  // 무 심기 선택 버튼 상태 토글 함수
  toggleRadishSelection: () =>
    set((state) => ({ isRadishSelected: !state.isRadishSelected })),

  // 초기화 함수
  setAccounts: (accounts) => set({ accounts }),

  // 상태 초기화 함수
  resetState: () =>
    set({
      account: null,
      accounts: [],
      sortCriteria: { period: "1개월", type: "전체" },
      isRadishSelected: false,
    }),
}));

export default useTransactionStore;
