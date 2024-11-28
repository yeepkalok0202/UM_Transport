import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import FareDetails from "@/components/ui/FareDetails";

export default function BookRideScreen() {
  const [isBooked, setIsBooked] = useState(false);

  const handleBookingToggle = () => {
    setIsBooked(!isBooked);
  };

  const startLocation = {
    name: "Faculty of Computer Science & Information Technology",
    address: "insert address",
  };

  const destinationLocation = {
    name: "Kolej Kediaman 12",
    address: "insert address",
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Polyline
          coordinates={[
            { latitude: 37.7749, longitude: -122.4194 },
            { latitude: 37.8049, longitude: -122.4494 },
          ]}
          strokeColor="#4285F4"
          strokeWidth={4}
        />
        <Marker coordinate={{ latitude: 37.7749, longitude: -122.4194 }} />
        <Marker coordinate={{ latitude: 37.8049, longitude: -122.4494 }} />
      </MapView>

      <FareDetails
        isBooked={isBooked}
        startLocation={startLocation}
        destinationLocation={destinationLocation}
        fareAmount="RM5.00"
        timeEstimate="10 mins"
        paymentMethod="Siswacard"
      />

      <TouchableOpacity
        style={[
          styles.bookNowButton,
          { backgroundColor: isBooked ? "#808080" : "#4285F4" },
        ]}
        onPress={handleBookingToggle}
      >
        <Text style={styles.bookNowText}>
          {isBooked ? "Cancel Booking" : "Book Now"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  map: {
    flex: 1,
  },
  bookNowButton: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
  },
  bookNowText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
