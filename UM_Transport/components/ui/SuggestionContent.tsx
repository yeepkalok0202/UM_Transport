import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Icon } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";

interface SuggestionContentProps {
  bus: {
    type: string;
    name: string;
    fee: string;
    time: number;
    waitingTime: number;
  }[];
  sapu: {
    fee: string;
    time: number;
  };
  setSelectedBus: (bus: {
    type: string;
    name: string;
    fee: string;
    time: number;
    waitingTime: number;
  }) => void;
  setActiveContent: (content: string) => void;
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const SuggestionContent: React.FC<SuggestionContentProps> = ({
  bus,
  sapu,
  setSelectedBus,
  setActiveContent,
  bottomSheetRef,
}) => {
  return (
    <BottomSheetView style={styles.contentContainer}>
      <Text style={{ color: "#9A9A9A", fontSize: 16, fontWeight: "600" }}>
        Travel Suggestion
      </Text>
      <View style={{ marginTop: 6 }}>
        {bus.map((bus, index) => (
          <View key={index}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setSelectedBus(bus);
                setActiveContent("busSelected");
                bottomSheetRef.current?.snapToIndex(1);
              }}
            >
              <View
                style={[
                  styles.rowContainer,
                  { justifyContent: "space-between", marginBottom: 12 },
                ]}
              >
                <View style={styles.rowContainer}>
                  <Icon source="bus" size={30} color="#5686E1" />
                  <Text style={[styles.detailsTitle, { marginLeft: 4 }]}>
                    {bus.type + "\n"}
                    <Text style={[styles.detailsText, { fontSize: 22 }]}>
                      {bus.name}
                    </Text>
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.detailsTitle}>
                    💵 Fee{"\n"}
                    <Text style={styles.detailsText}>{bus.fee}</Text>
                  </Text>
                  <Text
                    style={[
                      styles.detailsTitle,
                      { marginLeft: 28, marginRight: 8 },
                    ]}
                  >
                    ⌛ Travel{"\n"}
                    <Text style={styles.detailsText}>{bus.time + " mins"}</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        {/* Or Travel With */}
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View style={{ backgroundColor: "#4285F4", width: 12, height: 1 }} />
          <Text style={{ color: "black", marginHorizontal: 8 }}>
            Or Travel With
          </Text>
          <View style={{ backgroundColor: "#4285F4", width: 12, height: 1 }} />
        </View>

        <TouchableOpacity activeOpacity={0.6}>
          <View
            style={[
              styles.rowContainer,
              { justifyContent: "space-between", marginBottom: 12 },
            ]}
          >
            <View style={styles.rowContainer}>
              <Icon source="car" size={30} color="#5686E1" />
              <Text
                style={[styles.detailsText, { fontSize: 22, marginLeft: 4 }]}
              >
                SAPU
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.detailsTitle}>
                💵 Fee{"\n"}
                <Text style={styles.detailsText}>{sapu.fee}</Text>
              </Text>
              <Text
                style={[
                  styles.detailsTitle,
                  { marginLeft: 28, marginRight: 8 },
                ]}
              >
                ⌛ Travel{"\n"}
                <Text style={styles.detailsText}>{sapu.time + " mins"}</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            padding: 16,
            backgroundColor: "white",
            borderRadius: 12,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.detailsText, { fontSize: 22 }]}>Others</Text>
            <Icon source="chevron-right" size={30} color="#B7B7B7" />
          </View>
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
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

export default SuggestionContent;
