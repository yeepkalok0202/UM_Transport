import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";
import CircularProgress from "./CircularProgress";
import ScanCard from "./ScanCard";

const RideCard = () => {
  return (
    <Card style={[styles.card]}>
      <Card.Content
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          paddingHorizontal: 24,
        }}
      >
        <View className="flex-1" style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "#FF9C2F",
              marginBottom: 10,
            }}
          >
            Your Ride
          </Text>
          <CircularProgress progress={0.2} />
        </View>

        <View className="flex-1">
          <ScanCard
            title="Public Transport"
            scanCount="10"
            scanText="rides this week"
          />
          <ScanCard
            title="Ride Hailing"
            scanCount="2"
            scanText="rides this week"
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
  },
  progressBar: {
    borderRadius: 8,
    backgroundColor: "lightgray",
    height: 8,
    padding: 0,
    marginTop: 4,
  },
  bothScanContainer: {
    // marginRight: 10,
  },
});

export default RideCard;
