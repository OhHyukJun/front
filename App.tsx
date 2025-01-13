import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './android/app/src/screens/SplashScreen';
import MainScreen from './android/app/src/screens/MainScreen';
import BLEConnection from './android/app/src/screens/BLEConnection';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Bluetooth" component={BLEConnection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
