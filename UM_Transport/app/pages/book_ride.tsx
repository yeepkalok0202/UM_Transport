import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import FareDetails from "@/components/ui/FareDetails";
import DriverDetails from "@/components/ui/DriverDetails";
import ArrivalDetails from "@/components/ui/ArrivalDetails";

export default function BookRideScreen() {
  const [isBooked, setIsBooked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isDriverFound, setIsDriverFound] = useState(false);
  const [isArrived, setIsArrived] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log("Booking status changed: ", isBooked);

    if (isBooked) {
      const searchTimer = setTimeout(() => {
        console.log("Searching for driver...");
        setIsSearching(true);
        const driverTimer = setTimeout(() => {
          console.log("Driver found!");
          setIsDriverFound(true);
          const arrivedTimer = setTimeout(() => {
            console.log("Destination reached!");
            setIsArrived(true);
            setModalVisible(true);
            clearTimeout(arrivedTimer);
          }, 8000);
        }, 3000);
        return () => clearTimeout(driverTimer);
      }, 3000);
      return () => clearTimeout(searchTimer);
    }
  }, [isBooked]);

  useEffect(() => {
    console.log("modalVisible: ", modalVisible);
  }, [modalVisible]);

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
    <View style={{ flex: 1 }}>
      <ArrivalDetails
        destinationLocation={destinationLocation}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <MapView
        style={styles.container}
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
        <View
          style={{
            flex: 1,
            padding: 16,
          }}
        >
          {!isDriverFound && !isArrived && (
            <FareDetails
              isSearching={isSearching}
              startLocation={startLocation}
              destinationLocation={destinationLocation}
              fareAmount="RM5.00"
              walletAmount="RM50.00"
              timeEstimate="10 mins"
              paymentMethod="Siswacard"
            />
          )}
          {isDriverFound && !isArrived && (
            <DriverDetails
              startLocation={startLocation}
              destinationLocation={destinationLocation}
              fareAmount="RM5.00"
              timeEstimate={5}
              paymentMethod="Siswacard"
              driverName="Muhammad Ali bin Jamun"
              driverMatric="22005689"
              driverFaculty="Faculty of Science"
              driverCarPlate="RMB8964"
              driverCarModel="White - Proton Saga"
            />
          )}
        </View>
      </MapView>

      {!isSearching && (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
