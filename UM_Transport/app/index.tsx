import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import "../global.css";
import "nativewind"

export default function Index() {
  const router = useRouter(); 

  const handlePress = () => {

    router.push('/pages/sapu_home');
  };

  return (
    <View className="bg-red-600">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded" onPress={handlePress}>
        <Text className="text-white">Sapu</Text>
      </TouchableOpacity>
    </View>
  );
}
