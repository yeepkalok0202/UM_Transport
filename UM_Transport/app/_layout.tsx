import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import React from "react";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen name="bus-tracking/index" />
        <Stack.Screen name="sapu/index" />
        <Stack.Screen name="sapu/BookRide" />
        <Stack.Screen name="sapu/StartingPoint" />
        <Stack.Screen name="search-route/index" />
        <Stack.Screen name="search-route/BusMap" />
        <Stack.Screen name="suggestion/index" />
        <Stack.Screen name="suggestion/SuggestionNews" />
      </Stack>
    </PaperProvider>
  );
}
