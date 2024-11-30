import { Text, View, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import "../global.css";
import "nativewind";

export default function Index() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/sapu");
  };

  return (
    <View className="flex-1">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity
        className="bg-blue-500 p-2 rounded-2xl flex-nowrap mb-10"
        onPress={handlePress}
      >
        <Text className="text-white">Sapu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 p-2 rounded-2xl flex-nowrap mb-10"
        onPress={() => {
          router.push("/search-route");
        }}
      >
        <Text className="text-white">Search route</Text>
      </TouchableOpacity>

      <Pressable className="bg-blue-500 p-2 rounded-2xl flex-nowrap mt-10">
        <Text
          className="text-white"
          onPress={() => {
            router.push("/suggestion");
          }}
        >
          Route Suggestion
        </Text>
      </Pressable>

      <Pressable className="bg-blue-500 p-2 rounded-2xl flex-nowrap mt-10">
        <Text
          className="text-white"
          onPress={() => {
            router.push("/bus-tracking");
          }}
        >
          Bus Tracking
        </Text>
      </Pressable>
    </View>
  );
}
