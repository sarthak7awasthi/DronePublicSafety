import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';


const DJITrelloImg = require('../assets/DJTrelloImg.jpg');
const qrSticker = require('../assets/qrPhone.png');
const DroneControlImg = require('../assets/droneControls.png');

export default function DroneControl({ navigation }) {
    const call911 = () => {
      Linking.openURL('tel:911');
    };
  return (
    <View style={styles.container}>
        <View style={styles.droneTrackContainer}>
            <View style={styles.droneWaitContainer}>
                <Image source={DJITrelloImg} style={styles.DJITrelloImg} />
                <Text style={styles.droneTimeInfo}> Drone 02 is now monitoring you. </Text>
                <View style={styles.droneStatusBar}>
                    <View style={styles.loadingBar}> 
                        <View style={[styles.progressBar, {width: `90%`}]}>
                        </View>
                    </View>
                </View> 
            </View>
                <Text style={styles.droneBattreyInfo}> Battery: 90% </Text>
        </View>
        <View styles={styles.droneQRContainer}>
            <Image source={qrSticker} style={styles.qrSticker} />
        </View>
        <View style={styles.droneControlContainer}>
            <Image source={DroneControlImg} style={styles.dControl} />
        </View>
        <View style={styles.droneTransitBTNContainer}>

            <TouchableOpacity style={styles.call911Btn} onPress={call911}>
                <Text style={styles.call911BtnText}>Call 911</Text>
            </TouchableOpacity>

            <Text style={{textAlign: 'center', top: 0}}>OR</Text>

            <TouchableOpacity style={styles.CancleDroneBtn} onPress={() => navigation.navigate('Home')} >
                <Text style={styles.CancleDroneBtnText} >Cancel Drone</Text>
            </TouchableOpacity>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  droneWaitContainer: {
    height: "30%",
    // backgroundColor: "green",
    alignItems: 'center',
    top: 100,
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
    alignContent: 'center',
    justifyContent: 'center',
},
droneStatusBar: {
    top: 50,
    width: "100%",
    // height: 20,
},
loadingBar:{
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    // marginBottom: 10,
},
progressBar: {
    height: '100%',
    backgroundColor: '#F1C40F',
    borderRadius: 5,
},
droneBattreyInfo: {
    top: 220,
    left: 10,
    fontSize: 16,
},
droneQRContainer: {
    width: "100%",
    // top: 350,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
},
qrSticker: {
    top: 80,
    width: "100%",
    resizeMode: 'contain',
},
droneControlContainer: {
    top: 150,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
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
});
