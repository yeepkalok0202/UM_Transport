import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import axios from "axios";
import { useRouter, useGlobalSearchParams } from "expo-router";
import SafeView from "@/components/ui/SafeView";

// Define the type for a destination
type Destination = {
  id: string;
  name: string;
  address: string;
};

export default function SapuHomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const router = useRouter();
  const { startPoint, startAddress } = useGlobalSearchParams(); // Get the starting point from global search params
  const [endPoint, setEndPoint] = useState(""); // State for the selected end point

  const GOOGLE_MAPS_API_KEY = "AIzaSyBapQKkarYUNa-F4NAXcrWwJHJNeajYNuY";

  // Function to navigate to Book Ride page with both starting and end points
  const navigateToBookRide = (endPoint: string, endAddress: string) => {
    router.push({
      pathname: "/pages/sapu/book_ride",
      params: {
        startPoint: startPoint || "KK8, UM",
        startAddress: startAddress || "Not Set",
        endPoint: endPoint || "Not Set",
        endAddress: endAddress || "Not Set",
      },
    });
  };

  // Function to navigate to Starting Point selection page
  const handleLocationPress = () => {
    router.push("/pages/sapu/starting_point");
  };

  // Function to fetch places using Google Places API
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
      console.error("Error fetching places:", error);
    }
  };

  // Function to handle search input
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      fetchPlaces(text);
    }
  };

  // Render a single destination item
  const renderDestinationItem = ({ item }: { item: Destination }) => (
    <TouchableOpacity
      className="flex-row items-center mb-4 mx-2"
      onPress={() => navigateToBookRide(item.name, item.address)} // Pass the selected destination as the end point
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
    <SafeView>
      <StatusBar barStyle="light-content" backgroundColor="#4285F4" />
      {/* Header Section */}
      <View className="flex-row items-start justify-between bg-[#4285F4] px-5 pt-10 h-32">
        <TouchableOpacity
          onPress={handleLocationPress}
          className="flex-row items-center flex-1"
        >
          <Image
            source={require("@/assets/icons/location.png")}
            className="h-5 w-5 mr-3"
          />
          <Text
            className="text-white text-lg font-bold"
            style={{
              flexWrap: "wrap", // Allow wrapping
              maxWidth: "80%", // Constrain width for wrapping
              lineHeight: 20, // Adjust line height for readability
            }}
          >
            {startPoint || "KK8, UM"}
          </Text>
        </TouchableOpacity>
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
            placeholder="Your destination"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <Image
            source={require("@/assets/icons/searchbox_icon.png")}
            className="h-5 w-4"
          />
        </View>
      </View>

      {/* Destination List */}
      <FlatList
        data={destinations}
        renderItem={renderDestinationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 60, paddingHorizontal: 16 }}
      />
    </SafeView>
  );
}
