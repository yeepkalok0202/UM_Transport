import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import DriverPersonalInfo from "@/components/sapu/DriverPersonalInfo";
import OrderDetails from "@/components/sapu/OrderDetails";

interface DriverDetailsProps {
  startLocation: {
    name: string;
    address: string;
  };
  destinationLocation: {
    name: string;
    address: string;
  };
  fareAmount: string;
  timeEstimate: number;
  paymentMethod: string;
  driverName: string;
  driverMatric: string;
  driverFaculty: string;
  driverCarPlate: string;
  driverCarModel: string;
}

const DriverDetails: React.FC<DriverDetailsProps> = ({
  startLocation,
  destinationLocation,
  fareAmount,
  timeEstimate,
  paymentMethod,
  driverName,
  driverMatric,
  driverFaculty,
  driverCarPlate,
  driverCarModel,
}) => {
  const now = new Date();
  const arrivalTime = new Date(now.getTime() + timeEstimate * 60000);
  const formattedTime = arrivalTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [isArriving, setIsArriving] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsArriving(true);
    }, 3000);
  }, []);

  return (
    <View style={styles.fareDetails}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          height: 60,
          width: 60,
          borderRadius: 100,
          marginBottom: 16,
          backgroundColor: "#4285F4",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {}}
      >
        <Image
          style={{
            height: 40,
            width: 40,
          }}
          source={require("@/assets/icons/Police.png")}
        ></Image>
      </TouchableOpacity>
      <View style={styles.containerTop}>
        <View
          className={`flex-row justify-between ${
            !isArriving ? "items-start" : "items-center"
          }`}
        >
          <Text className="text-[16px] font-medium">
            {isArriving ? "Estimated arriving at" : "Driver is on the way"}
          </Text>
          <View className="justify-center">
            <Text className="text-right text-[16px] font-medium">
              {timeEstimate + " mins"}
            </Text>
            {!isArriving && (
              <Text className="text-[14px] text-[#9A9A9A]">
                Arriving at {formattedTime}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View
        style={[
          styles.containerMiddle,
          { borderTopWidth: 0, borderBottomWidth: 0 },
        ]}
      >
        <DriverPersonalInfo
          driverFaculty={driverFaculty}
          driverName={driverName}
          driverMatric={driverMatric}
          driverCarModel={driverCarModel}
          driverCarPlate={driverCarPlate}
        />
      </View>

      <OrderDetails
        startLocation={startLocation}
        destinationLocation={destinationLocation}
        paymentMethod={paymentMethod}
        fareAmount={fareAmount}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.containerBottom, styles.shadow]}
        onPress={() => {}}
      >
        <Text style={styles.cancel}>
          {isArriving ? "Emergency call" : "Cancel Booking"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fareDetails: {
    position: "absolute",
    bottom: 40,
    left: 16,
    right: 16,
    backgroundColor: "transparent",
    elevation: 5,
    zIndex: 3,
  },
  containerTop: {
    backgroundColor: "#F4F4F4",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  containerMiddle: {
    backgroundColor: "white",
    padding: 16,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#EFF3FE",
    paddingBottom: 16,
  },
  containerBottom: {
    backgroundColor: "white",
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: "center",
  },
  cancel: {
    fontSize: 16,
    color: "#E95F5F",
  },
});

export default DriverDetails;
