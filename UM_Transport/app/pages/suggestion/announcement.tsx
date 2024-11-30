import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Announcement = ({}) => {
  const announcement = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 32 }}>
      <Text style={{ fontSize: 28, fontWeight: "600", marginBottom: 32 }}>
        {announcement.title}
      </Text>
      {/* <Image
        style={{ marginBottom: 32 }}
        source={require("@/assets/images/announcementBus.png")}
      /> */}
      <Text style={{ fontSize: 22, fontWeight: "400" }}>
        {announcement.text}
      </Text>
    </View>
  );
};

export default Announcement;
