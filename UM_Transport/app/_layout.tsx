import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)/SignInScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/SignUpScreen"
        options={{ headerShown: false }}
      />
      {/*<Stack.Screen name="(tabs)" options={{ headerShown: false }} />*/}
      {/*<Stack.Screen name="+not-found" />*/}
    </Stack>
  );
}
