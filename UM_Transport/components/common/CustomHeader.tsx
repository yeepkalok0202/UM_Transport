import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  title: string;
  navigateBack: () => void;
}

const CustomHeader = ({ title, navigateBack }: Props) => {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="absolute top-0 left-0 right-0 bg-white shadow-md shadow-slate-300 z-[99] py-6 flex-row items-center px-2"
    >
      <View className="w-full">
        <TouchableOpacity
          onPress={navigateBack}
          className="z-[2]"
          activeOpacity={0.6}
        >
          <Entypo name="chevron-left" size={24} color={"black"} />
        </TouchableOpacity>
        <Text className="absolute left-0 right-0 text-[18px] font-semibold text-center">
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;
