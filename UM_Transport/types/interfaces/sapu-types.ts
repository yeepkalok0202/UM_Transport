export interface Location {
  longitude: number;
  latitude: number;
}

export interface JourneyPlanInterface {
  pickUpLocation: Location;
  destination: Location;
}

export interface PreOrderResponse {
  orderId: string;
  departFrom: Location;
  destination: Location;
  price: number;
  distance: number; // In meter
  encodedPolyline: string;
}

export interface PlaceOrderInterface {
  orderId: string;
  placeOrder: boolean;
}
