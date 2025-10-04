import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  loginType: "customer",
  loginOpen: false,
  signupOpen: false,

  setLoginOpen: (open) => set({ loginOpen: open }),
  setSignupOpen: (open) => set({ signupOpen: open }),
  setLoginType: (type) => set({ loginType: type }),

  login: (user) => set({ user }),
  logout: () => set({ user: null })
}));

export default useAuthStore;
