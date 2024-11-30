import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Keyboard, ScrollView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
import SearchBarView from "@/components/ui/busTracking/SearchBarView";
import BusType from "@/components/ui/busTracking/BusType";
import BusComing from "@/components/ui/busTracking/BusComing";
import { BUS_TYPES } from "@/constants/bus-constant";
import { requestLocationPermission } from "@/utils/permission-utils";

const busNearYou = [
  {
    id: 1,
    busType: "UM route AB bus",
    totalTime: 5,
    fee: "Free",
    busPlate: "UMV1734",
    route: [
      {
        id: 1,
        location: "Faculty of Law",
        time: "10:30 am",
        arrived: true,
        current: false,
      },
      {
        id: 2,
        location: "Kolej Kediaman Pertama (KK1)",
        time: "11:35 am",
        arrived: true,
        current: false,
      },
      {
        id: 3,
        location: "Kolej Kediaman Kedua (KK2)",
        time: "11:45 am",
        arrived: false,
        current: true,
      },
      {
        id: 4,
        location: "Faculty of Economics and Administration",
        time: "12:00 pm",
        arrived: false,
        current: false,
      },
    ],
  },
  {
    id: 2,
    busType: "UM route BA bus",
    totalTime: 5,
    fee: "Free",
    busPlate: "ABC1234",
    route: [
      {
        id: 1,
        location: "Faculty Computer Science and Information Technology",
        time: "10:30 am",
        arrived: true,
        current: false,
      },
      {
        id: 2,
        location: "Kolej Kediaman Kelapan (KK8)",
        time: "11:35 am",
        arrived: true,
        current: false,
      },
      {
        id: 3,
        location: "Kolej Kediaman Kesepuluh (KK10)",
        time: "11:45 am",
        arrived: false,
        current: true,
      },
      {
        id: 4,
        location: "Faculty of Islam Studies",
        time: "12:00 pm",
        arrived: false,
        current: false,
      },
    ],
  },
];

const mockBusLocations = [
  {
    id: 1,
    latitude: 3.1187,
    longitude: 101.6529,
    title: "Bus 1",
    description: "Rapid KL Bus",
    color: "#F2CCA2",
    busTypeId: 2,
  },
  {
    id: 2,
    latitude: 3.1195,
    longitude: 101.6541,
    title: "Bus 2",
    description: "MRT Feeder Bus",
    color: "#CEA8BC",
    busTypeId: 3,
  },
  {
    id: 3,
    latitude: 3.1202,
    longitude: 101.6508,
    title: "Bus 3",
    description: "UM Bus",
    color: "#A6C4E5",
    busTypeId: 1,
  },
  {
    id: 4,
    latitude: 3.1211,
    longitude: 101.6538,
    title: "Bus 4",
    description: "PJ City Bus",
    color: "#BCD5AC",
    busTypeId: 4,
  },
  {
    id: 5,
    latitude: 3.122,
    longitude: 101.6519,
    title: "Bus 5",
    description: "Rapid KL Bus",
    color: "#F2CCA2",
    busTypeId: 2,
  },
  {
    id: 6,
    latitude: 3.123,
    longitude: 101.654,
    title: "Bus 6",
    description: "MRT Feeder Bus",
    color: "#CEA8BC",
    busTypeId: 3,
  },
  {
    id: 7,
    latitude: 3.124,
    longitude: 101.652,
    title: "Bus 7",
    description: "UM Bus",
    color: "#A6C4E5",
    busTypeId: 1,
  },
  {
    id: 8,
    latitude: 3.125,
    longitude: 101.653,
    title: "Bus 8",
    description: "PJ City Bus",
    color: "#BCD5AC",
    busTypeId: 4,
  },
  {
    id: 9,
    latitude: 3.126,
    longitude: 101.654,
    title: "Bus 9",
    description: "Rapid KL Bus",
    color: "#F2CCA2",
    busTypeId: 2,
  },
  {
    id: 10,
    latitude: 3.127,
    longitude: 101.655,
    title: "Bus 10",
    description: "MRT Feeder Bus",
    color: "#CEA8BC",
    busTypeId: 3,
  },
  {
    id: 11,
    latitude: 3.128,
    longitude: 101.656,
    title: "Bus 11",
    description: "UM Bus",
    color: "#A6C4E5",
    busTypeId: 1,
  },
  {
    id: 12,
    latitude: 3.129,
    longitude: 101.657,
    title: "Bus 12",
    description: "PJ City Bus",
    color: "#BCD5AC",
    busTypeId: 4,
  },
  {
    id: 13,
    latitude: 3.13,
    longitude: 101.658,
    title: "Bus 13",
    description: "Rapid KL Bus",
    color: "#F2CCA2",
    busTypeId: 2,
  },
  {
    id: 14,
    latitude: 3.131,
    longitude: 101.659,
    title: "Bus 14",
    description: "MRT Feeder Bus",
    color: "#CEA8BC",
    busTypeId: 3,
  },
  {
    id: 15,
    latitude: 3.132,
    longitude: 101.66,
    title: "Bus 15",
    description: "UM Bus",
    color: "#A6C4E5",
    busTypeId: 1,
  },
  {
    id: 16,
    latitude: 3.133,
    longitude: 101.661,
    title: "Bus 16",
    description: "PJ City Bus",
    color: "#BCD5AC",
    busTypeId: 4,
  },
];

const BusTracking = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [region, setRegion] = useState({
    latitude: 3.1185094544228233,
    longitude: 101.6527583151377,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  const [selectedBusType, setSelectedBusType] = useState<number | null>(null);

  const filteredBusLocations = selectedBusType
    ? mockBusLocations.filter((bus) => bus.busTypeId === selectedBusType)
    : mockBusLocations;

  // Get user location
  useEffect(() => {
    (async () => {
      const userLocation = await requestLocationPermission();
      const { latitude, longitude } = userLocation.coords;
      setLocation({
        latitude,
        longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      });
      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude,
        longitude,
      }));
    })();
  }, []);

  const handleKeyboardDismiss = () => Keyboard.dismiss();

  return (
    <View>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        zoomControlEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onTouchStart={handleKeyboardDismiss}
        // provider={PROVIDER_GOOGLE}
      >
        {location && <Marker coordinate={location} />}

        {filteredBusLocations.map((bus) => (
          <Marker
            key={bus.id}
            coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
            title={bus.title}
            description={bus.description}
            onPress={() => {
              // Do something when the bus marker is pressed
              console.log("Bus marker pressed:", bus);
            }}
          >
            <FontAwesome5 name="bus" size={24} color={bus.color} />
          </Marker>
        ))}
      </MapView>

      <View className="absolute left-0 right-0 top-[20] px-5">
        {/* Search bar */}
        <SearchBarView />

        {/* Bus types list */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {BUS_TYPES.map((item) => (
            <BusType
              key={item.typeId}
              typeId={item.typeId}
              type={item.type}
              typeColor={item.typeColor}
              onSelect={(typeId) => {
                setSelectedBusType(typeId === selectedBusType ? null : typeId); // Toggle selection
              }}
              isSelected={item.typeId === selectedBusType}
            />
          ))}
        </ScrollView>
      </View>

      <View className="absolute left-0 right-0 bottom-[40]">
        <FlatList
          className="overflow-visible"
          contentContainerClassName="px-5"
          horizontal
          showsHorizontalScrollIndicator={false}
          data={busNearYou}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BusComing {...item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
export default BusTracking;
