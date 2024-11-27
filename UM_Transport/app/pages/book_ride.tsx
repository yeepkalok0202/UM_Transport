import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRouter } from 'expo-router'; 
import "nativewind";
import '../../global.css';

export default function BookRideScreen() {

  const router = useRouter();

  const [isBooked, setIsBooked] = useState(false);

  // Function to handle button click
  const handleBookingToggle = () => {
    setIsBooked(!isBooked); // Toggle booking state
  };

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
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* Route Polyline */}
        <Polyline
          coordinates={[
            { latitude: 37.7749, longitude: -122.4194 },
            { latitude: 37.8049, longitude: -122.4494 },
          ]}
          strokeColor="#4285F4"
          strokeWidth={4}
        />
        {/* Start Marker */}
        <Marker
          coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
          title="Start"
          description="Faculty of Computer Science"
        />
        {/* End Marker */}
        <Marker
          coordinate={{ latitude: 37.8049, longitude: -122.4494 }}
          title="Destination"
          description="Kolej Kediaman 12"
          pinColor="red"
        />
      </MapView>

      {/* Fare Details Section */}
      <View style={styles.fareDetails}>
        {isBooked ? (
            <View className="flex-row items-center justify-center space-x-2">
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
        <View style={styles.locations}>
          <View style={styles.locationRow}>
            <Image
                source={require('@/assets/icons/start_point_icon.png')} // Start location icon
                style={styles.startIcon}
            />
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationName}>
                Faculty of Computer Science & Information Technology
              </Text>
              <Text style={styles.locationAddress}>
                Gillette, WV, 26582, United States
              </Text>
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
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationName}>Kolej Kediaman 12</Text>
              <Text style={styles.locationAddress}>
                Mannington, WV, 26582, United States
              </Text>
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
          { backgroundColor: isBooked ? '#808080' : '#4285F4' }, // Change color dynamically
        ]}
        activeOpacity={0.85}
        onPress={handleBookingToggle}
      >
        <Text style={styles.bookNowText}>
          {isBooked ? 'Cancel Booking' : 'Book Now'} {/* Change text dynamically */}
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
    padding: 1
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
  },
  locationAddress: {
    fontSize: 14,
    color: '#666666',
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