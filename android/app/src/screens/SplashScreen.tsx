import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './css/SplashScreen';

type SplashScreenProps = {
  navigation: any;
};

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); //3초 뒤 로그인인 화면으로 이동
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.background} />
        <Image
          source={require('./img/logo.png')}
        />
      <Text style={styles.title}>나비잠</Text>
      <Text style={styles.subtitle}>아기야 두 팔 벌리고 편하게 자렴 :)</Text>
    </View>
  );
};

export default SplashScreen;
