import { Stack } from "expo-router";

export default function RouteLayout() {
    return (
        <Stack
        screenOptions={{
            headerShown: true,
            headerBackButtonDisplayMode: "minimal",
            headerTitleAlign: "center",
            headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            },
            headerShadowVisible: true,
        }}
        >
        <Stack.Screen
            name="suggestion_home"
            options={{ headerTitle: "Where are you?" }}
        />
        {/* <Stack.Screen
            name="busMap"
            options={{
            headerTitle: "Search",
            headerShown: true,
            headerBackButtonDisplayMode: "minimal",
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 18,
            },
            headerShadowVisible: true,
            }}
        /> */}
        </Stack>
    );
    }
