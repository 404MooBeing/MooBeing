import { create } from 'zustand';
import dayjs from 'dayjs';

const useDateStore = create((set) => ({
  selectedDate: dayjs(),
  setSelectedDate: (newDate) => set({ selectedDate: newDate }),
}));

export default useDateStore;