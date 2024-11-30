import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, TextInput, Platform } from "react-native";
const SearchBarView = () => {
  return (
    <View
      className={`flex-row items-center bg-white rounded-xl px-4 ${
        Platform.OS === "ios"
          ? "shadow-md py-5 shadow-gray-600"
          : "shadow-lg py-3 shadow-black"
      }`}
    >
      <TextInput
        className="flex-1 text-[16px] text-black"
        placeholder="Your destination"
        placeholderTextColor="#888"
      />
      <MaterialIcons name="location-on" size={24} color={"#ADAEB9"} />
    </View>
  );
};
export default SearchBarView;
