import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { Alert } from "react-native";

export const requestLocationPermission = async (): Promise<
  LocationObject | never
> => {
  // Request location permissions
  const { status } = await requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "Location permissions are required to use this feature."
    );
    throw new Error("Location permission not granted");
  }

  // Get current location
  return await getCurrentPositionAsync({});
};
