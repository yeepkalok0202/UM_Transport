import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

interface LocationDetailsProps {
  startLocation: {
    name: string;
    address: string;
  };
  destinationLocation: {
    name: string;
    address: string;
  };
}

const LocationDetails: React.FC<LocationDetailsProps> = ({
  startLocation,
  destinationLocation,
}) => {
  return (
    <View>
      <View className="flex-row gap-4 items-center">
        <Ionicons name="caret-down-circle" size={24} color={"#4285F4"} />
        <View className="flex-1">
          <Text numberOfLines={1} className="font-bold text-[16px] text-black">
            {startLocation.name}
          </Text>
          <Text numberOfLines={1} className="text-[14px] text-gray-500">
            {startLocation.address}
          </Text>
        </View>
      </View>

      <View className="w-[24] items-center">
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <View className="flex-row gap-4 items-center">
        <Ionicons name="location-sharp" size={24} color={"#E95F5F"} />
        <View className="flex-1">
          <Text numberOfLines={1} className="font-bold text-[16px] text-black">
            {destinationLocation.name}
          </Text>
          <Text numberOfLines={1} className="text-[14px] text-gray-500">
            {destinationLocation.address}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 3,
    height: 3,
    backgroundColor: "#666",
    borderRadius: 3,
    marginVertical: 4,
  },
});

export default LocationDetails;
