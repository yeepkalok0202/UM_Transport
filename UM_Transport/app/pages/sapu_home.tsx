import React from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import "nativewind";
import '../../global.css';

// Define the type for a destination
type Destination = {
  id: string;
  name: string;
  address: string;
};

export default function SapuHomeScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/pages/book_ride');
  };

  const destinations: Destination[] = [
    { id: '1', name: 'Faculty of Computer Science & Information Technology', address: 'Off Lingkungan Budi, Kuala Lumpur, 50603, WP Kuala Lumpur' },
    { id: '2', name: 'Faculty of Computer Science & Information Technology', address: 'Off Lingkungan Budi, Kuala Lumpur, 50603, WP Kuala Lumpur' },
    { id: '3', name: 'Faculty of Computer Science & Information Technology', address: 'Off Lingkungan Budi, Kuala Lumpur, 50603, WP Kuala Lumpur' },
  ];

  const renderDestinationItem = ({ item }: { item: Destination }) => (
    <TouchableOpacity className="flex-row items-center mb-4 mx-2" onPress={handlePress}>
      <Image source={require('@/assets/icons/destination_icon.png')} className="mr-4 h-10 w-10" />
      <View className="flex-1">
        <Text className="text-base font-bold text-gray-900">{item.name}</Text>
        <Text className="text-sm text-gray-600 truncate">{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="flex-row items-start justify-between bg-blue-600 px-5 pt-10 h-32">
        <View className="flex-row items-center">
          <Image source={require('@/assets/icons/location.png')} className="h-5 w-5 mr-2" />
          <Text className="text-white text-lg font-bold">KK8, UM</Text>
          <Image source={require('@/assets/icons/down.png')} className="h-5 w-5 ml-2" />
        </View>
        <Image source={require('@/assets/icons/profile.png')} className="h-9 w-9 rounded-full bg-white" />
      </View>

      {/* Search Box */}
      <View className="absolute top-24 left-6 right-6 z-10">
        <View className="flex-row items-center bg-white rounded-md px-4 py-2 shadow-lg shadow-gray-700">
          <TextInput
            className="flex-1 text-base text-gray-800"
            placeholder="Your destination"
            placeholderTextColor="#888"
          />
          <Image source={require('@/assets/icons/searchbox_icon.png')} className="h-5 w-4" />
        </View>
      </View>

      {/* Destination List */}
      <FlatList
        data={destinations}
        renderItem={renderDestinationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 60, paddingHorizontal: 16 }}
      />
    </View>
  );
}
