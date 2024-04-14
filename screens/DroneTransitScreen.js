import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import TransitMapComp from './TransitMapComp.js';
import { useNavigation } from '@react-navigation/native';

const DJITrelloImg = require('../assets/DJTrelloImg.jpg');



export default function DroneTransitScreen() {

    const navigation = useNavigation();

    const [droneWaitInfo, setDroneWaitInfo] = useState("Looking for the nearest drone...");
    const [droneTimeInfo, setDroneTimeInfo] = useState("");
    const [backgroundColor, setBackgroundColor] = useState('#F8C471');

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setDroneWaitInfo("Drone 03 is on its way!");
            setDroneTimeInfo("Drone ETA: 3 minutes");
            setBackgroundColor('#58D68D');
        }, 4000);

        // Clear timeout on component unmount
        return () => clearTimeout(timer1);
    }, []);

    return (
        <View style={styles.container}>
            
            <View style={styles.GoogleMaps}> 
                <TransitMapComp/>
            </View>

            <View style={styles.droneWaitContainer}>
                <Text style={styles.droneWaitInfo}> {droneWaitInfo} </Text>
                <Image source={DJITrelloImg} style={styles.DJITrelloImg} />
                <Text style={styles.droneTimeInfo}> {droneTimeInfo} </Text>
                <View style={[styles.droneTimeInfoContainer, {backgroundColor}]}>
                    <Text>Drone Info</Text>
                </View> 
            </View>

            <View style={styles.droneTransitBTNContainer}>
            <TouchableOpacity style={styles.call911Btn} onPress={() => navigation.navigate('SOS')}>
                <Text>Call 911</Text>
            </TouchableOpacity>
            
            <Text style={{textAlign: 'center', top: 0}}>OR</Text>

            <TouchableOpacity style={styles.CancleDroneBtn} onPress={() => navigation.navigate('Home')} >
                <Text>Cancel Drone</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: '#fff',
    },
    GoogleMaps: {
        width: "100%",
        height: "30%",
    },
    droneWaitContainer: {
        height: "30%",
        // backgroundColor: "green",
        alignItems: 'center',
    },
    droneWaitInfo: {
        top: 10,
        fontSize: 16,
    },
    DJITrelloImg: {
        top: 20,
        width: "100%",
        resizeMode: 'contain',
    },
    droneTimeInfo: {
        top: 30,
        fontSize: 16,
    },
    droneTimeInfoContainer: {
        top: 40,
        width: "100%",
        height: 20,
    },
    droneTransitBTNContainer:{
        position: "absolute",
        // backgroundColor: "green",
        width: "100%",
        bottom: 10,
    },
    call911Btn:{
        color: "#FFFFFF",
        backgroundColor: "#3BE482",
        fontWeight: "bold",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10,
    },
    CancleDroneBtn:{
        top: 10,
        bottom: 10,
        color: "#FFFFFF",
        backgroundColor: "#A569BD",
        fontWeight: "bold",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});