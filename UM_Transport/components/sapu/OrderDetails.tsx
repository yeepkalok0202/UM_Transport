import { View, Text } from "react-native";
import React from "react";
import LocationDetails from "../ui/sapu/LocationDetails";
import { LocationDetailsInterface } from "@/types/sapu-types";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props {
  startLocation: LocationDetailsInterface;
  destinationLocation: LocationDetailsInterface;
  paymentMethod: string;
  fareAmount: string;
}

const OrderDetails = ({
  startLocation,
  destinationLocation,
  paymentMethod,
  fareAmount,
}: Props) => {
  return (
    <View className="bg-white p-4 border-y-4 border-[#EFF3FE] ">
      <LocationDetails
        startLocation={startLocation}
        destinationLocation={destinationLocation}
      />
      <View className="bg-white flex-row items-center mt-4 gap-5">
        <FontAwesome5 name="credit-card" size={30} color={"#D3E1F1"} />
        <View className="flex-1">
          <Text className="text-black text-[16px]">{paymentMethod}</Text>
        </View>
        <Text className="text-[16px] font-bold text-black mt-1 mr-4">
          {fareAmount}
        </Text>
      </View>
    </View>
  );
};

export default OrderDetails;
