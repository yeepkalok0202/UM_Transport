import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Camera } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

const BusMap = () => {
  const mapRef = useRef<MapView>(null);
  const route = useRoute();
  const { params } = route;
  const { latitude, longitude, name, speed } =
    (params as {
      latitude: Double;
      longitude: Double;
      name: string;
      speed: number;
    }) || {}; // Ensure safety if params are undefined
  const [mapReady, setMapReady] = useState(false);

  const INITIAL_REGION = {
    latitude: 3.12834,
    longitude: 101.65099,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const FSKTM_LOCATION = {
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
      title: "T815",
      latitude: 3.132334,
      longitude: 101.659369,
      direction: 320,
    },
    { title: "T815", latitude: 3.123022, longitude: 101.65133, direction: 130 },
    {
      title: "UM Bus AB",
      latitude: 3.130582,
      longitude: 101.652225,
      direction: 250,
    },
  ];

  // Effect to animate the camera to a specific location once the map is ready
  useEffect(() => {
    if (mapReady && mapRef.current) {
      const camera: Camera = {
        center: FSKTM_LOCATION,
        pitch: 0,
        heading: 0,
        altitude: 0,
        zoom: 15,
      };
      mapRef.current.animateCamera(camera, { duration: 2000 });
    }
  }, [mapReady]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        // provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={INITIAL_REGION}
        onMapReady={() => setMapReady(true)}
      >
        {/* Render marker if params are provided */}
        {/* {params && latitude && longitude && (
          <Marker
            coordinate={{ latitude, longitude }}
            title={name || "Bus Location"}
            description={`Speed: ${speed || 0} km/h`}
          />
        )} */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default BusMap;
