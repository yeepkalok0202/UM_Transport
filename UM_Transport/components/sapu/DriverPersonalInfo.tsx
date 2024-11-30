import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

interface Props {
  driverName: string;
  driverMatric: string;
  driverFaculty: string;
  driverCarPlate: string;
  driverCarModel: string;
}

const DriverPersonalInfo = ({
  driverName,
  driverMatric,
  driverFaculty,
  driverCarModel,
  driverCarPlate,
}: Props) => {
  return (
    <View>
      <View className="flex-row justify-between items-center">
        <Image
          className="h-[60] w-[60] rounded-full mb-2"
          source={require("@/assets/icons/driver.png")}
        />
        <View className="gap-1 items-end">
          <Text className="text-[24px]">{driverCarPlate}</Text>
          <Text className="text-[14px] text-[#9A9A9A]">{driverCarModel}</Text>
        </View>
      </View>
      <View className="flex-row gap-3 items-center">
        <View className="gap-1">
          <Text className="text-[16px] font-medium">{driverName}</Text>
          <Text className="text-[12px] text-[#9A9A9A]">
            {driverMatric} | {driverFaculty}
          </Text>
        </View>

        <TouchableOpacity
          className="border-[#A9BDDE] border-[1px] rounded-md items-center justify-center p-1"
          onPress={() => {}}
        >
          <Image
            className="h-[30] w-[30]"
            source={require("@/assets/icons/call.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverPersonalInfo;
