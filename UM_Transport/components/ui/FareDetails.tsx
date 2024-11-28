import React, { useRef, useEffect } from "react";
import { Animated, View, Text, Image, StyleSheet } from "react-native";

interface FareDetailsProps {
  isSearching: boolean;
  startLocation: {
    name: string;
    address: string;
  };
  destinationLocation: {
    name: string;
    address: string;
  };
  fareAmount: string;
  walletAmount: string;
  timeEstimate: string;
  paymentMethod: string;
}

const FareDetails: React.FC<FareDetailsProps> = ({
  isSearching,
  startLocation,
  destinationLocation,
  fareAmount,
  walletAmount,
  timeEstimate,
  paymentMethod,
}) => {
  const position = useRef(new Animated.Value(90)).current; // Initial bottom position

  useEffect(() => {
    // Animate to the new position when isRideStarted changes
    Animated.timing(position, {
      toValue: isSearching ? 40 : 90,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isSearching]);

  return (
    <Animated.View
      style={[
        styles.fareDetails, // Base styles
        { bottom: position }, // Animated bottom position
      ]}
    >
      {isSearching && (
        <View style={styles.searchingContainer}>
          <Image
            source={require("@/assets/icons/blue_car.png")}
            style={styles.icon}
          />
          <Text style={styles.lookingText}>Looking for a ride...</Text>
        </View>
      )}
      <View style={[styles.container, styles.shadow]}>
        {!isSearching && (
          <>
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
            <View style={styles.divider} />
          </>
        )}
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
      </View>
      <View style={styles.payment}>
        <Image
          source={require("@/assets/icons/payment_icon.png")}
          style={styles.paymentIcon}
        />
        <View style={styles.paymentTextContainer}>
          <Text
            style={[
              styles.paymentText,
              { color: isSearching ? "black" : "#666666" },
            ]}
          >
            {paymentMethod}
          </Text>
          {!isSearching && (
            <Text style={styles.paymentAmount}>{walletAmount}</Text>
          )}
        </View>
        {!isSearching ? (
          <Image
            source={require("@/assets/icons/other_payment.png")}
            style={styles.paymentIcon}
          />
        ) : (
          <Text style={[styles.paymentAmount, { marginRight: 16 }]}>
            {fareAmount}
          </Text>
        )}
      </View>
    </Animated.View>
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
    left: 16,
    right: 16,
    backgroundColor: "transparent",
    elevation: 5,
    zIndex: 3,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  searchingContainer: {
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
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
    borderTopWidth: 5,
    borderColor: "#EFF3FE",
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 16,
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
  lookingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4285F4",
    textAlign: "center",
  },
});

export default FareDetails;
