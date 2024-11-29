import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const busMap = () => {
  const mapRef = useRef<MapView | null>(null);
  const [mapReady, setMapReady] = React.useState(false);

  const INITIAL_REGION = {
    latitude: 3.12834,
    longitude: 101.65099,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  const fsktm = {
    latitude: 3.12834,
    longitude: 101.65099,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };
  const um = {
    latitude: 3.12848,
    longitude: 101.654742,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const bus = [
    {
      latitude: 3.132334,
      longitude: 101.659369,
      direction: 320,
    },
    { latitude: 3.123022, longitude: 101.65133, direction: 130 },
    {
      latitude: 3.130582,
      longitude: 101.652225,
      direction: 250,
    },
  ];

  useEffect(() => {
    if (mapReady) {
      mapRef.current?.animateToRegion(um, 2000);
    }
  }, [mapReady]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={INITIAL_REGION}
        onMapReady={() => setTimeout(() => setMapReady(true), 1000)}
      >
        <Marker
          coordinate={{
            latitude: fsktm.latitude,
            longitude: fsktm.longitude,
          }}
          image={require("@/assets/icons/current_location.png")}
          style={{ width: 5, height: 5 }}
        />
        {bus.map((bus, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: bus.latitude,
              longitude: bus.longitude,
            }}
            image={require("@/assets/icons/bus.png")}
            style={{ transform: [{ rotate: `${bus.direction}deg` }] }}
          />
        ))}
      </MapView>
    </View>
  );
};

export default busMap;
