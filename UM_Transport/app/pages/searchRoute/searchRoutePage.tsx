import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { Icon, Searchbar } from "react-native-paper";
import { useRouter } from "expo-router";
import MapView from "react-native-maps";
import SafeView from "@/components/ui/SafeView";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SearchRoutePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const data = [
    {
      id: 1,
      routeName: "T789",
      buses: [
        { id: 1, name: "T789-1", speed: 20, longitude: 101.65939, latitude: 3.14634 },
        { id: 2, name: "T789-2", speed: 30, longitude: 101.65099, latitude: 3.12334 },
        { id: 3, name: "T789-3", speed: 40, longitude: 101.65499, latitude: 2.12834 },
      ],
    },
    {
      id: 2,
      routeName: "T790",
      buses: [
        { id: 1, name: "T790-1", speed: 20, longitude: 101.29739, latitude: 3.49234 },
        { id: 2, name: "T790-2", speed: 30, longitude: 101.37945, latitude: 3.12334 },
        { id: 3, name: "T790-3", speed: 40, longitude: 131.24385, latitude: 3.12834 },
      ],
    },
    {
      id: 3,
      routeName: "T791",
      buses: [
        { id: 1, name: "T791-1", speed: 20, longitude: 435.65099, latitude: 7.12834 },
        { id: 2, name: "T791-2", speed: 30, longitude: 354.50992, latitude: 5.76834 },
        { id: 3, name: "T791-3", speed: 40, longitude: 101.65565, latitude: 2.45834 },
      ],
    },
  ];

  const INITIAL_REGION = {
    latitude: 3.12834,
    longitude: 101.65099,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };

  // Filter routes and buses based on search query
  const filteredRoutes = data.filter((route) =>
    route.routeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeView>
      <ScrollView style={styles.container}>
        {/* Search Bar */}
<Searchbar
          placeholder="Search"
          style={styles.searchBar}
          icon="map-marker"
          iconColor="#ADAEB9"
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholderTextColor="#ADAEB9"
          inputStyle={{ color: "#002266j" }}
        />
       
        {/* Conditionally Render Content */}
        {searchQuery.length > 0 && filteredRoutes.length > 0 ? (
          <>
            {/* Live Location Map */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                router.push({
                  pathname: "/pages/searchRoute/busMap",
                  params: {
                    longitude: INITIAL_REGION.longitude,
                    latitude: INITIAL_REGION.latitude,
                  },
                });
              }}
            >
              <Text style={[styles.text]}>Live location of buses on map</Text>
              <MapView
                style={styles.map}
                initialRegion={INITIAL_REGION}
              ></MapView>
            </TouchableOpacity>

            {/* Filtered Buses */}
            <Text style={[styles.text, { marginTop: 20 }]}>Buses on service</Text>
            <View style={{ marginTop: 15 }}>
              <FlatList
                data={filteredRoutes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item: route }) => (
                  <View>
                    {/* <Text style={styles.routeName}>{route.routeName}</Text> */}
                    {route.buses.map((bus) => (
                      <View key={bus.id}>
                        <TouchableOpacity onPress={() => {
                          router.push({
                            pathname: "/pages/searchRoute/busMap",
                            params: {
                              longitude: bus.longitude,
                              latitude: bus.latitude,
                              routeName: route.routeName,
                              busName: bus.name,
                              speed: bus.speed,
                            },
                          });
                        }}>
                          <View
                            style={[
                              styles.rowContainer,
                              { justifyContent: "space-between", marginBottom: 8 },
                            ]}
                          >
                            <View style={styles.rowContainer}>
                            <FontAwesome5 name="bus" size={16} color={"#002266"} />
                              <Text
                                style={{ marginLeft: 4, fontSize: 16, fontWeight: "500" }}
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
                )}
              />
            </View>
          </>
        ) : searchQuery.length > 0 ? (
          <Text style={styles.noResultsText}>No routes found. Please try again.</Text>
        ) : null}
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container:{
    padding: 20,
  }, 
  searchBar: {
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    marginTop: 8,
    marginBottom: 40,
    borderColor: "#898989",
    borderWidth: 1,
  },
  map: {
    height: 270,
    width: "100%",
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
  routeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginVertical: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});
