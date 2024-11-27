import { AccountType } from "./user-types";

export interface SignUpInterface {
  name: string;
  phone: string;
  email: string;
  password: string;
  metricNumber: string;
  identityNumber: string;
  accountType: AccountType;
}

export interface SignInInterface {
  email: string;
  password: string;
}

export interface RefreshSessionInterface {
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  accessTokenExp: number;
  refreshToken: string;
  refreshTokenExp: number;
}
