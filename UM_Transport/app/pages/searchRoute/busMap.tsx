import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const busMap = () => {
  const mapRef = useRef<MapView | null>(null);
  const [mapReady, setMapReady] = React.useState(false);

  const INITIAL_REGION = {
    latitude: 4.863355045799683,
    longitude: 101.88235187750773,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };
  const fsktm = {
    latitude: 3.12834,
    longitude: 101.65099,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  useEffect(() => {
    if (mapReady) {
      mapRef.current?.animateToRegion(fsktm, 2000);
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
          style={{ width: 10, height: 10 }}
          title="You"
          description="Faked Location"
          pinColor="blue"
        />
      </MapView>
    </View>
  );
};

export default busMap;
