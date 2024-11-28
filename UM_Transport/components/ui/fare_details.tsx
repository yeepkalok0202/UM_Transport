import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

// Define the props type
type FareDetailsProps = {
    isBooked: boolean;
    startPoint: string;
    startAddress: string;
    endPoint: string;
    endAddress: string;
  };

export default function FareDetails({
isBooked,
startPoint,
startAddress,
endPoint,
endAddress,
}: FareDetailsProps) {
  return (
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
            <Text style={styles.locationName} numberOfLines={2} ellipsizeMode="tail">
              {startPoint || 'Not Set'}
            </Text>
            <Text style={styles.locationAddress} numberOfLines={2} ellipsizeMode="tail">
              {startAddress || 'Not Set'}
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
          <View style={[styles.locationTextContainer, styles.paddedText]}>
            <Text style={styles.locationName} numberOfLines={2} ellipsizeMode="tail">
              {endPoint || 'Not Set'}
            </Text>
            <Text style={styles.locationAddress} numberOfLines={2} ellipsizeMode="tail">
              {endAddress || 'Not Set'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.payment}>
        <Image
          source={require('@/assets/icons/payment_icon.png')}
          style={styles.paymentIcon}
        />
        <View style={styles.paymentTextContainer}>
          <Text style={styles.paymentText}>Siswacard</Text>
          <Text style={styles.paymentAmount}>RM5.00</Text>
        </View>
        <Image
          source={require('@/assets/icons/other_payment.png')}
          style={styles.otherPaymentIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Include the styles for the fare details part
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
});
