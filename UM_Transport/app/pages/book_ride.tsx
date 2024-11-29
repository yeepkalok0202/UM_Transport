import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import FareDetails from "@/components/ui/FareDetails";
import DriverDetails from "@/components/ui/DriverDetails";
import ArrivalDetails from "@/components/ui/ArrivalDetails";

export default function BookRideScreen() {
  const [isBooked, setIsBooked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isDriverFound, setIsDriverFound] = useState(false);
  const [isArrived, setIsArrived] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    startPoint: rawStartPoint,
    endPoint: rawEndPoint,
    startAddress: rawStartAddress,
    endAddress: rawEndAddress,
  } = useGlobalSearchParams();
  const [isMounted, setIsMounted] = useState(true);
  const [startCoordinates, setStartCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [endCoordinates, setEndCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const mapRef = useRef<MapView | null>(null); // Create a reference to the MapView

  const getAsString = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) {
      return value[0]; // Use the first value if it's an array
    }
    return value || ""; // Return the string or a default empty string
  };

  const GOOGLE_MAPS_API_KEY = "AIzaSyBapQKkarYUNa-F4NAXcrWwJHJNeajYNuY";

  const startPoint = getAsString(rawStartPoint); // Ensure it's a string
  const endPoint = getAsString(rawEndPoint); // Ensure it's a string
  const startAddress = getAsString(rawStartAddress); // Ensure it's a string
  const endAddress = getAsString(rawEndAddress); // Ensure it's a string

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
    if (!modalVisible) {
      setIsBooked(false);
      setIsSearching(false);
      setIsDriverFound(false);
      setIsArrived(false);
    }
  }, [modalVisible]);

  // Cleanup logic to unmount the screen
  useFocusEffect(
    React.useCallback(() => {
      console.log("BookRideScreen mounted.");
      setIsMounted(true); // Set mounted when focused

      return () => {
        console.log("BookRideScreen unmounted.");
        setIsMounted(false); // Cleanup: simulate unmounting
      };
    }, [])
  );

  if (!isMounted) {
    return null; // Avoid rendering anything if unmounted
  }

  const handleBookingToggle = () => {
    setIsBooked(!isBooked);
  };

  // Function to fetch coordinates using Geocoding API
  const fetchCoordinates = async (address: string, isStartPoint: boolean) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );
      console.log("Geocoding Response: ", response.data);
      console.log(
        "Full Geocoding Response: ",
        JSON.stringify(response.data, null, 2)
      );
      const location = response.data.results[0]?.geometry.location;

      if (location) {
        if (isStartPoint) {
          setStartCoordinates({
            latitude: location.lat,
            longitude: location.lng,
          });
        } else {
          setEndCoordinates({
            latitude: location.lat,
            longitude: location.lng,
          });
        }
      } else {
        Alert.alert("Error", `Unable to fetch coordinates for ${address}`);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      Alert.alert("Error", "Failed to fetch coordinates. Please try again.");
    }
  };

  useEffect(() => {
    console.log("Map Ref:", mapRef.current);
    if (mapRef.current && startCoordinates && endCoordinates) {
      console.log("useEffect Triggered:", {
        startCoordinates,
        endCoordinates,
      });
      mapRef.current.fitToCoordinates([startCoordinates, endCoordinates], {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
      console.log("Adjusting map to fit coordinates");
    }
  }, [startCoordinates, endCoordinates]);

  // Fetch coordinates when component mounts
  useFocusEffect(
    React.useCallback(() => {
      console.log("BookRideScreen focused. Fetching coordinates.");
      if (startAddress) fetchCoordinates(startAddress, true); // Refetch start point coordinates
      if (endAddress) fetchCoordinates(endAddress, false); // Refetch end point coordinates

      return () => {
        console.log("BookRideScreen unfocused.");
      };
    }, [startAddress, endAddress]) // Dependencies ensure refetching when addresses change
  );

  useFocusEffect(
    React.useCallback(() => {
      // Reset coordinates when screen is focused
      setStartCoordinates(null);
      setEndCoordinates(null);
      if (mapRef.current) {
        mapRef.current = null; // Clear map reference
      }
      console.log("BookRideScreen mounted. State reset.");

      return () => {
        console.log("BookRideScreen unmounted.");
      };
    }, []) // Empty dependency array ensures it runs once when focused
  );

  const startLocation = {
    name: startPoint || "Destination",
    address: startAddress || "Unknown address",
  };

  const destinationLocation = {
    name: endPoint || "Destination",
    address: endAddress || "Unknown address",
  };

  return (
    <View style={styles.container}>
      <ArrivalDetails
        destinationLocation={destinationLocation}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <MapView
        ref={(ref) => (mapRef.current = ref)}
        style={styles.map}
        initialRegion={{
          latitude: startCoordinates?.latitude || 3.1219,
          longitude: startCoordinates?.longitude || 101.657,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onMapReady={() => {
          if (mapRef.current && startCoordinates && endCoordinates) {
            mapRef.current.fitToCoordinates(
              [startCoordinates, endCoordinates],
              {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
              }
            );
          }
        }}
      >
        {/* Start Marker */}
        {startCoordinates &&
          startCoordinates.latitude &&
          startCoordinates.longitude && (
            <Marker
              coordinate={{
                latitude: startCoordinates.latitude,
                longitude: startCoordinates.longitude,
              }}
              title={startPoint}
              description={startAddress || undefined}
              pinColor="green"
              onPress={() => {
                console.log("Start Marker Details:", {
                  coordinates: startCoordinates,
                  title: startPoint,
                  address: startAddress,
                });
              }}
            />
          )}

        {/* End Marker */}
        {endCoordinates &&
          endCoordinates.latitude &&
          endCoordinates.longitude && (
            <Marker
              coordinate={{
                latitude: endCoordinates.latitude,
                longitude: endCoordinates.longitude,
              }}
              title={endPoint || "Destination"}
              description={endAddress} // Ensure description is string or undefined
              pinColor="red"
              onPress={() => {
                console.log("End Marker Details:", {
                  coordinates: endCoordinates,
                  title: endPoint,
                  address: endAddress,
                });
              }}
            />
          )}

        {/* Route Polyline */}
        {startCoordinates && endCoordinates && (
          <Polyline
            coordinates={[
              {
                latitude: startCoordinates.latitude,
                longitude: startCoordinates.longitude,
              },
              {
                latitude: endCoordinates.latitude,
                longitude: endCoordinates.longitude,
              },
            ]}
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
