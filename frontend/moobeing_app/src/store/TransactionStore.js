import { create } from 'zustand';

const useTransactionStore = create((set) => ({
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

  // 초기화
  setAccounts: (accounts) => set({ accounts })
}));

export default useTransactionStore;
