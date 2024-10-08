import { create } from 'zustand';
import { isEqual } from 'lodash';

const useSpendStore = create((set) => ({
  spendData: [],
  pieChartData: [],
  spendCategory: [],
  
  setSpendData: (newData) => set((state) => {
    if (!isEqual(state.spendData, newData)) {
      return { spendData: newData };
    }
    return state;
  }),
  
  setPieChartData: (newData) => set((state) => {
    if (!isEqual(state.pieChartData, newData)) {
      return { pieChartData: newData };
    }
    return state;
  }),
  
  setSpendCategory: (newData) => set((state) => {
    if (!isEqual(state.spendCategory, newData)) {
      return { spendCategory: newData };
    }
    return state;
  }),
}));

export default useSpendStore;