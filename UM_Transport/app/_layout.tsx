import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sapu_home" options={{ title: "Sapu Home"}} />
      <Stack.Screen name="book_ride" options={{ title: "Book Ride"}} />
    </Stack>
  );
}
