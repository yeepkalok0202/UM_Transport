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
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "blue",
      }}
    >
      <View style={styles.locationRow}>
        <Image
          source={require("@/assets/icons/start_point_icon.png")}
          style={styles.startIcon}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.locationName}>{startLocation.name}</Text>
          <Text style={styles.locationAddress}>{startLocation.address}</Text>
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
          <Text style={styles.locationName}>{destinationLocation.name}</Text>
          <Text style={styles.locationAddress}>
            {destinationLocation.address}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default LocationDetails;
