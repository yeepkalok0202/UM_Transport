import {
  Entypo,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
interface FeeAndTimeProps {
  fee: string;
  time: string;
}

interface BusComingProps {
  id: number;
  busType: string;
  totalTime: number;
  fee: string;
  busPlate: string;
  route: RouteProps[];
}

const BusComing: React.FC<BusComingProps> = ({
  busType,
  totalTime,
  fee,
  busPlate,
  route,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 15,
        }}
      >
        <Text style={styles.busRoute}>upcoming {busType}</Text>
        <FeeAndTime fee={fee} time={totalTime.toString()} />
      </View>
      {/* Bus Plate */}
      <View
        style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}
      >
        <FontAwesome name="bus" size={16} color="black" />
        <Text style={styles.busPlate}>{busPlate}</Text>
      </View>
      {/* Route */}
      <FlatList
        data={route}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Route {...item} />}
      />
    </View>
  );
};
const FeeAndTime: React.FC<FeeAndTimeProps> = ({ fee, time }) => {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {/* Fees */}
      <View style={[styles.tag, { backgroundColor: "#CCFFF9" }]}>
        <FontAwesome6 name="money-bills" size={10} color="#254E5A" />
        <Text style={styles.tagText}>{fee}</Text>
      </View>
      {/* Time */}
      <View style={[styles.tag, { backgroundColor: "#E0E8FF" }]}>
        <Ionicons name="time" size={10} color="#002266" />
        <Text style={[styles.tagText, { color: "#002266" }]}>{time} mins</Text>
      </View>
    </View>
  );
};

interface RouteProps {
  id: number;
  location: string;
  time: string;
  arrived: boolean;
  current: boolean;
}

const Route: React.FC<RouteProps> = ({ location, time, arrived, current }) => {
  return (
    <View style={{ paddingVertical: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={[
              styles.iconBackground,
              { backgroundColor: arrived ? "#979797" : "#4285F4" },
            ]}
          >
            <Entypo name="triangle-down" size={12} color="white" />
          </View>

          <Text
            style={[
              styles.location,
              {
                width: 150,
                color: arrived ? "#979797" : "#4285F4",
                fontWeight: current ? "700" : "400",
              },
            ]}
            numberOfLines={1}
          >
            {location}
          </Text>
        </View>

        <Text
          style={[
            styles.location,
            {
              fontSize: 10,
              color: arrived ? "#979797" : "#4285F4",
              fontWeight: current ? "700" : "400",
            },
          ]}
        >
          {arrived === true ? `Arrived at ${time}` : `Estimate ${time}`}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
    marginRight: 15,
  },
  tag: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  tagText: {
    fontSize: 12,
    color: "#254E5A",
    marginLeft: 5,
  },
  busRoute: {
    fontSize: 10,
    color: "#979797",
    fontWeight: "500",
  },
  busPlate: {
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
    marginLeft: 5,
  },
  iconBackground: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "#979797",
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    marginLeft: 10,
    fontSize: 14,
    color: "#979797",
    fontWeight: "400",
  },
});
export default BusComing;
