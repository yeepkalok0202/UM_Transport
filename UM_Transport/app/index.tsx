import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import "../global.css";
import "nativewind";

export default function Index() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/pages/sapu/sapu_home");
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
          router.push("/pages/searchRoute/searchRoutePage");
        }}
      >
        <Text className="text-white">Search route</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 p-2 rounded-2xl flex-nowrap"
        onPress={() => {
          router.push("/pages/test");
        }}
      >
        <Text className="text-white">test</Text>
      </TouchableOpacity>
    </View>
  );
}
