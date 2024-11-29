export const enum AccountType {
  USER = "USER",
  DRIVER = "DRIVER",
}

export interface ProfileInterface {
  name: string;
  phone: string;
  email: string;
  metricNumber: string;
  identityNumber: string;
  accountType: AccountType;
  emergencyContact: string;
  faculty: string;
}

export interface ProfileUpdatableFields {
  faculty: string;
  phone: string;
  emergencyContact: string;
}
