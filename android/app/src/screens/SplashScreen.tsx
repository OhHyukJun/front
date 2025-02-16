import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { loginState, accessTokenState } from '../atom/login';
import styles from './css/SplashScreen';

type SplashScreenProps = {
  navigation: any;
};

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const [,setLoginState] = useRecoilState(loginState);
  const [,setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 대기 후 실행

      try {
        const storedAccessToken = await AsyncStorage.getItem('accessToken');
        console.log('Loaded Access Token from Storage:', storedAccessToken);

        if (storedAccessToken) {
          setAccessToken(storedAccessToken);
          setLoginState(true);
          navigation.replace('Home');
        } else {
          setLoginState(false);
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error loading access token:', error);
        setLoginState(false);
        navigation.replace('Login');
      }
    };

    initializeApp();
  }, [navigation]);

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
    </View>
  );
};

export default SplashScreen;
