import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './css/MainScreen';

type MainScreenProps = {
  navigation: any; // React Navigation의 navigation 객체
};

const MainScreen = ({ navigation }: MainScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the App</Text>
      <Button title="Go to Bluetooth Connection" onPress={() => navigation.navigate('Bluetooth')} />
    </View>
  );
};

export default MainScreen;
