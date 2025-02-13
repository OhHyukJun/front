import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { QueryClient } from '@tanstack/react-query';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { loginState, accessTokenState } from './android/app/src/atom/login';
import { adminState } from './android/app/src/atom/admin';
import SplashScreen from './android/app/src/screens/SplashScreen';
import HomeScreen from './android/app/src/screens/home/HomeScreen';
import ChatbotScreen from './android/app/src/screens/chatbot/ChatbotScreen';
import SettingScreen from './android/app/src/screens/setting/SettingScreen';
import AccountScreen from './android/app/src/screens/setting/AccountScreen';
import AdminDelete from './android/app/src/screens/home/admin/AdminDelete';
import BLEConnection from './android/app/src/screens/bluetooth/BLEConnection';
import LoginScreen from './android/app/src/screens/auth/Login/LoginScreen';
import IdFind from './android/app/src/screens/auth/Login/IdFInd';
import PasswordFind from './android/app/src/screens/auth/Login/PasswordFind';
import RegisterEmail from './android/app/src/screens/auth/Register/RegisteEmail';
import RegisterName from './android/app/src/screens/auth/Register/RegisterName';
import RegisterPassword from './android/app/src/screens/auth/Register/RegisterPassword';
import ChangePassword from './android/app/src/screens/setting/ChangePassword';
import ConfirmPassword from './android/app/src/screens/auth/Register/CofirmPassword';
import PersonalInfo from './android/app/src/screens/auth/Register/PersonalInfo';
import AdminWrite from './android/app/src/screens/home/admin/AdminWrite';
// React Query Client 생성
// const queryClient = new QueryClient();
import { Buffer } from 'buffer';
global.Buffer = Buffer;


LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews',
  'Cannot remove child at index',
]);

const Stack = createNativeStackNavigator();

const AppInitializer = () => {
  const setLogin = useSetRecoilState(loginState);
  const setAdmin = useSetRecoilState(adminState);
  const setAccessToken = useSetRecoilState(accessTokenState);

  useEffect(() => {
    const initializeState = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem('accessToken');
        const storedAdminState = await AsyncStorage.getItem('adminState');

        if (storedAccessToken) {
          setAccessToken(storedAccessToken);
          setLogin(true);
        }

        if (storedAdminState !== null) {
          setAdmin(JSON.parse(storedAdminState)); // 저장된 값 반영
        }
      } catch (error) {
        console.error('앱 초기화 오류:', error);
      }
    };

    initializeState();
  }, []);

  return null; // 아무 UI도 렌더링하지 않음
};

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AdminDelete" component={AdminDelete} />
          <Stack.Screen name="AdminWrite" component={AdminWrite} />
          <Stack.Screen name="Chatbot" component={ChatbotScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Info" component={PersonalInfo} />
          <Stack.Screen name="Email" component={RegisterEmail} />
          <Stack.Screen name="Name" component={RegisterName} />
          <Stack.Screen name="IdFind" component={IdFind} />
          <Stack.Screen name="PasswordFind" component={PasswordFind} />
          <Stack.Screen name="Password" component={RegisterPassword} />
          <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
          <Stack.Screen name="BLEConnection" component={BLEConnection} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
