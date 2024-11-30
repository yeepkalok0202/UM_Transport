import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Ionicons } from "@expo/vector-icons";
import { DestinationInterface, JourneyPlanInterface } from "@/types/sapu-types";
import { useRouter } from "expo-router";
import { createPreOrderAPI } from "@/api/sapu-api";
import { ACCESS_TOKEN } from "@/constants/environment-constant";

interface Props {
  item: DestinationInterface;
  startPoint?: DestinationInterface;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
const DestinationQueryResult = ({ item, startPoint, setIsLoading }: Props) => {
  const router = useRouter();

  // Function to navigate to Book Ride page with both starting and end points
  const navigateToBookRide = async () => {
    try {
      setIsLoading(true);
      if (!startPoint) return;

      const reqPayload: JourneyPlanInterface = {
        pickUpLocation: {
          longitude: startPoint.location.lng,
          latitude: startPoint.location.lat,
        },
        destination: {
          longitude: item.location.lng,
          latitude: item.location.lat,
        },
      };

      const res = await createPreOrderAPI(reqPayload, ACCESS_TOKEN);

      router.push({
        pathname: "/sapu/BookRide",
        params: {
          startPoint: startPoint.name,
          startAddress: startPoint.address,
          endPoint: item.name,
          endAddress: item.address,
          data: JSON.stringify(res),
        },
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Unable to get the route!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        className="flex-row items-center mb-4"
        onPress={navigateToBookRide} // Pass the selected destination as the end point
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
    </>
  );
};

export default DestinationQueryResult;
