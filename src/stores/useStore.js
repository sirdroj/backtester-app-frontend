// src/store/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  // State variables
  count: 0,
  name: 'Aman',
  theme: 'dark',
  token :localStorage.getItem("token"),
  username : localStorage.getItem("username"),
  adminname : localStorage.getItem("adminname"),
  forminputData:{
},
  
  // Consistent naming convention for `Theme`

  // Actions (functions that can change the state)
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setName: (newName) => set({ name: newName }),
  settoken: (newtoken) => set({ token: newtoken }),
  setusername: (newusername) => set({ username: newusername }),
  setadminname: (newadminname) => set({ adminname: newadminname }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })), // Improved toggle logic
  setFormInputData: (newFormData) => set({ forminputData: newFormData }),

  // Update a specific key in forminputData
  updateFormInputData: (key, value) => set((state) => ({
    forminputData: {
      ...state.forminputData,
      [key]: { ...state.forminputData[key], ...value }
    }
  })),

  // Add a new key-value pair to forminputData
  addFormInputData: (key, value) => set((state) => ({
    forminputData: {
      ...state.forminputData,
      [key]: value
    }
  })),

  // Remove a key from forminputData
  removeFormInputData: (key) => set((state) => {
    const newFormInputData = { ...state.forminputData };
    delete newFormInputData[key];
    return { forminputData: newFormInputData };
  }),
}));

export default useStore;