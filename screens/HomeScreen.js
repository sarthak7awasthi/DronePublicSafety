import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useFonts} from 'expo-font';
import GoogleMapComp from './GoogleMapComp.js';

import MapView from 'react-native-maps';

const GoogleMaps = require('../assets/googlemapsTemp.png')

export default function HomeScreen() {

    // User data
    const [userName, setUserName] = useState("EMILY");
    const [minutesAway, setMinutesAway] = useState(3);

    // Load fonts
    const [fontsLoaded] = useFonts({
        'Poppins Medium': require('../assets/fonts/Poppins Medium.ttf'),
    });

    const navigation = useNavigation();

    const handleRequestDrone = () => {
        console.log("Requesting Drone");
        // navigation.navigate('DroneTransit');
        Alert.alert(
            "Confirmation",
            "Are you sure you want to request a drone?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => navigation.navigate('DroneTransit'),
                },
            ]
        );
    };

    return (
    <View style={styles.container}>

        {/* <Image 
            source={GoogleMaps} 
            style={styles.GoogleMaps} 
            /> */}
        
        <View style={styles.GoogleMaps}> 
            {/* <MapView 
                style={styles.mapStyle}
            /> */}
            <GoogleMapComp/>
        </View>

        <View style={styles.SOSButtonContainer}>
            
            <Button
                style={styles.SOSButton} 
                title="SOS" 
                onPress={() => navigation.navigate('SOS')} 
                />

        </View>

        <View style={styles.welcomeMsgContainer}>    
            <Text style={styles.welcomeMsg}>
            HI <Text style={styles.userNameText}> {userName} </Text> , A DRONE IS ONLY <Text style={styles.userNameText}>{minutesAway} MINUTES </Text> AWAY FROM YOU. 
            </Text>

            <View style={styles.disclaimerContainer}>
                <Text style={styles.disclaimer}> 
                Remember to always be aware of your surroundings. If you feel like you are under immidieate threat please call 911 or use the SOS button at the top.
                </Text>
            </View>

        </View>
        
        <View style={styles.ReqDroneButtonContainer}>        
            <Button 
                style={styles.ReqDroneButton}
                title="Request a Drone" 
                onPress={() =>handleRequestDrone()} 
                />
        </View>
        
        <StatusBar style="auto" />
    </View>
  );
}

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
        backgroundColor:'red',
        width: 50,
    },
    GoogleMaps: {
        width: "100%",
        height: "50%",
    },
    mapStyle: {
        width: "100%",
        height: "100%",
    },
    welcomeMsgContainer:{
        // backgroundColor: '#239B56',
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 60,
        paddingTop: 10,
    },
    welcomeMsg:{
        color: 'black',
        fontFamily: 'Poppins Medium',
        fontSize: 50,
        textAlign: 'left',
    },
    userNameText:{
        color: 'blue',
    },
    disclaimerContainer:{
        paddingHorizontal: 10,
    },
    ReqDroneButtonContainer:{
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
    },
});
