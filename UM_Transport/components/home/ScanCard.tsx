import React from "react";
import { View, StyleSheet } from "react-native";
import { Subheading, Text } from "react-native-paper";

interface ScanCardProps {
  title: string;
  scanCount: string;
  scanText: string;
}

const ScanCard: React.FC<ScanCardProps> = ({ title, scanCount, scanText }) => {
  return (
    <View className="flex-1 justify-end">
      <View style={styles.warranty}>
        <Subheading style={styles.subheading}>{title}</Subheading>
      </View>
      <View style={styles.scanContainer}>
        <View style={styles.pointsWrapper}>
          <View style={styles.scanInfo}>
            <Text
              style={styles.scanTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {scanCount}
            </Text>
            <Text style={[styles.scanText]}>{scanText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  warranty: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  subheading: {
    fontWeight: "bold",
  },
  scanContainer: {
    paddingLeft: 4,
  },
  pointsWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  scanInfo: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  scanTitle: {
    fontSize: 32,
    fontWeight: "bold",
    paddingRight: 2,
  },
  scanText: {
    fontSize: 10,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ScanCard;
