import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
interface NotificationProps {
    notificationIcon: React.ReactNode;
    notificationText: string;
    notificationBoxColor?: string;
}
const Notification: React.FC<NotificationProps> = (
    { notificationIcon, notificationText, notificationBoxColor }
) => {
    return (
        <View style={[styles.notificationContainer, {backgroundColor: notificationBoxColor}]}>
            {notificationIcon}
            <Text style={styles.notificationText}>{notificationText}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    notificationContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 7,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        width: Dimensions.get('window').width -40,
        shadowOffset: { width: 0, height: 2 },
        elevation: 8, 
        position: 'absolute',
        top: 140,         
    }, 
    notificationText:{
        textAlign: 'left',
        fontSize: 13,
        color: '#FFFFFF',
        fontWeight: '500',
        lineHeight: 15,
        marginHorizontal: 10
    }
});
export default Notification;