import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

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
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {isArriving ? "Estimated arriving at" : "Driver is on the way"}
          </Text>
          <Text style={{ textAlign: "right", fontSize: 16, fontWeight: "500" }}>
            {timeEstimate + " mins" + "\n"}
            {!isArriving && (
              <Text style={{ fontSize: 14, color: "#9A9A9A" }}>
                Arriving at {formattedTime}
              </Text>
            )}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.containerMiddle,
          { borderTopWidth: 0, borderBottomWidth: 0 },
        ]}
      >
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 60,
                width: 60,
                borderRadius: 100,
                marginBottom: 8,
              }}
              source={require("@/assets/icons/driver.png")}
            ></Image>
            <Text style={{ textAlign: "right", fontSize: 24 }}>
              {driverCarPlate + "\n"}
              <Text style={{ fontSize: 14, color: "#9A9A9A" }}>
                {driverCarModel}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", lineHeight: 20 }}>
              {driverName + "\n"}
              <Text style={{ fontSize: 12, color: "#9A9A9A" }}>
                {driverMatric} | {driverFaculty}
              </Text>
            </Text>
            <TouchableOpacity
              style={{
                marginLeft: 10,
                borderColor: "#A9BDDE",
                borderWidth: 1.5,
                borderRadius: 10,
              }}
              onPress={() => {}}
            >
              <Image
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 0,
                }}
                source={require("@/assets/icons/call.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.containerMiddle}>
        <View
          style={{
            flexDirection: "column",
            alignSelf: "flex-start",
          }}
        >
          <View style={styles.locationRow}>
            <Image
              source={require("@/assets/icons/start_point_icon.png")}
              style={styles.startIcon}
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.locationName}>{startLocation.name}</Text>
              <Text style={styles.locationAddress}>
                {startLocation.address}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginLeft: 10,
              marginBottom: 4,
            }}
          >
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          <View style={styles.destinationLocationRow}>
            <Image
              source={require("@/assets/icons/end_point_icon.png")}
              style={styles.endIcon}
            />
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationName}>
                {destinationLocation.name}
              </Text>
              <Text style={styles.locationAddress}>
                {destinationLocation.address}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.payment}>
          <Image
            source={require("@/assets/icons/payment_icon.png")}
            style={styles.paymentIcon}
          />
          <View style={styles.paymentTextContainer}>
            <Text style={styles.paymentText}>{paymentMethod}</Text>
          </View>
          <Text style={styles.paymentAmount}>{fareAmount}</Text>
        </View>
      </View>
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
    backgroundColor: "#D9D9D9",
    padding: 16,
    paddingBottom: 8,
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
  icon: {
    height: 25,
    width: 25,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: "#D2E2ED",
    borderRadius: 12,
  },
  locationTextContainer: {
    padding: 1,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  destinationLocationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  startIcon: {
    marginRight: 12,
    width: 25,
    height: 25,
  },
  endIcon: {
    marginRight: 12,
    width: 25,
    height: 25,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  locationAddress: {
    fontSize: 14,
    color: "#666666",
  },
  dotsContainer: {
    flexDirection: "column",
    marginLeft: 10,
    height: 20,
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: "#666",
    borderRadius: 3,
    marginVertical: 2,
  },
  payment: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  paymentIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  paymentTextContainer: {
    flex: 1,
    flexDirection: "column",
  },
  paymentText: {
    fontSize: 16,
    color: "black",
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 4,
    marginRight: 16,
  },
  cancel: {
    fontSize: 16,

    color: "#E95F5F",
  },
});

export default DriverDetails;
