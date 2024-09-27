// src/store/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  // State variables
  count: 0,
  name: "Aman",

  // Actions (functions that can change the state)
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setName: (newName) => set({ name: newName }),
}));

export default useStore;
