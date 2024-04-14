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
            setDroneWaitInfo("Drone 02 is on its way!");
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

            <View style={styles.SOSButtonContainer}>
                <TouchableOpacity style={styles.SOSButton} onPress={() => navigation.navigate('SOS')} >
                    <Text style={styles.SOSButtonText}>SOS</Text>
                </TouchableOpacity>

                {/* <Button
                    style={styles.SOSButton} 
                    title="SOS" 
                    onPress={() => navigation.navigate('SOS')} 
                    /> */}

            </View>

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
                <Text style={styles.call911BtnText}>Call 911</Text>
                </TouchableOpacity>
            
                <Text style={{textAlign: 'center'}}>OR</Text>

                <TouchableOpacity style={styles.CancleDroneBtn} onPress={() => navigation.navigate('Home')} >
                    <Text style={styles.CancleDroneBtnText}>Cancel Drone</Text>
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
    SOSButtonContainer:{
        position: 'absolute',
        top: 80,
        left: 10,
        zIndex: 1,
    },
    SOSButton:{
        backgroundColor:'#D93232',
        width: 130,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 5,
        borderColor: "#E34F4F"
    },
    SOSButtonText:{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
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
        bottom: 40,
    },
    call911Btn:{
        backgroundColor: "#36C73C",
        color: "#FFFFFF",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
        bottom: 10,
    },
    call911BtnText:{
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    CancleDroneBtn:{
        top: 10,
        bottom: 20,
        backgroundColor: "#D93232",
        color: "#FFFFFF",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    CancleDroneBtnText:{
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
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