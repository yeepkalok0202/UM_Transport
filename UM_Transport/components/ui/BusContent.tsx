import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Icon } from "react-native-paper";
import { router, useRouter } from "expo-router";
// import { getUri } from "axios";

interface BusContentProps {
  bus: {
    type: string;
    name: string;
    fee: string;
    time: number;
    waitingTime: number;
  } | null;
  setSelectedBus: (bus: {
    type: string;
    name: string;
    fee: string;
    time: number;
    waitingTime: number;
  }) => void;
  setActiveContent: (content: string) => void;
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const calculateTimes = (waitingTime: number, travelTime: number) => {
  const now = new Date();
  const departureTime = new Date(now.getTime() + waitingTime * 60000); // Add waiting time
  const arrivalTime = new Date(
    now.getTime() + travelTime * 60000 // Add remaining travel time
  );

  return { departureTime, arrivalTime };
};

const Money = (value: string) => {
  return (
    <View
      style={{
        backgroundColor: "#FEFAEF",
        borderRadius: 100,
        paddingRight: 16,
        marginRight: 6,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "#FCE3B9", padding: 8, borderRadius: 100 }}
        >
          <Icon source="cash-multiple" size={24} color="#DB944B" />
        </View>
        <Text style={[styles.detailsText, { fontSize: 15, marginLeft: 6 }]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const Time = (value: string) => {
  return (
    <View
      style={{
        backgroundColor: "#EFF3FE",
        borderRadius: 100,
        paddingRight: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "#D2E2ED", padding: 8, borderRadius: 100 }}
        >
          <Icon source="clock-time-nine" size={24} color="#5686E1" />
        </View>
        <Text style={[styles.detailsText, { fontSize: 15, marginLeft: 6 }]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const markers = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <Icon source="arrow-down-drop-circle" size={28} color="#5686E1" />
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
      <Icon source="arrow-down-drop-circle" size={28} color="#5686E1" />
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
      <Icon source="map-marker" size={34} color="#E95F5F" />
    </View>
  );
};

const announcementContent = [
  {
    icon: "home-flood",
    title: "Unable to pass through Jalan Universiti due to flooding",
    newsDescription: "Heavy rain has caused flooding on Jalan Universiti. Buses will be rerouted via Jalan 12/1. This may result in an additional delay of 10-15 minutes. Thank you for your understanding.",
    color: "#5686E1",
    backgroundColor: "#E5EBF0",
    newsURI: "https://media.freemalaysiatoday.com/wp-content/uploads/2021/12/LRT-Masjid-jamek-fb.jpg",
  },
];

const BusContent: React.FC<BusContentProps> = ({
  bus,
  setSelectedBus,
  setActiveContent,
}) => {
  if (!bus) return null;

  const router = useRouter();

  const { departureTime, arrivalTime } = calculateTimes(
    bus.waitingTime,
    bus.time
  );

  return (
    <BottomSheetView style={styles.contentContainer}>
      <TouchableOpacity
      style={{marginLeft:10, marginBottom:10}}
        onPress={() => {
          setActiveContent("suggestion");
        }}
      >
        <Text style={{ color: "#007AFF", fontSize: 18, fontWeight: "500" }}>
          {"<"} Back
        </Text>
      </TouchableOpacity>
      <View style={[styles.rowContainer, { justifyContent: "space-evenly" }]}>
        <View style={{ flexDirection: "row" }}>
          <Icon source="bus" size={40} color="#5686E1" />
          <Text
            style={[styles.detailsTitle, { marginLeft: 4, marginRight: 16 }]}
          >
            {bus?.type + "\n"}
            <Text style={[styles.detailsText, { fontSize: 20 }]}>
              {bus?.name}
            </Text>
          </Text>
        </View>
        {Money(bus?.fee || "")}
        {Time(bus?.time + " min" || "")}
      </View>
      <View style={[styles.rowContainer, { paddingHorizontal: 16 }]}>
        {markers()}
        <View style={{ marginLeft: 12 }}>
          <Text
            style={[styles.detailsText, { fontSize: 20, marginBottom: 20 }]}
          >
            {bus?.waitingTime + " mins\n"}
            <Text style={[styles.detailsTitle, { fontSize: 16 }]}>
              Expected waiting time
            </Text>
          </Text>
          <Text
            style={[styles.detailsText, { fontSize: 20, marginBottom: 20 }]}
          >
            {formatTime(departureTime) + "\n"}
            <Text style={[styles.detailsTitle, { fontSize: 16 }]}>
              Expected departure time
            </Text>
          </Text>
          <Text style={[styles.detailsText, { fontSize: 20 }]}>
            {formatTime(arrivalTime) + "\n"}
            <Text style={[styles.detailsTitle, { fontSize: 16 }]}>
              Expected arrival time
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <Text
        style={{
          color: "#9A9A9A",
          fontSize: 18,
          marginLeft: 16,
          marginBottom: 8,
        }}
      >
        Announcements
      </Text>
      {announcementContent.map((announcement, index) => (
        <TouchableOpacity
          key={index}
          style={{
            marginBottom: 16,
            flexDirection: "row",
            paddingHorizontal: 16,
          }}
          onPress={() => {
            router.push({
              pathname: "/pages/suggestion/suggestion_news",
              params: announcement,
            });
          }}
        >
          <View
            style={{
              backgroundColor: announcement.backgroundColor,
              padding: 16,
              borderRadius: 12,
            }}
          >
            <Icon
              source={announcement.icon}
              size={40}
              color={announcement.color}
            />
          </View>
          <View style={{ flexShrink: 1, marginLeft: 8 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.detailsText}
            >
              {announcement.title}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={3}
              style={{ color: "#ADAEB9" }}
            >
              {announcement.newsDescription}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 8,
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
  dot: {
    width: 3,
    height: 3,
    backgroundColor: "#666",
    borderRadius: 3,
    marginVertical: 4,
  },
  divider: {
    height: 6,
    backgroundColor: "#F7F9FC",
    marginTop: 6,
    marginBottom: 12,
  },
});

export default BusContent;
