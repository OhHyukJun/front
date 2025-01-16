import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { QueryClient } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import SplashScreen from './android/app/src/screens/SplashScreen';
import HomeScreen from './android/app/src/screens/HomeScreen';
import MainScreen from './android/app/src/screens/MainScreen';
import DashboardScreen from './android/app/src/screens/DashboardScreen';
import BLEConnection from './android/app/src/screens/BLEConnection';
import LoginScreen from './android/app/src/screens/auth/Login/LoginScreen';
import RegisterEmail from './android/app/src/screens/auth/Register/RegisteEmail';
import RegisterName from './android/app/src/screens/auth/Register/RegisterName';
import RegisterPassword from './android/app/src/screens/auth/Register/RegisterPassword';
import ConfirmPassword from './android/app/src/screens/auth/Register/CofirmPassword';
import PersonalInfo from './android/app/src/screens/auth/Register/PersonalInfo';
// React Query Client 생성
// const queryClient = new QueryClient();s

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Info" component={PersonalInfo} />
          <Stack.Screen name="Email" component={RegisterEmail} />
          <Stack.Screen name="Name" component={RegisterName} />
          <Stack.Screen name="Password" component={RegisterPassword} />
          <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
          <Stack.Screen name="Bluetooth" component={BLEConnection} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
