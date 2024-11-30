import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";

export default function TransportSuggestion() {
  const mapRef = useRef<MapView | null>(null); // Updated type for MapView reference
  const [mapReady, setMapReady] = useState(false);

  const INITIAL_REGION = {
    latitude: 3.139, // Latitude for Kuala Lumpur
    longitude: 101.6869, // Longitude for Kuala Lumpur
    latitudeDelta: 0.05, // Zoom level (smaller value = more zoomed in)
    longitudeDelta: 0.05, // Zoom level
  };

  // Correct camera object format for animateCamera
  const fsktmCamera = {
    center: {
      latitude: 3.12834,
      longitude: 101.65099,
    },
    pitch: 0, // Default is 0, use to tilt the map
    heading: 0, // Default is 0, use to rotate the map
    zoom: 16, // Adjust zoom level (0-20 typically)
  };

  useEffect(() => {
    if (mapReady && mapRef.current) {
      mapRef.current.animateCamera(fsktmCamera, { duration: 2000 });
    }
  }, [mapReady]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsUserLocation={true}
        initialRegion={INITIAL_REGION}
        onMapReady={() => setMapReady(true)}
      >
        <View className="color-black top-1 w-full h-3 absolute mt-2 z-10">
          <Text>gg</Text>
        </View>
      </MapView>
    </View>
  );
}
