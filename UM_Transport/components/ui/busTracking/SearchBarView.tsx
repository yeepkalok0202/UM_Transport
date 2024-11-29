import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
const SearchBarView = () => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search for bus"
                placeholderTextColor={'#8F9BB3'}
                style={styles.input}

            />
            <Feather name='search' size={16} color='#8F9BB3' />
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 
    input:{
        textAlign: 'left',
        fontSize: 16,
        color: '#002266',
    }
});
export default SearchBarView;