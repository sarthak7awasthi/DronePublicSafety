// Google Map for Drone Transit Component
import React from 'react';
import { View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDHExKxNON3pftDvLKp4RpDDXk0GS8i2j8';

const INITIAL_REGION = {
    latitude: 39.955051,
    longitude: -75.187957,
    latitudeDelta: 0.001,
    longitudeDelta: 0.01,
};

const DRONE_INITIAL_REGION = {
    latitude: 39.957358846655480, 
    longitude: -75.19109138493116,
    latitudeDelta: 0.001,
    longitudeDelta: 0.01,
};

const userLocation =    {latitude: 39.955051, longitude: -75.187957, title: 'User Location'};

const droneLocations = [{latitude: 39.957646672627405, longitude: -75.18846274078619, title: 'Drone 01'},
                        {latitude: 39.957358846655480, longitude: -75.19109138493116, title: 'Drone 02'},
                        {latitude: 39.953094873134840, longitude: -75.18975028880688, title: 'Drone 03'},
                        {latitude: 39.955977180708800, longitude: -75.19261487904238, title: 'Drone 04'}
                        ]
                         
const droneHQLocation = [{latitude: 39.95768668867838, longitude: -75.18857972286044, title: 'Drone HQ1'},
                        {latitude: 39.954693168620565, longitude: -75.18376255395788, title: 'DUPD Drone HQ'},
                        ]

const droneMarkerImg = require('../assets/DroneMarker.png');
const userLocationImg = require('../assets/UserLocation.png');

export default function TransitMapComp({ droneLocated }) {
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

                {droneLocated && (
                     <MapViewDirections
                     origin={INITIAL_REGION}
                     destination={DRONE_INITIAL_REGION}
                     apikey={GOOGLE_MAPS_APIKEY}
                     strokeWidth={5}
                     strokeColor='#298ACF'
                 />
                )}
                
            </MapView>
        </View>
    );
};
