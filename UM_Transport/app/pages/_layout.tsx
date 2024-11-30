import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="announcement" />
      <Stack.Screen name="test" />
      <Stack.Screen name="sapu" />
      <Stack.Screen name="searchRoute" />
      <Stack.Screen name="suggestion" />
      <Stack.Screen name="BusTracking" />
      <Stack.Screen name="GFTSRealtimeExample" />
    </Stack>
  );
}
