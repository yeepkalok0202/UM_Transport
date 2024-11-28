import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios'; 
import "nativewind";
import '../../global.css';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBapQKkarYUNa-F4NAXcrWwJHJNeajYNuY';

const getAsString = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0]; // Use the first value if it's an array
  }
  return value || ''; // Return the string or a default empty string
};

export const unstable_settings = {
  reloadOnBlur: true, // Forces the screen to reload when navigated back to
};


export default function BookRideScreen() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(true);
  const { startPoint: rawStartPoint, endPoint: rawEndPoint, startAddress: rawStartAddress, endAddress: rawEndAddress } = useGlobalSearchParams();
  const [isBooked, setIsBooked] = useState(false);
  const [startCoordinates, setStartCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [endCoordinates, setEndCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const mapRef = useRef<MapView | null>(null); // Create a reference to the MapView
  const startPoint = getAsString(rawStartPoint); // Ensure it's a string
  const endPoint = getAsString(rawEndPoint); // Ensure it's a string
  const startAddress = getAsString(rawStartAddress); // Ensure it's a string
  const endAddress = getAsString(rawEndAddress); // Ensure it's a string

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

  // Function to toggle booking state
  const handleBookingToggle = () => {
    setIsBooked(!isBooked);
  };

  // Function to fetch coordinates using Geocoding API
  const fetchCoordinates = async (address: string, isStartPoint: boolean) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
      );
      console.log("Geocoding Response: ", response.data);
      console.log("Full Geocoding Response: ", JSON.stringify(response.data, null, 2));
      const location = response.data.results[0]?.geometry.location;

      if (location) {
        if (isStartPoint) {
          setStartCoordinates({ latitude: location.lat, longitude: location.lng });
        } else {
          setEndCoordinates({ latitude: location.lat, longitude: location.lng });
        }
      } else {
        Alert.alert('Error', `Unable to fetch coordinates for ${address}`);
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      Alert.alert('Error', 'Failed to fetch coordinates. Please try again.');
    }
  };
  
  useEffect(() => {
    console.log('Map Ref:', mapRef.current);
    if (mapRef.current && startCoordinates && endCoordinates) {
      console.log('useEffect Triggered:', { startCoordinates, endCoordinates });
      mapRef.current.fitToCoordinates([startCoordinates, endCoordinates], {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
      console.log('Adjusting map to fit coordinates');
    }
  }, [startCoordinates, endCoordinates]);

  // Fetch coordinates when component mounts
  useFocusEffect(
    React.useCallback(() => {
      console.log('BookRideScreen focused. Fetching coordinates.');
      if (startAddress) fetchCoordinates(startAddress, true); // Refetch start point coordinates
      if (endAddress) fetchCoordinates(endAddress, false); // Refetch end point coordinates
  
      return () => {
        console.log('BookRideScreen unfocused.');
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
      console.log('BookRideScreen mounted. State reset.');
  
      return () => {
        console.log('BookRideScreen unmounted.');
      };
    }, []) // Empty dependency array ensures it runs once when focused
  );
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('@/assets/icons/back_icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book a Ride</Text>
      </View>

      {/* Map Section */}
      <MapView
        ref={(ref) => (mapRef.current = ref)}
        style={styles.map}
        initialRegion={{
          latitude: startCoordinates?.latitude || 3.1219,
          longitude: startCoordinates?.longitude || 101.6570,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onMapReady={() => {
          if (mapRef.current && startCoordinates && endCoordinates) {
            mapRef.current.fitToCoordinates([startCoordinates, endCoordinates], {
              edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
              animated: true,
            });
          }
        }}
      >
        {/* Start Marker */}
        {startCoordinates && startCoordinates.latitude && startCoordinates.longitude &&(
          <Marker
            coordinate={{
              latitude: startCoordinates.latitude, 
              longitude: startCoordinates.longitude
            }}
            title={startPoint}
            description={startAddress || undefined}
            pinColor="green"
            onPress={() => {
              console.log('Start Marker Details:', {
                coordinates: startCoordinates,
                title: startPoint,
                address: startAddress
              });
            }}
          />
        )}

        {/* End Marker */}
        {endCoordinates && endCoordinates.latitude && endCoordinates.longitude &&(
          
          <Marker
            coordinate={{
              latitude: endCoordinates.latitude, 
              longitude: endCoordinates.longitude
            }}
            title={endPoint || 'Destination'}
            description={endAddress} // Ensure description is string or undefined
            pinColor="red"
            onPress={() => {
              console.log('End Marker Details:', {
                coordinates: endCoordinates,
                title: endPoint,
                address: endAddress
              });
            }}
          />
        )}

        {/* Route Polyline */}
        {startCoordinates && endCoordinates && (
          <Polyline
            coordinates={[
              { latitude: startCoordinates.latitude, longitude: startCoordinates.longitude },
              { latitude: endCoordinates.latitude, longitude: endCoordinates.longitude },
            ]}
            strokeColor="#4285F4"
            strokeWidth={4}
          />
        )}
      </MapView>

      {/* Fare Details Section */}
      <View style={styles.fareDetails}>
        {isBooked ? (
          <View style={styles.rideStatusContainer}>
            <Image source={require('@/assets/icons/blue_car.png')} style={styles.icon} />
            <Text style={styles.lookingText}>Looking for a ride...</Text>
          </View>
        ) : (
          <View style={styles.fareRow}>
            <Text style={styles.fareAmount}>RM5.00</Text>
            <View style={styles.fareTimeContainer}>
              <Image source={require('@/assets/icons/clock_icon.png')} style={styles.icon} />
              <Text style={styles.fareTime}>10 mins</Text>
            </View>
          </View>
        )}
        <View style={styles.divider} />
        <View style={[styles.locations, styles.paddedContainer]}>
          <View style={styles.locationRow}>
            <Image
              source={require('@/assets/icons/start_point_icon.png')}
              style={styles.startIcon}
            />
            <View style={[styles.locationTextContainer, styles.paddedText]}>
              <Text style={styles.locationName} numberOfLines={2} ellipsizeMode="tail">{startPoint || 'Not Set'}</Text>
              <Text style={styles.locationAddress} numberOfLines={2} ellipsizeMode="tail">{startAddress || 'Not Set'}</Text>
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
              source={require('@/assets/icons/end_point_icon.png')}
              style={styles.endIcon}
            />
            <View style={[styles.locationTextContainer, styles.paddedText]}>
              <Text style={styles.locationName} numberOfLines={2} ellipsizeMode="tail">{endPoint || 'Not Set'}</Text>
              <Text style={styles.locationAddress} numberOfLines={2} ellipsizeMode="tail">{endAddress || 'Not Set'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.payment}>
          <Image
            source={require('@/assets/icons/payment_icon.png')} // Payment icon
            style={styles.paymentIcon}
          />
          <View style={styles.paymentTextContainer}>
            <Text style={styles.paymentText}>Siswacard</Text>
            <Text style={styles.paymentAmount}>RM5.00</Text>
          </View>
          <Image
            source={require('@/assets/icons/other_payment.png')} // Other payment icon
            style={styles.otherPaymentIcon}
          />
        </View>
      </View>

      {/* Book Now Button */}
      <TouchableOpacity
        style={[
          styles.bookNowButton,
          { backgroundColor: isBooked ? '#808080' : '#4285F4' },
        ]}
        activeOpacity={0.85}
        onPress={handleBookingToggle}
      >
        <Text style={styles.bookNowText}>
          {isBooked ? 'Cancel Booking' : 'Book Now'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    zIndex: 2, // Ensure it stays above the map
  },
  backButton: {
    left: 16,
    zIndex: 1
  },
  backIcon: {
    height: 15,
    width: 15,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  map: {
    flex: 1, // Map takes the entire screen space
  },
  fareDetails: {
    position: 'absolute',
    bottom: 90, // Position above the "Book Now" button
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
    zIndex: 3, // Ensure it stays above the map
  },
  paddedContainer: {
    paddingHorizontal: 8, // Additional padding for nested containers
  },
  paddedText: {
    paddingHorizontal: 4, // Prevent text from sticking to the edge
  },
  fareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  fareAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  fareTimeContainer: {
    width: 105,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#EFF3FE',
    borderRadius: 15 
  },
  rideStatusContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: '#D2E2ED',
    borderRadius: 12 
  },
  fareTime: {
    fontSize: 16,
    color: '#666666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  locations: {
    marginBottom: 16,
  },
  locationTextContainer:{
    padding: 1,
    flex: 1, // Allow text to take available space
    flexShrink: 1, // Allow shrinking to prevent overflow
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  destinationLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  startIcon:{
    marginRight: 12,
    width: 25,
    height: 25
  },
  endIcon:{
    marginRight: 12,
    width: 25,
    height: 25
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flexShrink: 1, // Shrink text to fit
    overflow: 'hidden', // Ensure no visual overflow
  },
  locationAddress: {
    fontSize: 14,
    color: '#666666',
    flexShrink: 1, // Shrink text to fit
    overflow: 'hidden', // Ensure no visual overflow
  },
  dotsContainer: {
    justifyContent: 'center', 
    marginLeft: 10, 
    height: 40, 
  },
  dot: {
    width: 5, 
    height: 5,
    backgroundColor: '#666', 
    borderRadius: 3, 
    marginVertical: 6, 
  },
  payment: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically align items
    paddingVertical: 8,
    marginBottom: 16,
  },
  paymentIcon: {
    width: 30,
    height: 30, // Adjust size for the payment icon
    marginRight: 12, // Space between icon and text
  },
  paymentTextContainer: {
    flex: 1, // Allow text container to occupy available space
    flexDirection: 'column', // Stack Siswacard and RM5.00 vertically
  },
  paymentText: {
    fontSize: 16,
    color: '#666666',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 4, // Add spacing between Siswacard and RM5.00
  },
  otherPaymentIcon: {
    width: 30,
    height: 30, // Adjust size for the other payment icon
    marginLeft: 'auto', // Push the icon to the right
  },
  lookingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4285F4',
    textAlign: 'center',
  },
  bookNowButton: {
    position: 'absolute',
    bottom: 20, 
    left: 16,
    right: 16,
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 10, 
    elevation: 5,
  },
  bookNowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});