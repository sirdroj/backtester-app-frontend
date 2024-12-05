// src/store/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  // State variables
  count: 0,
  name: 'Aman',
  theme: 'dark',
  token :localStorage.getItem("token"),
  username : localStorage.getItem("username"),
  
  // Consistent naming convention for `Theme`

  // Actions (functions that can change the state)
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setName: (newName) => set({ name: newName }),
  settoken: (newtoken) => set({ token: newtoken }),
  setusername: (newusername) => set({ username: newusername }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })), // Improved toggle logic
}));

export default useStore;