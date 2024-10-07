import { create } from "zustand";

const useFCMStore = create((set) => ({
  token: null, // FCM 토큰 추가
  setToken: (token) => set({ token }), // FCM 토큰 설정 메서드 추가
}));

export default useFCMStore;
