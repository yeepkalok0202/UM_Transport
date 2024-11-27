import { AuthResponse } from "@/types/auth-types";
import { create } from "zustand";

type AuthStatus = "pending" | "true" | "false";

interface AuthState {
  isAuthenticated: AuthStatus;
  accessToken: string;
  accessTokenExp: number;
  refreshToken: string;
  refreshTokenExp: number;
}

interface AuthAction {
  updateTokens: (tokens: AuthResponse) => void;
  updateAuthStatus: (authStatus: AuthStatus) => void;
}

const useAuth = create<AuthState | AuthAction>()((set, get) => ({
  isAuthenticated: "pending",
  accessToken: null,
  accessTokenExp: null,
  refreshToken: null,
  refreshTokenExp: null,
  updateTokens: (tokens) =>
    set((state) => ({
      ...state,
      ...tokens,
    })),
  updateAuthStatus: (authStatus) =>
    set((state) => ({
      ...state,
      isAuthenticated: authStatus,
    })),
}));
