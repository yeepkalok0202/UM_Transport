import { Image, Text, TouchableHighlight, View } from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="w-full h-full justify-center items-center">
      <TouchableHighlight
        onPress={() => {
          router.push("/(auth)/SignInScreen");
        }}
      >
        <Image
          className="w-44 h-44"
          source={require("../assets/images/um-ride-logo.png")}
        />
      </TouchableHighlight>
    </SafeAreaView>
  );
}
