import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sapu" />
      <Stack.Screen name="searchRoute" />
      <Stack.Screen name="suggestion" />
    </Stack>
  );
}
