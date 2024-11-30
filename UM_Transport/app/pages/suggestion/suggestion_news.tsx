import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Title } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function SuggestionNews() {
    const [description, setDescription] = useState("This is a news description")
    const [imageURI, setImageURI] = useState("https://via.placeholder.com/150")
    return (
        <View className="flex-1 p-6 bg-white">
            <Title className="font-extrabold mb-4" style={{fontSize:25,color:"#000"}}>News Suggestion</Title>
                    <Image
                source={{ uri: imageURI }} 
                className="w-full h-1/2 rounded-xl mb-7"/>
                <Text className="font-normal text-xl color-black mb-4">
                    {description}
                </Text>
        </View>
    );
}
