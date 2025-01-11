import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './css/MainScreen';

const MainScreen = ({ onNavigateToBluetooth }: { onNavigateToBluetooth: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the App</Text>
      <Button title="Go to Bluetooth Connection" onPress={onNavigateToBluetooth} />
    </View>
  );
};

export default MainScreen;
