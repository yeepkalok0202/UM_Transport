import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import SearchBarView from '../../components/bus_tracking/SearchBarView';
import BusType from '../../components/bus_tracking/BusType';
import Notification from '@/components/bus_tracking/Notification';
import { FontAwesome5 } from '@expo/vector-icons';
import BusComing from '@/components/bus_tracking/BusComing';

// Mock data of bus types
const busTypes = [
    {
        typeId: 1,
        type: 'UM Bus',
        typeColor: '#A6C4E5',
    }, 
    {
        typeId: 2,
        type: 'Rapid KL Bus',
        typeColor: '#F2CCA2',
    }, 
    {
        typeId: 3,
        type: 'MRT Feeder Bus',
        typeColor: '#CEA8BC',
    },
    {
        typeId: 4,
        type: 'PJ City Bus',
        typeColor: '#BCD5AC',
    }
]; 

const notificationData ={
    notificationIcon: <FontAwesome5 name='cloud-rain' size={15} color='#FFFFFF'/>,
    notificationText: 'Rapid KL Bus Route T789 will be late for 15 minutes due to heavy rain ',
    notificationBoxColor: '#FF7070'
}

const BusTracking = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number, latitudeDelta: number, longitudeDelta: number } | null>(null);
    const [region, setRegion] = useState({
        latitude: 3.1185094544228233,
        longitude: 101.6527583151377,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
    });
    const [notification, setNotification] = useState(false);

    // Get user location
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
                return;
            }

            const userLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = userLocation.coords;
            setLocation({ latitude, longitude, latitudeDelta: 0.00922, longitudeDelta: 0.00421 });
            setRegion((prevRegion) => ({
                ...prevRegion,
                latitude,
                longitude,
            }));
        })();
    }, []);

    // Show notification after the page is loaded
    useEffect(() => {
        // Show notification after the page is loaded
        setNotification(true);

        // Set a timer to hide the notification after 30 seconds
        const timer = setTimeout(() => {
            setNotification(false);
        }, 30000); // 30 seconds

        // Cleanup the timer when the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    console.log(location);
    return (
        <SafeAreaView>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                zoomControlEnabled={true}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {location && (
                    <Marker
                        coordinate={location}
                        // title="You are here"
                        // description="Your current location"
                    />
                )}
            </MapView>

            <SafeAreaView style={styles.overlay}>
                <View style={styles.container}>
                    {/* Search bar */}
                    <SearchBarView />
                    {/* Bus types list */}
                   <FlatList
                        data={busTypes}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.typeId.toString()}
                        renderItem={({ item }) => (
                            <BusType
                                typeId={item.typeId}
                                type={item.type}
                                typeColor={item.typeColor}
                            />
                        )}
                    /> 

                    {/* Notification */}
                    {notification===true && (<Notification notificationIcon={notificationData.notificationIcon} notificationText={notificationData.notificationText} notificationBoxColor={notificationData.notificationBoxColor} />)}

                    {/* Buses coming */}
                    <View style={styles.busesComing}>
                        <BusComing />
                    </View>

                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        marginHorizontal: 20
    },
    map: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
    },
    busesComing:{
        position: 'absolute',
        bottom: 100,
    }
});

export default BusTracking;