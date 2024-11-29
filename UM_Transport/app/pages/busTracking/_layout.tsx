import React from 'react';
import { Stack } from 'expo-router';

export default function RouteLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 18,
                },
                headerShadowVisible: true,
            }}
        >
            <Stack.Screen
                name="BusTracking"
                options={{}}
            />
        </Stack>
    )
}