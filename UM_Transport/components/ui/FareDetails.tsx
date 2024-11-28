import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface FareDetailsProps {
  isBooked: boolean;
  startLocation: {
    name: string;
    address: string;
  };
  destinationLocation: {
    name: string;
    address: string;
  };
  fareAmount: string;
  timeEstimate: string;
  paymentMethod: string;
}

const FareDetails: React.FC<FareDetailsProps> = ({
  isBooked,
  startLocation,
  destinationLocation,
  fareAmount,
  timeEstimate,
  paymentMethod,
}) => {
  return (
    <View style={styles.fareDetails}>
      {isBooked ? (
        <View className="flex-row items-center justify-center space-x-2">
          <Image
            source={require("@/assets/icons/blue_car.png")}
            style={styles.icon}
          />
          <Text style={styles.lookingText}>Looking for a ride...</Text>
        </View>
      ) : (
        <View style={styles.fareRow}>
          <Text style={styles.fareAmount}>{fareAmount}</Text>
          <View style={styles.fareTimeContainer}>
            <Image
              source={require("@/assets/icons/clock_icon.png")}
              style={styles.icon}
            />
            <Text style={styles.fareTime}>{timeEstimate}</Text>
          </View>
        </View>
      )}
      <View style={styles.divider} />
      <View style={styles.locations}>
        <View style={styles.locationRow}>
          <Image
            source={require("@/assets/icons/start_point_icon.png")}
            style={styles.startIcon}
          />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationName}>{startLocation.name}</Text>
            <Text style={styles.locationAddress}>{startLocation.address}</Text>
          </View>
        </View>
        <View style={styles.dotsContainer}>
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
      <View style={styles.divider} />
      <View style={styles.payment}>
        <Image
          source={require("@/assets/icons/payment_icon.png")}
          style={styles.paymentIcon}
        />
        <View style={styles.paymentTextContainer}>
          <Text style={styles.paymentText}>{paymentMethod}</Text>
          <Text style={styles.paymentAmount}>{fareAmount}</Text>
        </View>
        <Image
          source={require("@/assets/icons/other_payment.png")}
          style={styles.otherPaymentIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Retain existing styles
  fareDetails: {
    position: "absolute",
    bottom: 90,
    left: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 3,
  },
  fareRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  fareAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  fareTimeContainer: {
    width: 105,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF3FE",
    borderRadius: 15,
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: "#D2E2ED",
    borderRadius: 12,
  },
  fareTime: {
    fontSize: 16,
    color: "#666666",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },
  locations: {
    marginBottom: 16,
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
    marginTop: 8,
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
    justifyContent: "center",
    marginLeft: 10,
    height: 40,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: "#666",
    borderRadius: 3,
    marginVertical: 6,
  },
  payment: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 16,
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
    color: "#666666",
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 4,
  },
  otherPaymentIcon: {
    width: 30,
    height: 30,
    marginLeft: "auto",
  },
  lookingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4285F4",
    textAlign: "center",
  },
});

export default FareDetails;
