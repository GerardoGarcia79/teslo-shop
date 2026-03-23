import { create } from "zustand";

import { loginAction } from "../actions/login.action";

import type { User } from "@/interfaces/user.interface";

type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  // Getters

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set) => ({
  // Properties
  user: null,
  token: null,

  // Actions
  login: async (email: string, password: string) => {
    console.log({ email, password });

    try {
      const { user, token } = await loginAction(email, password);
      localStorage.setItem("token", token);
      set({ user, token });
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null });
      return false;
    }
  },
}));
