import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";
import FareDetails from "@/components/ui/sapu/FareDetails";
import DriverDetails from "@/components/ui/sapu/DriverDetails";
import ArrivalDetails from "@/components/ui/sapu/ArrivalDetails";
import { Location } from "@/types/sapu-types";
import CustomHeader from "@/components/common/CustomHeader";
import useBookRideScreenParam from "@/hooks/useBookRideScreenParam";
import { customerCancelOrderAPI, placeOrderAPI } from "@/api/sapu-api";
import { ACCESS_TOKEN } from "@/constants/environment-constant";
import { ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";

export default function BookRideScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isDriverFound, setIsDriverFound] = useState(false);
  const [isArrived, setIsArrived] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState<Location[]>([]);
  const [routeDuration, setRouteDuration] = useState<string>("Loading...");
  const [fare, setFare] = useState<number>(0);
  const mapRef = useRef<MapView | null>(null); // Create a reference to the MapView
  const { startAddress, endAddress, startPoint, endPoint, preOrder } =
    useBookRideScreenParam();
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
    if (!modalVisible) {
      setIsBooked(false);
      setIsSearching(false);
      setIsDriverFound(false);
      setIsArrived(false);
    }
  }, [modalVisible]);

  const handleBookingToggle = async () => {
    try {
      setIsLoading(true);
      if (!preOrder) return;

      if (!isBooked) {
        await placeOrderAPI(
          { orderId: preOrder.orderId, placeOrder: true },
          ACCESS_TOKEN
        );
      } else {
        await customerCancelOrderAPI(preOrder.orderId, ACCESS_TOKEN);
        router.back();
      }

      setIsBooked((prev) => !prev);
    } catch (error) {
      console.log(error);
      Alert.alert("Unable to place the order, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mapRef.current && preOrder) {
      mapRef.current.fitToCoordinates(
        [preOrder.departFrom, preOrder.destination],
        {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        }
      );
    }
  }, [preOrder]);

  const startLocation = {
    name: startPoint,
    address: startAddress,
  };

  const destinationLocation = {
    name: endPoint,
    address: endAddress,
  };

  const fetchRoute = useCallback(async () => {
    try {
      if (!preOrder) return;

      const decodedCoordinates = polyline
        .decode(preOrder.encodedPolyline)
        .map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));

      setRouteCoordinates(decodedCoordinates);
      setRouteDuration(`${Math.ceil(preOrder.duration / 60)} mins`);
      setFare(preOrder.price);
    } catch (error) {
      console.log(error);
    }
  }, [preOrder]);

  useEffect(() => {
    if (preOrder) {
      fetchRoute(); // Fetch route when coordinates are available
    }
  }, []);

  const navigateBack = async () => {
    try {
      if (preOrder) {
        await customerCancelOrderAPI(preOrder.orderId, ACCESS_TOKEN);
      }
    } catch (error) {
      console.log(error);
    } finally {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigateBack={navigateBack} title="Book a Ride" />
      <ArrivalDetails
        destinationLocation={destinationLocation}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <MapView
        ref={(ref) => (mapRef.current = ref)}
        style={styles.map}
        initialRegion={
          preOrder
            ? {
                latitude: preOrder.departFrom.latitude,
                longitude: preOrder.departFrom.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }
            : undefined
        }
        onMapReady={() => {
          if (mapRef.current && preOrder) {
            mapRef.current.fitToCoordinates(
              [preOrder.departFrom, preOrder.destination],
              {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
              }
            );
          }
        }}
      >
        {/* Start Marker */}
        {preOrder && preOrder.departFrom && (
          <Marker
            coordinate={{
              latitude: preOrder.departFrom.latitude,
              longitude: preOrder.departFrom.longitude,
            }}
            title={startPoint}
            description={startAddress}
            pinColor="green"
            onPress={() => {
              console.log("Start Marker Details:", {
                coordinates: preOrder.departFrom,
                title: startPoint,
                address: startAddress,
              });
            }}
          />
        )}

        {/* End Marker */}
        {preOrder && preOrder.destination && (
          <Marker
            coordinate={{
              latitude: preOrder.destination.latitude,
              longitude: preOrder.destination.longitude,
            }}
            title={endPoint}
            description={endAddress} // Ensure description is string or undefined
            pinColor="red"
            onPress={() => {
              console.log("End Marker Details:", {
                coordinates: preOrder.destination,
                title: endPoint,
                address: endAddress,
              });
            }}
          />
        )}

        {/* Route Polyline */}
        {Array.isArray(routeCoordinates) && routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#4285F4"
            strokeWidth={4}
          />
        )}
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
              fareAmount={`RM ${fare.toLocaleString("en-MY", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              walletAmount="RM50.00"
              timeEstimate={routeDuration}
              paymentMethod="Siswacard"
            />
          )}
          {isDriverFound && !isArrived && (
            <DriverDetails
              startLocation={startLocation}
              destinationLocation={destinationLocation}
              fareAmount={`RM${fare}`}
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
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.bookNowText}>
              {isBooked ? "Cancel Booking" : "Book Now"}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  map: {
    flex: 1, // Map takes the entire screen space
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
