import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand 스토어 생성
const useUserStore = create(
  persist(
    (set) => ({
      userInfo: null, // 사용자 정보를 저장할 상태
      isLoading: true, // 로딩 상태를 저장할 상태
      creditRate: null, // 신용등급 정보를 저장할 상태
      canAccessQuiz: false,

      // 퀴즈로 바로 갈 수 있는건지
      setCanAccessQuiz: (value) => set({ canAccessQuiz: value }),
      // 사용자 정보를 설정하는 액션
      setUserInfo: (info) => set({ userInfo: info, isLoading: false }),

      setLoading: (loading) => set({ isLoading: loading }), // 로딩 상태 설정 함수

      // 신용등급 정보를 설정하는 액션
      setCreditRate: (rate) => set({ creditRate: rate }),

      // 로그아웃 기능: 사용자 정보를 초기화
      logout: () =>
        set({ userInfo: null, creditRate: null, canAccessQuiz: false }),
    }),
    {
      name: "user-store", // 이름은 localStorage에 저장될 key
      getStorage: () => localStorage, // 상태를 저장할 storage (기본값은 localStorage)
      // 특정 state만 persist 하고 싶다면 이 transformer를 사용할 수 있음
      partialize: (state) => ({
        userInfo: state.userInfo,
        creditRate: state.creditRate,
        canAccessQuiz: state.canAccessQuiz,
      }),
    }
  )
);

export default useUserStore;
