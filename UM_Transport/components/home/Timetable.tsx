import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TimetableProps {
  id: number;
  time: string;
  subject: string;
  location: string;
  icon: React.ReactNode;
  iconBackground?: string;
}

const Timetable: React.FC<TimetableProps> = ({
  time,
  subject,
  location,
  icon,
  iconBackground = "#E7F4FF",
}) => {
  return (
    <View style={styles.timetableContainer}>
      <View style={[styles.timetableIcon, { backgroundColor: iconBackground }]}>
        {icon}
      </View>
      <View className="flex-1" style={styles.timetableContent}>
        <Text style={styles.timetableTime} numberOfLines={1}>
          {time}
        </Text>
        <Text style={styles.timetableSubject} numberOfLines={1}>
          {subject}
        </Text>
        <Text style={styles.timetableLocation} numberOfLines={1}>
          {location}
        </Text>
      </View>

      <AntDesign name="right" size={24} color="#002266" />
    </View>
  );
};

const styles = StyleSheet.create({
  timetableContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  timetableIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E7F4FF",
    justifyContent: "center",
    alignItems: "center",
  },
  timetableContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
    width: 250,
  },
  timetableTime: {
    fontSize: 10,
    fontWeight: "400",
    color: "#002266",
  },
  timetableSubject: {
    fontSize: 15,
    fontWeight: "700",
    color: "#002266",
  },
  timetableLocation: {
    fontSize: 13,
    fontWeight: "400",
    color: "#002266",
  },
});

export default Timetable;
