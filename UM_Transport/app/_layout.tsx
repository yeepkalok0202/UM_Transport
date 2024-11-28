import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  initialRouteName: "index",

  pages: {
    initialRouteName: "sapu_home",
  },
};

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, margin: 0, padding: 0 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="pages" />
      </Stack>
    </SafeAreaView>
  );
}
