import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Linking } from 'react-native';
import TransitMapComp from './TransitMapComp.js';
import { useNavigation } from '@react-navigation/native';

const DJITrelloImg = require('../assets/DJTrelloImg.jpg');

export default function DroneTransitScreen() {

    const navigation = useNavigation();

    const [droneWaitInfo, setDroneWaitInfo] = useState("Looking for the nearest drone...");
    const [backgroundColor, setBackgroundColor] = useState('#F8C471');
    const [droneLocated, setDroneLocated] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(30);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setDroneWaitInfo("Drone 03 is on its way!");
            setBackgroundColor('#58D68D');
            setDroneLocated(true);
        }, 4000);

        const timer2 = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime > 0){
                    return prevTime - 1;
                }
                else{
                    clearInterval(timer2);
                    clearImmediate(timer1);
                    navigation.navigate('DroneControl');
                    return 0;
                }
            });
        }, 1000);
    }, []);

        // Function to open phonebook with 911 dialed in
        const call911 = () => {
            Linking.openURL('tel:911');
        };

        const progress = (30 - timeRemaining) / 30;
    return (
        <View style={styles.container}>
            
            <View style={styles.GoogleMaps}> 
                <TransitMapComp droneLocated={droneLocated}/>
            </View>

            <View style={styles.droneWaitContainer}>
                <Text style={styles.droneWaitInfo}> {droneWaitInfo} </Text>
                <Image source={DJITrelloImg} style={styles.DJITrelloImg} />

                <View style={[styles.droneStatusBar, {backgroundColor}]}>
                    {/* <Text style={styles.droneTimeInfoContainerText}>Drone Info</Text> */}

                    <View style={styles.loadingBar}> 
                        <View style={[styles.progressBar, {width: `${progress * 100}%`, backgroundColor: backgroundColor}]}></View>
                    </View>
                </View> 
                <Text style={styles.droneTimeInfo}> The drone is around {Math.ceil(timeRemaining/5)*5} seconds away. </Text>
            </View>

            <View style={styles.droneTransitBTNContainer}>

            <TouchableOpacity style={styles.call911Btn} onPress={call911}>
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
        height: "55%",
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
        top: 50,
        fontSize: 16,
    },
    droneStatusBar: {
        top: 30,
        width: "100%",
        // height: 20,
    },
    droneTimeInfoContainerText:{
        textAlign: 'center',
        fontWeight: "bold",
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
    },
    loadingBar:{
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        // marginBottom: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#3BE482',
        borderRadius: 5,
    },
});