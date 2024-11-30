import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, ProgressBar } from "react-native-paper";
import CircularProgress from "./CircularProgress";
import ScanCard from "./ScanCard";
import { router } from "expo-router";

const RideCard = ()=>{
    return (
        <Card style={[styles.card ]}>
        <Card.Content style={{flexDirection: "row", alignItems: "center", justifyContent:'center'}}>
            <View style={{ flexDirection: "column"}}>
                <Text style={{ fontSize: 14, fontWeight: "500", color: "#FF9C2F", marginBottom: 10 }}>Your Ride</Text>
                <CircularProgress progress={0.2} />
            </View>

            <View style={styles.bothScanContainer}>
                <ScanCard
                  title="Public Transport"
                  scanCount="10"
                  scanText="rides this week"
                  actionText="Ride Now"
                  color={'04A0E3'}
                  onPress={() => {
                    router.push("/pages/busTracking/busTracking");
                  }}
                />
                <ScanCard
                  title="Ride Hailing"
                  scanCount="2"
                  scanText="ride this week"
                  actionText="Book Now"
                  color={'04A0E3'}
                  onPress={() => {
                    router.push("/pages/sapu/SapuHome");
                  }}
                />
              </View>
          
        </Card.Content>
      </Card>
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 8,
        elevation: 2,
        backgroundColor: "#fff",
        shadowOffset: {width: 1, height: 1},
        shadowColor: "#333",
        shadowOpacity: 0.3,
    },
    progressBar: {
        borderRadius: 8,
        backgroundColor: 'lightgray',
        height: 8,
        padding: 0,
        marginTop: 4,
      },
      bothScanContainer: {
        marginRight: 10,
      },
});


export default RideCard;