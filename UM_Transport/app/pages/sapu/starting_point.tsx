import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import "nativewind";
import "../../../global.css";

// Define the type for a destination
type Destination = {
  id: string;
  name: string;
  address: string;
};

export default function StartingPointScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const router = useRouter();

  const GOOGLE_MAPS_API_KEY = "AIzaSyBapQKkarYUNa-F4NAXcrWwJHJNeajYNuY";

  const handlePress = (startPoint: string, startAddress: string) => {
    // Navigate to sapu_home with the selected destination
    router.push({
      pathname: "/pages/sapu/sapu_home",
      params: {
        startPoint: startPoint,
        startAddress: startAddress,
      },
    });
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setDestinations([]);
  };

  // Function to fetch places based on search query
  const fetchPlaces = async (query: string) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const places = response.data.results.map((place: any) => ({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
      }));
      setDestinations(places);
    } catch (error) {
      console.error("Error fetching places: ", error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      fetchPlaces(text);
    } else {
      setDestinations([]);
    }
  };

  // Function to fetch current location and nearby places
  const fetchNearbyPlaces = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permissions are required to use this feature."
        );
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Fetch the place name for the current location
      const locationResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );

      if (locationResponse.data.results.length > 0) {
        const currentLocationName =
          locationResponse.data.results[0].formatted_address;
        setSearchQuery(currentLocationName);

        // Fetch nearby places using Google Places API
        const placesResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant|cafe|point_of_interest&key=${GOOGLE_MAPS_API_KEY}`
        );

        const places = placesResponse.data.results.map((place: any) => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity, // Vicinity is a short address for nearby places
        }));

        setDestinations(places);
      } else {
        Alert.alert("Error", "Unable to fetch the current location name.");
      }
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      Alert.alert("Error", "Unable to fetch nearby places.");
    }
  };

  useEffect(() => {
    // Fetch nearby places when the component mounts
    fetchNearbyPlaces();
  }, []);

  const renderDestinationItem = ({ item }: { item: Destination }) => (
    <TouchableOpacity
      className="flex-row items-center mb-4 mx-2"
      onPress={() => handlePress(item.name, item.address)}
    >
      <Image
        source={require("@/assets/icons/destination_icon.png")}
        className="ml-1 mr-5 h-10 w-10"
      />
      <View className="flex-1">
        <Text className="text-base font-bold text-gray-900">{item.name}</Text>
        <Text className="text-sm text-gray-600 truncate">{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="flex-row items-start justify-between bg-[#4285F4] px-5 pt-10 h-32">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("@/assets/icons/white_back_icon.png")}
            className="ml-3 mt-2 h-4 w-4"
          />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">
          Set your Starting Point
        </Text>
        <Image
          source={require("@/assets/icons/profile.png")}
          className="h-9 w-9 rounded-full bg-white"
        />
      </View>

      {/* Search Box */}
      <View className="absolute top-24 left-6 right-6 z-10">
        <View className="flex-row items-center bg-white rounded-md px-4 py-2 shadow-lg shadow-gray-700">
          <TextInput
            className="flex-1 text-base text-gray-800"
            placeholder="Search places"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity onPress={handleClearSearch}>
            <Image
              source={require("@/assets/icons/close.png")}
              className="h-7 w-7"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Current Location Button */}
      <TouchableOpacity
        onPress={fetchNearbyPlaces}
        className="mt-12 mx-6 bg-blue-100 rounded-md px-4 py-3 flex-row items-center"
      >
        <Image
          source={require("@/assets/icons/current_location_icon.png")}
          className="h-8 w-8 mr-2"
        />
        <Text className="text-black text-base font-bold ml-3">
          Current location
        </Text>
      </TouchableOpacity>

      {/* Destination List */}
      <FlatList
        data={destinations}
        renderItem={renderDestinationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 30, paddingHorizontal: 16 }}
      />
    </View>
  );
}
