export interface BusInfo {
  routeName: string;
  departureTime: string[];
  stations: string[];
  busFee: number;
  busType: BusType;
}

export const enum BusType {
  UM_BUS = "UM_BUS",
  MRT_BUS = "MRT_BUS",
  RAPID_KL_BUS = "RAPID_KL_BUS",
  PJ_CITY_BUS = "PJ_CITY_BUS",
}

export type DepartureTimeKey =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
