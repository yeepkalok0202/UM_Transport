import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const busMap = () => {
  const mapRef = useRef<any>();
  const [mapReady, setMapReady] = React.useState(false);

  const INITIAL_REGION = {
    latitude: 4.863355045799683,
    longitude: 101.88235187750773,
    latitudeDelta: 6,
    longitudeDelta: 6,
  };
  const fsktm = {
    latitude: 3.12834,
    longitude: 101.65099,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  useEffect(() => {
    if (mapReady) {
      mapRef.current.animateCamera(fsktm, 2000);
    }
  }, [mapReady]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={INITIAL_REGION}
        onMapReady={() => setMapReady(true)}
      ></MapView>
    </View>
  );
};

export default busMap;

