import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  Image,
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import SuggestionBottom from "@/components/route-suggestion/SuggestionBottom";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomHeader from "@/components/common/CustomHeader";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransportSuggestion() {
  const router = useRouter();
  const mapRef = useRef<MapView | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchQuerySource, setSearchQuerySource] = useState("");
  const [searchQueryDestination, setSearchQueryDestination] = useState("");
  const [source, setSource] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [showDropdownSource, setShowDropdownSource] = useState(false);
  const [showDropdownDestination, setShowDropdownDestination] = useState(false);
  const [sourcePinLocation, setSourcePinLocation] = useState(null);
  const [destinationPinLocation, setDestinationPinLocation] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestion, setSuggestion] = useState(false);

  // suggestion bottom view
  const bus = [
    {
      type: "UM Shuttle Bus",
      name: "Route AB",
      fee: "Free",
      time: 15,
      waitingTime: 5,
    },
    { type: "Rapid KL", name: "T815", fee: "RM1.00", time: 20, waitingTime: 5 },
    { type: "Rapid KL", name: "T789", fee: "RM1.00", time: 35, waitingTime: 5 },
  ];

  const sapu = { fee: "RM5.00", time: 10 };

  const GOOGLE_MAPS_API_KEY = "AIzaSyBapQKkarYUNa-F4NAXcrWwJHJNeajYNuY";

  const INITIAL_REGION = {
    // KL as default
    latitude: 3.139,
    longitude: 101.6869,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const fetchPlacesSource = async (query) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const places = response.data.results.map((place) => ({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        location: {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        },
      }));
      setSource(places);
    } catch (error) {
      console.error("Error fetching places: ", error);
    }
  };

  const fetchPlacesDestination = async (query) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const places = response.data.results.map((place) => ({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        location: {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        },
      }));
      setDestinations(places);
    } catch (error) {
      console.error("Error fetching places: ", error);
    }
  };

  const fetchNearbyPlaces = async (type: string) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=point_of_interest&key=${GOOGLE_MAPS_API_KEY}`
      );
      const places = response.data.results.map((place) => ({
        id: place.place_id,
        name: place.name,
        address: place.vicinity,
        location: {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        },
      }));
      type === "source"
        ? (setSource(places), setShowDropdownSource(true))
        : (setDestinations(places), setShowDropdownDestination(true));
    } catch (error) {
      console.error("Error fetching nearby places: ", error);
      Alert.alert("Error", "Unable to fetch nearby places.");
    }
  };

  const handleSearchSource = (text) => {
    setSearchQuerySource(text);
    if (text.length > 2) {
      fetchPlacesSource(text);
      setShowDropdownSource(true);
    } else {
      setSource([]);
      setShowDropdownSource(false);
    }
  };

  const handleSearchDestination = (text) => {
    setSearchQueryDestination(text);
    if (text.length > 2) {
      fetchPlacesDestination(text);
      setShowDropdownDestination(true);
    } else {
      setDestinations([]);
      setShowDropdownDestination(false);
    }
  };
  const selectLocationSource = (location) => {
    setSearchQuerySource(location.name);
    setSourcePinLocation(location.location);
    setShowDropdownSource(false);
    if (mapRef.current) {
      if (destinationPinLocation) {
        // Fit map to show both source and destination
        mapRef.current.fitToCoordinates(
          [location.location, destinationPinLocation],
          {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          }
        );
      } else {
        // Zoom to source
        mapRef.current.animateCamera(
          { center: location.location, zoom: 16 },
          { duration: 2000 }
        );
      }
    }
  };
  const selectLocationDestination = (location) => {
    setSearchQueryDestination(location.name);
    setDestinationPinLocation(location.location);
    setShowDropdownDestination(false);
    if (mapRef.current) {
      if (sourcePinLocation) {
        // Fit map to show both source and destination
        mapRef.current.fitToCoordinates(
          [sourcePinLocation, location.location],
          {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          }
        );
      } else {
        // Zoom to destination
        mapRef.current.animateCamera(
          { center: location.location, zoom: 16 },
          { duration: 2000 }
        );
      }
    }
  };

  useEffect(() => {
    if (mapRef.current && mapReady) {
      if (currentLocation) {
        // Focus on the current location when it's available
        mapRef.current.animateCamera(
          {
            center: currentLocation,
            zoom: 16,
          },
          { duration: 1000 }
        );
      } else {
        // Fallback to the initial region
        mapRef.current.animateCamera(
          {
            center: INITIAL_REGION,
            zoom: 12,
          },
          { duration: 1000 }
        );
      }
    }
  }, [mapReady, currentLocation]);

  const navigateBack = () => router.back();

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1 }}>
        <CustomHeader navigateBack={navigateBack} title="Where are you?" />
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          showsUserLocation
          showsTraffic={true}
          initialRegion={INITIAL_REGION}
          onMapReady={() => setMapReady(true)}
        >
          {sourcePinLocation && (
            <Marker
              coordinate={sourcePinLocation}
              title="Selected Departure"
              description={searchQuerySource}
            />
          )}
          {destinationPinLocation && (
            <Marker
              coordinate={destinationPinLocation}
              title="Selected Destination"
              description={searchQueryDestination}
            />
          )}
        </MapView>

        <SafeAreaView className="absolute left-0 right-0 gap-5 mt-24 px-5">
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 10,
            }}
          >
            <View className="flex-row justify-between">
              <Image
                className="size-8 mt-1 mr-1"
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                }}
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: "#ddd",
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  flex: 1,
                }}
                placeholder="Search & select a starting point "
                value={searchQuerySource}
                onChangeText={handleSearchSource}
                onFocus={() => {
                  setShowDropdownSource(true);
                  setShowDropdownDestination(false);
                }}
              />
              <View className="flex-initial">
                <Pressable
                  onPress={() => {
                    fetchNearbyPlaces("source");
                    setShowDropdownDestination(false);
                  }}
                >
                  <Image
                    className="size-8 mt-2 ml-1"
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/934/934640.png",
                    }}
                  />
                </Pressable>
              </View>
            </View>

            {showDropdownSource && source.length > 0 && (
              <FlatList
                data={source}
                keyExtractor={(item) => item.id}
                style={{
                  maxHeight: 150,
                  borderColor: "#ddd",
                  borderWidth: 1,
                  borderTopWidth: 0,
                  borderRadius: 5,
                  marginTop: 5,
                }}
                renderItem={({ item }) => (
                  <Pressable
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: "#eee",
                    }}
                    onPress={() => selectLocationSource(item)}
                  >
                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                    <Text style={{ fontSize: 12, color: "#666" }}>
                      {item.address}
                    </Text>
                  </Pressable>
                )}
              />
            )}
          </View>

          <View
            style={{
              zIndex: 5,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 1,
            }}
          >
            <View className="flex-row ">
              <Image
                className="size-8 mt-2 mr-1"
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/5178/5178089.png",
                }}
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: "#ddd",
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  flex: 1,
                }}
                placeholder="Search & select a destination point "
                value={searchQueryDestination}
                onChangeText={handleSearchDestination}
                onFocus={() => {
                  setShowDropdownDestination(true);
                  setShowDropdownSource(false);
                }}
              />
              <View className="flex-initial">
                <Pressable
                  onPress={() => {
                    fetchNearbyPlaces("destination"),
                      setShowDropdownSource(false);
                  }}
                >
                  <Image
                    className="size-8 mt-2 ml-1"
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/934/934640.png",
                    }}
                  />
                </Pressable>
              </View>
            </View>

            {showDropdownDestination && destinations.length > 0 && (
              <FlatList
                data={destinations}
                keyExtractor={(item) => item.id}
                style={{
                  maxHeight: 150,
                  borderColor: "#ddd",
                  borderWidth: 1,
                  borderTopWidth: 0,
                  borderRadius: 5,
                  marginTop: 5,
                  zIndex: 10,
                }}
                renderItem={({ item }) => (
                  <Pressable
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: "#eee",
                    }}
                    onPress={() => selectLocationDestination(item)}
                  >
                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                    <Text style={{ fontSize: 12, color: "#666" }}>
                      {item.address}
                    </Text>
                  </Pressable>
                )}
              />
            )}
          </View>
        </SafeAreaView>
      </View>

      <SuggestionBottom bus={bus} sapu={sapu} />
    </GestureHandlerRootView>
  );
}
