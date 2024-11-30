/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { DestinationInterface } from "@/types/sapu-types";
import {
  getCurrentLocationGoogleAPI,
  getNearbyLocationGoogleAPI,
  getPlaceFromNameGoogleAPI,
} from "@/api/google-map-api";
import { requestLocationPermission } from "@/utils/permission-utils";

export default function StartingPointScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState<DestinationInterface[]>([]);
  const router = useRouter();

  const handlePress = (item: DestinationInterface) => {
    // Navigate to sapu_home with the selected destination
    router.replace({
      pathname: "/sapu",
      params: {
        pickUpPoint: JSON.stringify(item),
      },
    });
  };

  // Function to fetch places based on search query
  const fetchPlaces = async (query: string) => {
    try {
      const places = await getPlaceFromNameGoogleAPI(query);

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
      // Get current location
      const location = await requestLocationPermission();

      // Fetch the place name for the current location
      const results = await getCurrentLocationGoogleAPI(location.coords);

      if (results.length <= 0) throw new Error("Current location not found");

      const currentLocationName = results[0].formatted_address;
      setSearchQuery(currentLocationName);

      // Fetch nearby places using Google Places API
      const places: DestinationInterface[] = await getNearbyLocationGoogleAPI(
        location.coords
      );

      setDestinations(places);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      Alert.alert("Error", "Unable to fetch nearby places.");
    }
  };

  useEffect(() => {
    // Fetch nearby places when the component mounts
    fetchNearbyPlaces();
  }, []);

  const renderDestinationItem = ({ item }: { item: DestinationInterface }) => (
    <TouchableOpacity
      className="flex-row items-center mb-4"
      onPress={() => handlePress(item)}
    >
      <View className="h-14 w-14 rounded-full bg-[#BFD5F8] justify-center items-center p-0">
        <Ionicons name="location-sharp" size={24} color={"#4285F4"} />
      </View>

      <View className="flex-1 ml-4">
        <Text numberOfLines={1} className="text-base font-bold text-gray-900">
          {item.name}
        </Text>
        <Text numberOfLines={1} className="text-sm text-gray-600 truncate">
          {item.address}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="flex-row bg-[#4285F4] h-32 gap-5 px-5">
        <View className="flex-row items-center flex-1 h-16 mt-4 gap-5">
          <TouchableOpacity
            // onPress={handleLocationPress}
            className="flex-row items-center flex-1"
          >
            <View className="flex-row items-center">
              <MaterialIcons
                className="mr-3"
                name="my-location"
                size={25}
                color={"white"}
              />
              <Text className="text-white text-xl font-bold">
                Set your Starting Point
              </Text>
            </View>
          </TouchableOpacity>
          <Image
            source={require("@/assets/icons/profile.png")}
            className="h-14 w-14 rounded-full bg-white"
          />
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-5 translate-y-[-30]">
        <View
          className={`flex-row items-center bg-white rounded-xl px-4 ${
            Platform.OS === "ios"
              ? "shadow-md py-5 shadow-slate-400"
              : "shadow-lg py-3 shadow-black"
          }`}
        >
          <TextInput
            className="flex-1 text-[16px] text-black"
            placeholder="Your destination"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <MaterialIcons name="location-on" size={24} color={"#ADAEB9"} />
        </View>
      </View>

      {/* Current Location Button */}
      <TouchableOpacity
        onPress={fetchNearbyPlaces}
        className="mx-6 bg-blue-100 rounded-md px-4 py-3 flex-row items-center"
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
        className="px-5 mt-5"
      />
    </View>
  );
}
