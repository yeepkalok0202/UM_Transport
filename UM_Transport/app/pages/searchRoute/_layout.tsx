import { Stack } from "expo-router";

export default function RouteLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen
        name="searchRoutePage"
        options={{ headerTitle: "Search" }}
      />
      <Stack.Screen
        name="busMap"
        options={{
          headerTitle: "Search",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          headerShadowVisible: true,
        }}
      />
    </Stack>
  );
}
