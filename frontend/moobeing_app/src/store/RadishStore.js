import { create } from "zustand";

const useRadishStore = create((set) => ({
  characters: [],
  setCharacters: (characters) => set({ characters }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  error: null,
  setError: (error) => set({ error }),
}));

export default useRadishStore;
