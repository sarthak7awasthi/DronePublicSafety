import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import SOSMessaging from './screens/SOSMessaging';
import DroneTransitScreen from './screens/DroneTransitScreen';
import DroneControl from './screens/DroneControl';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SOS" component={SOSMessaging} />
        <Stack.Screen name="DroneTransit" component={DroneTransitScreen} options={{headerShown: false}}/>
        <Stack.Screen name="DroneControl" component={DroneControl} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}