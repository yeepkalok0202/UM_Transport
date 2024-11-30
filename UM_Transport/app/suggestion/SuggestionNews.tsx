import CustomHeader from "@/components/common/CustomHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View, Text, Image } from "react-native";
import { Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SuggestionNews() {
  const news = useLocalSearchParams();
  const router = useRouter();
  const navigateBack = () => router.back();

  return (
    <View className="flex-1 p-6 bg-white">
      <CustomHeader navigateBack={navigateBack} title="Travel Suggestion" />
      <SafeAreaView className="mt-20">
        <Title
          className="font-extrabold mb-4"
          style={{ fontSize: 25, color: "#000" }}
        >
          {news.title}
        </Title>
        <Image
          source={{ uri: news.newsURI as string }}
          className="w-full h-1/2 rounded-xl mb-7"
        />
        <Text className="font-normal text-xl color-black mb-4">
          {news.newsDescription}
        </Text>
      </SafeAreaView>
    </View>
  );
}
