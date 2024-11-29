import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FeeAndTimeProps {
    fee: string;
    time: string;
}
const BusComing = () => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 15}}>
                <Text style={styles.busRoute}>
                    upcoming UM route AB bus 
                </Text>
                <FeeAndTime fee="Free" time="5" />
            </View>   
           {/* Bus Plate */}
            <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
                <FontAwesome name="bus" size={16} color="black" />
                <Text style={styles.busPlate}>ABC1234</Text>
            </View>      

            {/* Route */}
            <Route/>
        </View>
    );
};

const FeeAndTime: React.FC<FeeAndTimeProps> = ({ fee, time }) => {
    return (
        <View style={{flexDirection: 'row', gap: 10}}>
                 {/* Fees */}
                <View style={[styles.tag, {backgroundColor: '#CCFFF9'}]}>
                    <FontAwesome6 name="money-bills" size={10} color="#254E5A" />
                    <Text style={styles.tagText}>{fee}</Text>
                </View>

                {/* Time */}
                <View style={[styles.tag, {backgroundColor: '#E0E8FF'}]}>
                    <Ionicons name="time" size={10} color="#002266" />
                    <Text style={[styles.tagText, {color: '#002266'}]}>{time} mins</Text>
                </View>
            </View>
    )
}

const Route = () => {
    return (
        <></>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 5,     
    },
    tag:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 15,
        borderRadius: 15,
    }, 
    tagText:{
        fontSize: 12,
        color: '#254E5A',
        marginLeft: 5
    }, 
    busRoute:{
        fontSize: 10,
        color: '#979797',
        fontWeight: '500', 
    }, 
    busPlate:{
        fontSize: 20,
        color: '#000',
        fontWeight: '700', 
        marginLeft: 5, 
    }
});

export default BusComing;