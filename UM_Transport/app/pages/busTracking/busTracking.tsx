import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList, Keyboard } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';
import SearchBarView from '@/components/ui/busTracking/SearchBarView';
import BusType from '@/components/ui/busTracking/BusType';
import BusComing from '@/components/ui/busTracking/BusComing';
import Notification from '@/components/ui/busTracking/Notification';
import { prasaranaBusInfo } from '@/api/bus-api';
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

const busNearYou =[
    {
        id: 1, 
        busType: 'UM route AB bus',
        totalTime: 5,
        fee: 'Free',
        busPlate: 'UMV1734',
        route:[{
            id: 1,
            location: 'Faculty of Law',
            time: '10:30 am',
            arrived: true,
            current: false
        }, {
            id: 2,
            location: 'Kolej Kediaman Pertama (KK1)',
            time: '11:35 am',
            arrived: true,
            current: false
        }, {
            id: 3,
            location: 'Kolej Kediaman Kedua (KK2)',
            time: '11:45 am',
            arrived: false,
            current: true, 
        }, {
            id: 4,
            location: 'Faculty of Economics and Administration',
            time: '12:00 pm',
            arrived: false,
            current: false, 
        }]
    }, 
    {
        id: 2, 
        busType: 'UM route BA bus',
        totalTime: 5,
        fee: 'Free',
        busPlate: 'ABC1234',
        route:[{
            id: 1,
            location: 'Faculty Computer Science and Information Technology',
            time: '10:30 am',
            arrived: true,
            current: false
        }, {
            id: 2,
            location: 'Kolej Kediaman Kelapan (KK8)',
            time: '11:35 am',
            arrived: true,
            current: false
        }, {
            id: 3,
            location: 'Kolej Kediaman Kesepuluh (KK10)',
            time: '11:45 am',
            arrived: false,
            current: true, 
        }, {
            id: 4,
            location: 'Faculty of Islam Studies',
            time: '12:00 pm',
            arrived: false,
            current: false, 
        }]
    }
]

const notificationData ={
    notificationIcon: <FontAwesome5 name='cloud-rain' size={15} color='#FFFFFF'/>,
    notificationText: 'Rapid KL Bus Route T789 will be late for 15 minutes due to heavy rain ',
    notificationBoxColor: '#FF7070'
}

const mockBusLocations = [
    { id: 1, latitude: 3.1187, longitude: 101.6529, title: 'Bus 1', description: 'Rapid KL Bus', color: '#F2CCA2', busTypeId : 2 },
    { id: 2, latitude: 3.1195, longitude: 101.6541, title: 'Bus 2', description: 'MRT Feeder Bus', color: '#CEA8BC', busTypeId : 3 },
    { id: 3, latitude: 3.1202, longitude: 101.6508, title: 'Bus 3', description: 'UM Bus', color: '#A6C4E5', busTypeId : 1 },
    { id: 4, latitude: 3.1211, longitude: 101.6538, title: 'Bus 4', description: 'PJ City Bus', color: '#BCD5AC', busTypeId : 4 },
    { id: 5, latitude: 3.1220, longitude: 101.6519, title: 'Bus 5', description: 'Rapid KL Bus', color: '#F2CCA2', busTypeId : 2 },
    { id: 6, latitude: 3.1230, longitude: 101.6540, title: 'Bus 6', description: 'MRT Feeder Bus', color: '#CEA8BC', busTypeId : 3 },
    { id: 7, latitude: 3.1240, longitude: 101.6520, title: 'Bus 7', description: 'UM Bus', color: '#A6C4E5', busTypeId : 1 },
    { id: 8, latitude: 3.1250, longitude: 101.6530, title: 'Bus 8', description: 'PJ City Bus', color: '#BCD5AC', busTypeId : 4 },
    { id: 9, latitude: 3.1260, longitude: 101.6540, title: 'Bus 9', description: 'Rapid KL Bus', color: '#F2CCA2', busTypeId : 2 },
    { id: 10, latitude: 3.1270, longitude: 101.6550, title: 'Bus 10', description: 'MRT Feeder Bus', color: '#CEA8BC', busTypeId : 3 },
    { id: 11, latitude: 3.1280, longitude: 101.6560, title: 'Bus 11', description: 'UM Bus', color: '#A6C4E5', busTypeId : 1 },
    { id: 12, latitude: 3.1290, longitude: 101.6570, title: 'Bus 12', description: 'PJ City Bus', color: '#BCD5AC', busTypeId : 4 },
    { id: 13, latitude: 3.1300, longitude: 101.6580, title: 'Bus 13', description: 'Rapid KL Bus', color: '#F2CCA2', busTypeId : 2 },
    { id: 14, latitude: 3.1310, longitude: 101.6590, title: 'Bus 14', description: 'MRT Feeder Bus', color: '#CEA8BC', busTypeId : 3 },
    { id: 15, latitude: 3.1320, longitude: 101.6600, title: 'Bus 15', description: 'UM Bus', color: '#A6C4E5', busTypeId : 1 },
    { id: 16, latitude: 3.1330, longitude: 101.6610, title: 'Bus 16', description: 'PJ City Bus', color: '#BCD5AC', busTypeId : 4 },
];


const BusTracking = () => {
    // const busInfo = prasaranaBusInfo('rapid-bus-mrtfeeder');
    // console.log('Bus info: ', JSON.stringify(busInfo)); // Print the bus info to the consolebusInfo);
    const [location, setLocation] = useState<{ latitude: number; longitude: number, latitudeDelta: number, longitudeDelta: number } | null>(null);
    const [region, setRegion] = useState({
        latitude: 3.1185094544228233,
        longitude: 101.6527583151377,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
    });
    const [notification, setNotification] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [selectedBusType, setSelectedBusType] = useState<number | null>(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
        });

        return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
        };
    }, []);

    const filteredBusLocations = selectedBusType
    ? mockBusLocations.filter(bus => bus.busTypeId === selectedBusType)
    : mockBusLocations;

    
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
    // console.log(location);
    
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

                {filteredBusLocations.map((bus) => (
                    <Marker
                        key={bus.id}
                        coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
                        title={bus.title}
                        description={bus.description}
                        onPress={() => {
                            // Do something when the bus marker is pressed
                            console.log('Bus marker pressed:', bus);
                        }}
                    >
                        <FontAwesome5 name="bus" size={24} color={bus.color} />
                    </Marker>
                ))}
            </MapView>
            <SafeAreaView style={styles.overlay}>
                <View style={styles.container}>
                    {/* Search bar */}
                    <SearchBarView />
                    {/* Bus types list */}
                    <FlatList
                        data={busTypes}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.typeId.toString()}
                        renderItem={({ item }) => (
                            <BusType
                                typeId={item.typeId}
                                type={item.type}
                                typeColor={item.typeColor}
                                onSelect={(typeId) => {
                                    setSelectedBusType(typeId === selectedBusType ? null : typeId); // Toggle selection
                                }}
                                isSelected={item.typeId === selectedBusType}
                            />
                        )}
                    />

                    {/* Notification */}
                    {notification===true && (
                       <Notification {...notificationData}/>
                    )}
                    {/* Buses coming */}
                    { keyboardVisible === false && (
                    <View style={styles.busesComing}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={busNearYou}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <BusComing {...item} />
                            )}
                        />
                    </View>
                    )}
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
        bottom: 50,
    }
});
export default BusTracking;