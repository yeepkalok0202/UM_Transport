import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack initialRouteName="sapu_home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sapu_home" options={{ title: "Sapu Home" }} />
      <Stack.Screen
        name="starting_point"
        options={{ title: "Starting Point" }}
      />
      <Stack.Screen name="book_ride" options={{ title: "Book Ride"}} />
    </Stack>
  );
}
