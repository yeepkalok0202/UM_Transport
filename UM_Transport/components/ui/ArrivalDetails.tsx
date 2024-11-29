import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface ArrivalDetailsProps {
  destinationLocation: {
    name: string;
    address: string;
  };
  isVisible: boolean;
  onClose: () => void;
}

const ArrivalDetails: React.FC<ArrivalDetailsProps> = ({
  destinationLocation,
  isVisible,
  onClose,
}) => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const dayOfWeek = now.toLocaleDateString("en-GB", { weekday: "long" });
  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const formattedOutput = `${formattedDate} (${dayOfWeek}) ${formattedTime}`;

  const [rating, setRating] = useState(0);

  const handleRating = (star: number) => {
    if (star === rating) {
      setRating(0); // Deselect if the same star is clicked
    } else {
      setRating(star); // Set rating to the selected star
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose} // Handle back button press for Android
    >
      <View style={styles.modalOverlay}>
        <View style={styles.fareDetails}>
          <View style={{ padding: 16, paddingHorizontal: 24 }}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: 16,
              }}
            >
              Arrived at
            </Text>
            <View style={styles.destinationLocationRow}>
              <Image
                source={require("@/assets/icons/end_point_icon.png")}
                style={styles.endIcon}
              />
              <View
                style={{
                  marginBottom: 16,
                  flex: 1,
                }}
              >
                <Text style={styles.locationName}>
                  {destinationLocation.name}
                </Text>
                <Text style={styles.locationAddress}>
                  {destinationLocation.address}
                </Text>
                <Text style={{ marginTop: 4, fontWeight: "600" }}>
                  {formattedOutput}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Rate:</Text>
            <View style={{ flexDirection: "row" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                  <FontAwesome
                    name="star"
                    size={40}
                    color={star <= rating ? "#04A0E3" : "#7584A1"} // Conditional color
                    style={{ marginTop: 8, marginBottom: 16, marginRight: 8 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                backgroundColor: "#E5EBF0",
                height: 80,
                padding: 16,
                borderRadius: 12,
                marginBottom: 16,
              }}
            >
              <Text style={{ color: "#7584A1" }}>
                Leave your comments here...
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#4285F4",
                padding: 12,
                borderRadius: 12,
              }}
              onPress={onClose}
            >
              <Text style={styles.cancel}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  fareDetails: {
    width: "80%", // Adjust width of the modal
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  locationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 40,
  },
  containerBottom: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    alignItems: "center",
  },
  cancel: {
    fontSize: 18,
    color: "white",
    fontWeight: "400",
    textAlign: "center",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  destinationLocationRow: {
    flexDirection: "row",
    marginLeft: 8,
  },
  endIcon: {
    marginTop: 4,
    marginRight: 12,
    width: 25,
    height: 30,
  },
});

export default ArrivalDetails;
