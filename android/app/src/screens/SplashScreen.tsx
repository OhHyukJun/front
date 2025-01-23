import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { loginState, accessTokenState } from '../atom/login';
import styles from './css/SplashScreen';

type SplashScreenProps = {
  navigation: any;
};

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const [isLoggedIn, setLoginState] = useRecoilState(loginState);
  const [, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          setAccessToken(token);
          setLoginState(true); // 로그인 상태 복원
          navigation.replace('Home'); // 로그인 상태면 Home으로 이동
        } else {
          setLoginState(false);
          navigation.replace('Login'); // 로그인되지 않았으면 Login으로 이동
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
        setLoginState(false);
        navigation.replace('Login');
      }
    };

    checkLoginStatus();
  }, [navigation, setAccessToken, setLoginState]);

  return (
    <View style={styles.container}>
      <View style={styles.background} />
        <Image
          source={require('./img/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      <Text style={styles.title}>나비잠</Text>
      <Text style={styles.subtitle}>아기야 두 팔 벌리고 편하게 자렴 :)</Text>
      <ActivityIndicator size="large" color="#292929" style={styles.loadingIndicator} />
    </View>
  );
};

export default SplashScreen;
