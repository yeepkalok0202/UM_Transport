import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Title } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function SuggestionNews({}) {
    const news = useLocalSearchParams();

    return (
        <View className="flex-1 p-6 bg-white">
            <Title className="font-extrabold mb-4" style={{fontSize:25,color:"#000"}}>{news.title}</Title>
                    <Image
                source={{ uri: news.newsURI }} 
                className="w-full h-1/2 rounded-xl mb-7"/>
                <Text className="font-normal text-xl color-black mb-4">
                    {news.newsDescription}
                </Text>
        </View>
    );
}
