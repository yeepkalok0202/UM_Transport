import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack initialRouteName="sapu_home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sapu_home" options={{ title: "Sapu Home" }} />
      <Stack.Screen
        name="starting_point"
        options={{ title: "Starting Point" }}
      />
      <Stack.Screen
        name="book_ride"
        options={{
          headerTitle: "Book a Ride",
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold", // Make it bold
            fontSize: 18, // Optional: Customize font size
          },
        }}
      />
    </Stack>
  );
}
