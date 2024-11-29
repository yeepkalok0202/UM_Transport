import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const SignInScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView edges={["left", "right"]} className="h-full w-full px-5">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="justify-center items-center h-full w-full"
      >
        <Image
          className="w-44 h-44"
          source={require("../../assets/images/um-ride-logo.png")}
        />
        <Text className="text-gray-400 text-lg mt-2 font-semibold">
          Travel easier within Universiti Malaya
        </Text>

        <Text className="text-lg mt-10 font-semibold">
          Login to your account
        </Text>

        <View className="gap-4 mt-8">
          <View className="rounded-2xl border-gray-400 flex-row h-16 border w-full overflow-hidden">
            <View className="w-[50] bg-[#4285F4]"></View>
            <TextInput
              className="py-4 px-8 flex-1 text-black text-[16px]"
              placeholderTextColor={"#9A9A9A"}
              placeholder="Email"
            />
          </View>
          <View className="rounded-2xl border-gray-400 flex-row h-16 border w-full overflow-hidden">
            <View className="w-[50] bg-[#4285F4]"></View>
            <TextInput
              className="py-4 px-8 flex-1 text-black text-[16px]"
              placeholderTextColor={"#9A9A9A"}
              placeholder="Password"
            />
          </View>
          <View className="w-full flex-row justify-end">
            <Text className="text-[#4285F4]">Forgot password?</Text>
          </View>
        </View>

        <View className="h-16 bg-[#4285F4] w-full rounded-2xl justify-center items-center mt-8">
          <Text className="font-semibold text-[18px] text-white">Login</Text>
        </View>

        <View className="mt-10 flex-row gap-1">
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              router.push("/(auth)/SignUpScreen");
            }}
          >
            <Text className="text-[#4285F4]">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;
