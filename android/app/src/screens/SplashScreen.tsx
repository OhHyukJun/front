import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './css/SplashScreen';

type SplashScreenProps = {
  onFinish: () => void; // 스플래시 화면 종료 시 호출되는 함수
};

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // 3초 후 호출
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <Text style={styles.title}>나비잠</Text>
      <Text style={styles.subtitle}>아기야 두 팔 벌리고 편하게 자렴 :)</Text>
    </View>
  );
};

export default SplashScreen;
