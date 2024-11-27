import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="sapu_home" options={{ title: "Home" }} />
      <Stack.Screen name="book_ride" options={{ title: "Book Ride" }} />
    </Stack>
  );
}
