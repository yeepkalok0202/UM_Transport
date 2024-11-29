import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen name="pages" />
        </Stack>
      </PaperProvider>
    </SafeAreaView>
  );
}
