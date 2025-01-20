// BLEConnection.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import useBluetooth from './useBlutooth';
import styles from '../css/BLEConnection';

const BLEConnection = () => {
  const { connectedDevice, connectToDevice } = useBluetooth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {connectedDevice ? `Connected to ${connectedDevice.name}` : 'No device connected'}
      </Text>
      <Button title="Connect to Bluetooth" onPress={connectToDevice} />
    </View>
  );
};

export default BLEConnection;
