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
  duration: number; // In seconds
  encodedPolyline: string;
}

export interface PlaceOrderInterface {
  orderId: string;
  placeOrder: boolean;
}

export interface DestinationInterface {
  id: string;
  name: string;
  address: string;
  location: GoogleLocationInterface;
}

export interface LocationDetailsInterface {
  name: string;
  address: string;
}

export interface GoogleLocationInterface {
  lat: number;
  lng: number;
}

export interface GoogleMapLocationInterface {
  name: string;
  formatted_address: string;
  place_id: string;
  geometry: {
    location: GoogleLocationInterface;
  };
}

export interface GoogleMapNearByLocationInterface {
  name: string;
  vicinity: string;
  place_id: string;
  geometry: {
    location: GoogleLocationInterface;
  };
}
