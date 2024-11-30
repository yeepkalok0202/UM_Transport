import { GOOGLE_MAPS_API_KEY } from "@/constants/environment-constant";
import {
  DestinationInterface,
  GoogleMapLocationInterface,
  GoogleMapNearByLocationInterface,
  Location,
} from "@/types/sapu-types";

const getPlaceFromNameGoogleAPI = async (query: string) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_MAPS_API_KEY}`
  );

  if (res.ok) {
    const data = await res.json();
    const places: DestinationInterface[] = data.results.map(
      (place: GoogleMapLocationInterface) => ({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        location: place.geometry.location,
      })
    );

    return places;
  }

  throw new Error(await res.json());
};

const getCurrentLocationGoogleAPI = async (location: Location) => {
  // Fetch the place name for the current location
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_MAPS_API_KEY}`
  );

  if (res.ok) {
    const data = await res.json();
    const results: GoogleMapLocationInterface[] = data.results;
    return results;
  }

  throw new Error(await res.json());
};

const getNearbyLocationGoogleAPI = async (location: Location) => {
  // Fetch nearby places using Google Places API
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=1500&type=restaurant|cafe|point_of_interest&key=${GOOGLE_MAPS_API_KEY}`
  );

  if (res.ok) {
    const data = await res.json();

    const places: DestinationInterface[] = data.results.map(
      (place: GoogleMapNearByLocationInterface) => ({
        id: place.place_id,
        name: place.name,
        address: place.vicinity, // Vicinity is a short address for nearby places
        location: place.geometry.location,
      })
    );
    return places;
  }

  throw new Error(await res.json());
};

export {
  getPlaceFromNameGoogleAPI,
  getCurrentLocationGoogleAPI,
  getNearbyLocationGoogleAPI,
};
