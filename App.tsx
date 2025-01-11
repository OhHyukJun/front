import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import SplashScreen from './android/app/src/screens/SplashScreen';

const App = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 3초 뒤 스플래쉬 화면 종료
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <Text>메인 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default App;