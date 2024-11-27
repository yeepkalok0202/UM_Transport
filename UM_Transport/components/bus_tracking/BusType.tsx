import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface BusTypeProps {
    typeId: number;
    type: string;
    typeColor: string;
}

const BusType: React.FC<BusTypeProps> = ({
    typeId,
    type,
    typeColor,
}) => {
    return (
        <TouchableOpacity onPress={() => {
            console.log(`Bus type ${type} is selected`);
        }}>
            <View style={styles.busTypeContainer}>
                {/* Bus type icon */}
                <FontAwesome5 name='bus' size={12} color={typeColor} />
                {/* Bus type name */}
                <Text style={styles.busTypeText}>{type}</Text>
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