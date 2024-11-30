/* eslint-disable @typescript-eslint/no-require-imports */
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";
import { router, useRouter } from "expo-router";
import React from "react";
import "../global.css";
import "nativewind";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import Timetable from "@/components/home/Timetable";
import RideCard from "@/components/home/RideCard";
import { SafeAreaView } from "react-native-safe-area-context";
import SafeView from "@/components/common/SafeView";

const timetableData = [
  {
    id: 1,
    time: "3:00 pm - 4:00 pm",
    subject: "WIA2006 System Analysis and Design",
    location: "DK2, Faculty Science Computer and Information Technology",
    icon: <MaterialIcons name={"laptop-mac"} size={30} color={"#002266"} />,
    iconBackground: "#E7F4FF",
  },
  {
    id: 2,
    time: "4:00 pm - 6:00 pm",
    subject: "SID2003 Basic Analytic Chemistry",
    location: "Chemistry Lab, Faculty Science ",
    icon: <MaterialIcons name={"science"} size={30} color={"#002266"} />,
    iconBackground: "#FBF1DC",
  },
  {
    id: 3,
    time: "6:00 pm - 7:00 pm",
    subject: "MIA2001 Introduction to Music",
    location: "DK2, Faculty of Social Science and Humanities",
    icon: <MaterialIcons name={"music-note"} size={30} color={"#002266"} />,
    iconBackground: "#E6FBDC",
  },
];

const transportChoice = [
  {
    id: 1,
    name: "Public Transport",
    cardColor: "#FCF1FE",
    image: require("@/assets/images/Home-Bus.png"),
    long: true,
    route: () => {
      router.push("/bus-tracking");
    },
  },
  {
    id: 2,
    name: "Ride-hailing",
    cardColor: "#FCFFEE",
    image: require("@/assets/images/Home-SAPU.png"),
    long: true,
    route: () => {
      router.push("/sapu");
    },
  },
  {
    id: 3,
    name: "Travel Suggestion",
    cardColor: "#E9F3FF",
    image: require("@/assets/images/Home-TravelSuggestion.png"),
    long: false, 
    route: () => {
      router.push("/suggestion");
    },
  },
  {
    id: 4,
    name: "Search Route",
    cardColor: "#F1FFEC",
    image: require("@/assets/images/Home-Search.png"),
    long: false,
    route: () => {
      router.push("/search-route");
    },
  },
];
export default function Index() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <SafeView>
      <ScrollView style={styles.container}>
        {/* Today Timetable  */}
        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text style={styles.title}>Today&apos;s Timetable</Text>
            <Image
              source={require("@/assets/icons/profile.png")}
              className="h-14 w-14 rounded-full bg-white"
            />
          </View>
          {timetableData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Timetable {...item} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Transport Choice  */}
        <View style={{ marginTop: 20 }}>
          <Text className="mb-4" style={styles.title}>
            Transport Choice
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {transportChoice.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ width: "48%", marginBottom: 10 }}
                onPress={item.route}
              >
                <View
                  className={`shadow-sm`}
                  style={{
                    width: "100%",
                    height: 110,
                    borderRadius: 10,
                    backgroundColor: item.cardColor,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    elevation: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#002266",
                      fontWeight: "bold",
                      zIndex: 1,
                      textAlign: "center",

                    }}
                  >
                    {item.name}
                  </Text>

                  <Image
                    source={item.image}
                    style={{
                      width: item.long ? 100 : 80,
                      height: item.long? 40: 50,
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Ride Card  */}
        <View style={{ marginTop: 20, marginBottom: 120 }}>
          <Text className="mb-4" style={styles.title}>
            This Week Ride
          </Text>
          <RideCard />
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback
              className="mb-4"
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.modalContent}>
                <Text style={[styles.title, { textAlign: "center" }]}>
                  {" "}
                  Choose your transport
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    router.push("/bus-tracking");
                  }}
                >
                  <PublicTransport />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    router.push("/sapu");
                  }}
                >
                  <RideHailing />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeView>
  );
}

const PublicTransport = () => {
  return (
    <View
      style={{
        borderRadius: 10,
        padding: 20,
        backgroundColor: "#68D9A5",
        marginVertical: 10,
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "100%",
      }}
    >
      <FontAwesome6
        name="bus"
        size={50}
        color="white"
        style={{ alignSelf: "center" }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        Public Transport
      </Text>
    </View>
  );
};

const RideHailing = () => {
  return (
    <View
      style={{
        borderRadius: 10,
        padding: 20,
        backgroundColor: "#78A1E5",
        marginVertical: 10,
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "100%",
      }}
    >
      <FontAwesome
        name="car"
        size={50}
        color="white"
        style={{ alignSelf: "center" }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        Ride-hailing
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  locationText: {
    fontSize: 15,
    color: "#8B8B8B",
    width: 200,
    marginLeft: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#002266",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center", // Align the modal to the bottom
    alignItems: "center",
    paddingHorizontal: 25,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
});
