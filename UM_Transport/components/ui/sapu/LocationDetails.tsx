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
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("@/assets/icons/start_point_icon.png")}
          style={styles.icon}
        />
        <View>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <Image
          source={require("@/assets/icons/end_point_icon.png")}
          style={styles.icon}
        />
      </View>
      <View style={{ marginLeft: 8, paddingRight: 16 }}>
        <Text style={styles.locationName}>{startLocation.name}</Text>
        <Text style={styles.locationAddress}>
          {startLocation.address + "\n"}
        </Text>
        <Text style={styles.locationName}>{destinationLocation.name}</Text>
        <Text style={styles.locationAddress}>
          {destinationLocation.address}
        </Text>
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
  icon: {
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
  dot: {
    width: 3,
    height: 3,
    backgroundColor: "#666",
    borderRadius: 3,
    marginVertical: 4,
  },
});

export default LocationDetails;
