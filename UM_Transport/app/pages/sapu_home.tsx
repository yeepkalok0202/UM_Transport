import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import "nativewind";
import '../../global.css';

// Define the type for a destination
type Destination = {
  id: string;
  name: string;
  address: string;
};

export default function SapuHomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const router = useRouter();
  const { location } = useGlobalSearchParams();

  const handlePress = () => {
    router.push('/pages/book_ride');
  };

  const handleLocationPress = () => {
    router.push('/pages/starting_point');
  };

  const GOOGLE_MAPS_API_KEY = 'AIzaSyBapQKkarYUNa-F4NAXcrWwJHJNeajYNuY';

  // Function to fetch search results from Google Places API
  const fetchPlaces = async (query: string) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const places = response.data.results.map((place: any) => ({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
      }));
      setDestinations(places);
    } catch (error) {
      console.error('Error fetching places: ', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      fetchPlaces(text);
    }
  };

  const renderDestinationItem = ({ item }: { item: Destination }) => (
    <TouchableOpacity className="flex-row items-center mb-4 mx-2" onPress={handlePress}>
      <Image source={require('@/assets/icons/destination_icon.png')} className="ml-1 mr-5 h-10 w-10" />
      <View className="flex-1">
        <Text className="text-base font-bold text-gray-900">{item.name}</Text>
        <Text className="text-sm text-gray-600 truncate">{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="flex-row items-start justify-between bg-[#4285F4] px-5 pt-10 h-32">
        <TouchableOpacity onPress={handleLocationPress} className="flex-row items-center">
          <Image source={require('@/assets/icons/location.png')} className="h-5 w-5 mr-2" />
          <Text className="text-white text-lg font-bold">{location || 'KK8, UM'}</Text>
          <Image source={require('@/assets/icons/down.png')} className="h-5 w-5 ml-2" />
        </TouchableOpacity>
        <Image source={require('@/assets/icons/profile.png')} className="h-9 w-9 rounded-full bg-white" />
      </View>

      {/* Search Box */}
      <View className="absolute top-24 left-6 right-6 z-10">
        <View className="flex-row items-center bg-white rounded-md px-4 py-2 shadow-lg shadow-gray-700">
          <TextInput
            className="flex-1 text-base text-gray-800"
            placeholder="Your destination"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
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
