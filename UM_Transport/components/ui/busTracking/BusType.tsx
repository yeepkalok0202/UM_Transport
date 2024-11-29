import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { View } from 'react-native';
interface BusTypeProps {
    typeId: number;
    type: string;
    typeColor: string;
    onSelect: (typeId: number) => void;
    isSelected: boolean;
}
const BusType: React.FC<BusTypeProps> = ({
    typeId,
    type,
    typeColor,
    onSelect,
    isSelected,
}) => {
    return (
    <TouchableOpacity onPress={() => onSelect(typeId)}>
        <View
            style={[
                styles.busTypeContainer,
                isSelected && { backgroundColor: typeColor, opacity: 0.8 },
            ]}
        >
            <FontAwesome5 name="bus" size={12} color={isSelected ? '#fff' : typeColor} />
            <Text style={[styles.busTypeText, isSelected && { color: '#fff' }]}>{type}</Text>
        </View>
    </TouchableOpacity>        
    )
}
const styles = StyleSheet.create({
    busTypeContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 7,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        elevation: 8, 
        marginTop: 20,
        marginRight: 10,
        alignContent: 'center',
        alignSelf: 'flex-start'
    }, 
    busTypeText:{
        fontSize: 14,
        marginLeft: 8,
        color: '#4C4C4C',
        fontWeight: '400'
    }
});
export default BusType;