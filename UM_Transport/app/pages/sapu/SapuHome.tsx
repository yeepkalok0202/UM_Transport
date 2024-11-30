/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import DestinationQueryResult from "@/components/ui/sapu/DestinationQueryResult";
import {
  DestinationInterface,
  GoogleMapLocationInterface,
} from "@/types/sapu-types";
import {
  getCurrentLocationGoogleAPI,
  getNearbyLocationGoogleAPI,
  getPlaceFromNameGoogleAPI,
} from "@/api/google-map-api";
import { requestLocationPermission } from "@/utils/permission-utils";
import { ActivityIndicator } from "react-native-paper";
import { getAsString } from "@/utils/common-utils";

export default function SapuHomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState<DestinationInterface[]>([]);

  const { pickUpPoint } = useGlobalSearchParams();

  let pickUpLocation: DestinationInterface | undefined;
  if (pickUpPoint) {
    pickUpLocation = JSON.parse(getAsString(pickUpPoint));
  }

  const [startPoint, setStartPoint] = useState<
    DestinationInterface | undefined
  >(pickUpLocation ?? undefined);

  // Function to navigate to Starting Point selection page
  const handleLocationPress = () => router.replace("/pages/sapu/StartingPoint");

  // Function to fetch places using Google Places API
  const fetchPlaces = async (query: string) => {
    try {
      const places = await getPlaceFromNameGoogleAPI(query);
      setDestinations(places);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  // Function to fetch current location and nearby places
  const fetchNearbyPlaces = useCallback(async () => {
    try {
      // Get current location
      const location = await requestLocationPermission();

      // Fetch the place name for the current location
      const results: GoogleMapLocationInterface[] =
        await getCurrentLocationGoogleAPI(location.coords);

      if (results.length <= 0) throw new Error("Current location not found");

      if (!startPoint) {
        setStartPoint({
          id: results[0].place_id,
          name: results[0].formatted_address,
          location: results[0].geometry.location,
          address: results[0].formatted_address,
        });
      }

      // Fetch nearby places using Google Places API
      const places: DestinationInterface[] = await getNearbyLocationGoogleAPI(
        location.coords
      );
      setDestinations(places);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      Alert.alert("Error", "Unable to fetch nearby places.");
    }
  }, []);

  useEffect(() => {
    fetchNearbyPlaces();
  }, [fetchNearbyPlaces]);

  // Function to handle search input
  const handleSearch = (text: string) => setSearchQuery(text);

  useEffect(() => {
    if (searchQuery === "") {
      setDestinations([]);
    }
    fetchPlaces(searchQuery);
  }, [searchQuery]);

  // Render a single destination item
  const renderDestinationItem = ({ item }: { item: DestinationInterface }) => (
    <DestinationQueryResult
      item={item}
      startPoint={startPoint}
      setIsLoading={setIsLoading}
    />
  );

  return (
    <>
      {isLoading && (
        <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-40 justify-center items-center z-[99]">
          <ActivityIndicator size={30} />
        </View>
      )}
      <View className="flex-1 bg-white">
        {/* Header Section */}
        <View className="flex-row bg-[#4285F4] h-32 gap-5 px-5">
          <View className="flex-row items-center flex-1 h-16 mt-4 gap-5">
            <TouchableOpacity
              onPress={handleLocationPress}
              className="flex-row items-center flex-1"
            >
              <View className="flex-row items-center">
                <MaterialIcons
                  className="mr-3"
                  name="my-location"
                  size={25}
                  color={"white"}
                />
                <Text
                  numberOfLines={1}
                  className="text-white text-xl font-semibold flex-1"
                >
                  {startPoint?.address}
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

        {/* Destination List */}
        <FlatList
          data={destinations}
          renderItem={renderDestinationItem}
          keyExtractor={(item) => item.id}
          className="px-5"
        />
      </View>
    </>
  );
}
