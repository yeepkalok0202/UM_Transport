import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Searchbar } from "react-native-paper";
import { useRouter } from "expo-router";
import SuggestionBottom from "@/components/ui/SuggestionBottom";
import MapView, { Marker } from "react-native-maps";

export default function SearchRoutePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const bus = [
    { id: "1", name: "T815", speed: 25.2 },
    { id: "2", name: "ABC1234", speed: 20.5 },
    { id: "3", name: "T789", speed: 30.1 },
    { id: "4", name: "T817", speed: 15.3 },
  ];

  const fsktm = {
    latitude: 3.12834,
    longitude: 101.65099,
  };

  const bus1 = {
    latitude: 3.132334,
    longitude: 101.659369,
    direction: 320,
  };

  const INITIAL_REGION = {
    latitude: 3.12848,
    longitude: 101.654742,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={{ padding: 16, backgroundColor: "white", flex: 1 }}>
      <Searchbar
        placeholder="Search"
        style={styles.searchBar}
        placeholderTextColor={"#ADAEB9"}
        icon="map-marker"
        iconColor="#ADAEB9"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <Text style={styles.text}>Live location of buses on map</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          router.push("/pages/searchRoute/busMap");
        }}
      >
        <MapView
          style={{
            flexDirection: "row",
            height: 270,
            width: "100%",
            justifyContent: "center",
            borderRadius: 12,
            marginVertical: 16,
          }}
          initialRegion={INITIAL_REGION}
        >
          <Marker
            coordinate={{
              latitude: fsktm.latitude,
              longitude: fsktm.longitude,
            }}
            image={require("@/assets/icons/current_location2.png")}
            style={{ width: 5, height: 5 }}
          />
          <Marker
            coordinate={{
              latitude: bus1.latitude,
              longitude: bus1.longitude,
            }}
            image={require("@/assets/icons/bus.png")}
            style={{ transform: [{ rotate: `${bus1.direction}deg` }] }}
          />
        </MapView>
      </TouchableOpacity>
      <Text style={styles.text}>Buses on service</Text>
      <View style={{ marginTop: 32 }}>
        {bus.map((bus, index) => (
          <View key={bus.id || index}>
            <TouchableOpacity activeOpacity={0.6}>
              <View
                style={[
                  styles.rowContainer,
                  { justifyContent: "space-between", marginBottom: 8 },
                ]}
              >
                <View style={styles.rowContainer}>
                  <Icon source="bus" size={30} color="#5686E1" />
                  <Text
                    style={{ marginLeft: 4, fontSize: 20, fontWeight: "500" }}
                  >
                    {bus.name}
                  </Text>
                </View>

                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "#979797" }}
                >
                  {bus.speed + " km/h"}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.divider}></View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 8,
    marginBottom: 40,
  },
  text: {
    color: "#002266",
    fontSize: 18,
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#A9BDDE",
    marginBottom: 16,
  },
});
