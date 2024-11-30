import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Icon } from "react-native-paper";
import SuggestionBottom from "@/components/ui/SuggestionBottom";

const Test = () => {
  const bus = [
    {
      type: "UM Shuttle Bus",
      name: "Route AB",
      fee: "Free",
      time: 15,
      waitingTime: 5,
    },
    { type: "Rapid KL", name: "T815", fee: "RM1.00", time: 20, waitingTime: 5 },
    { type: "Rapid KL", name: "T789", fee: "RM1.00", time: 35, waitingTime: 5 },
  ];

  const sapu = { fee: "RM5.00", time: 10 };

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "blue" }}>
        <Text style={{ fontSize: 60 }}>Test</Text>
        <Text style={{ fontSize: 60 }}>Test</Text>
        <Text style={{ fontSize: 60 }}>Test</Text>
        <Text style={{ fontSize: 60 }}>Test</Text>
        <Text style={{ fontSize: 60 }}>Test</Text>
        <Text style={{ fontSize: 60 }}>Test</Text>
        <Text style={{ fontSize: 60 }}>Test</Text>
        <Text style={{ fontSize: 60 }}>Test</Text>
        <Text style={{ fontSize: 60 }}>Test</Text>
        <Text style={{ fontSize: 60 }}>Test</Text>
      </View>
      <SuggestionBottom bus={bus} sapu={sapu} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F1F3F7",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 16,
  },
  detailsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  detailsTitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "#979797",
  },
});

export default Test;
