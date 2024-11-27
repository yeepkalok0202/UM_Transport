import { AUTH_API_URL } from "@/constants/api-uri-constant";
import {
  AuthResponse,
  RefreshSessionInterface,
  SignInInterface,
  SignUpInterface,
} from "@/types/auth-types";
import { handleError } from "@/utils/api-utils";

export const signUpAPI = async (
  data: SignUpInterface
): Promise<AuthResponse> => {
  const res = await fetch(`${AUTH_API_URL}/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return await res.json();
  }

  throw await handleError(res);
};

export const signInAPI = async (
  data: SignInInterface
): Promise<AuthResponse> => {
  const res = await fetch(`${AUTH_API_URL}/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return await res.json();
  }

  throw await handleError(res);
};

export const refreshAPI = async (
  data: RefreshSessionInterface
): Promise<AuthResponse> => {
  const res = await fetch(`${AUTH_API_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return await res.json();
  }

  throw await handleError(res);
};

export const logoutAPI = async (token: string): Promise<void> => {
  const res = await fetch(`${AUTH_API_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw await handleError(res);
  }
};
