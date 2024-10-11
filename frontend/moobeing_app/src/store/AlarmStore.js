import { create } from "zustand";

const useAlarmStore = create((set) => ({
  isAlarm: false, // isAlarm 추가
  setIsAlarm: (isAlarm) => set({ isAlarm }), // isAlarm 설정 메서드 추가
}));

export default useAlarmStore;
