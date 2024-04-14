// Google Map Component
import React from 'react';
import { View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const INITIAL_REGION = {
    latitude: 39.955051,
    longitude: -75.187957,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
};

const userLocation =    {latitude: 39.955051, longitude: -75.187957, title: 'User Location'};

const droneLocations = [{latitude: 39.957646672627405, longitude: -75.18846274078619, title: 'Drone 01'},
                        {latitude: 39.957358846655480, longitude: -75.19109138493116, title: 'Drone 02'},
                        {latitude: 39.954093873134840, longitude: -75.18975028880688, title: 'Drone 03'},
                        {latitude: 39.955977180708800, longitude: -75.19261487904238, title: 'Drone 04'}
                        ]

const droneMarkerImg = require('../assets/DroneMarker.png');
const userLocationImg = require('../assets/UserLocation.png');

export default function GoogleMapComp() {
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={INITIAL_REGION}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {droneLocations.map((drone, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: drone.latitude,
                            longitude: drone.longitude,
                        }}
                        title={drone.title}
                        image={droneMarkerImg}
                    />
                ))}

                <Marker
                    coordinate={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                    }}
                    title={userLocation.title}
                    image={userLocationImg}/> 
                
            </MapView>
        </View>
    );
};
