export interface BusInfo {
  routeName: string;
  departureTime: Record<DepartureTimeKey, string[]>;
  stations: string[];
  busFee: number;
}

export type DepartureTimeKey =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
