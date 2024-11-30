import { Stack } from "expo-router";
import React from "react";

export default function SapuLayout() {
  return (
    <Stack initialRouteName="SapuHome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SapuHome" options={{ title: "Sapu Home" }} />
      <Stack.Screen
        name="starting_point"
        options={{ title: "Starting Point" }}
      />
      <Stack.Screen name="BookRide" />
    </Stack>
  );
}
