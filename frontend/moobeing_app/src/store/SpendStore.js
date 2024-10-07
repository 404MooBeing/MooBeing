import { create } from 'zustand';

const useSpendStore = create((set) => ({
  spendData: [],
  pieChartData: [],
  spendCategory: [],
  setSpendData: (newData) => set({ spendData: newData }),
  setPieChartData: (newData) => set({ pieChartData: newData }),
  setSpendCategory: (newData) => set({ spendCategory: newData }),
}));

export default useSpendStore;
