import { create } from "zustand";

import { loginAction } from "../actions/login.action";

import type { User } from "@/interfaces/user.interface";
import { checkAuthAction } from "../actions/check-auth.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  userInitials: string;

  // Getters
  isAdmin: () => boolean;

  // Actions
  setUserInitials: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

const computeUserInitials = (user: User | null): string => {
  if (!user?.fullName) return "";

  return user.fullName
    .split(" ")
    .map((p) => p[0].toUpperCase())
    .join("");
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Properties
  user: null,
  token: null,
  authStatus: "checking",
  userInitials: "",

  // Getters
  isAdmin: () => {
    const roles = get().user?.roles || [];

    return roles.includes("admin");
    // return !!get().user?.roles.includes("admin");
  },

  // Actions
  setUserInitials: (user) => {
    set({
      userInitials: computeUserInitials(user),
    });
  },

  login: async (email: string, password: string) => {
    console.log({ email, password });

    try {
      const { user, token } = await loginAction(email, password);
      localStorage.setItem("token", token);
      set({
        user,
        token,
        userInitials: computeUserInitials(user),
        authStatus: "authenticated",
      });
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
        userInitials: "",
        authStatus: "not-authenticated",
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
      userInitials: "",
      authStatus: "not-authenticated",
    });
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();

      set({
        user,
        token,
        authStatus: "authenticated",
        userInitials: computeUserInitials(user),
      });

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({
        user: null,
        token: null,
        authStatus: "not-authenticated",
      });

      return false;
    }
  },
}));
