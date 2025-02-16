import React from 'react';
import { View, Text, Button } from 'react-native';
import useBluetooth from './useBluetoothClassic';
import styles from '../css/BLEConnection';

const BLEConnection = () => {
  // const { connectedDevice, connectToDevice } = useBluetooth();
  const { scannedDevices, scanDevices } = useBluetooth();
  /*
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {connectedDevice ? `Connected to ${connectedDevice.name}` : 'No device connected'}
      </Text>
      <Button title="Connect to Bluetooth" onPress={connectToDevice} />
    </View>
  );*/
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nearby Devices:</Text>
      {scannedDevices && scannedDevices.length > 0 ? (
        scannedDevices.map((device, index) => (
          <Text key={index}>
            {device.name || 'Unknown'} ({device.address || 'No Address'})
          </Text>
        ))
      ) : (
        <Text style={styles.text}>No devices found. Please scan.</Text>
      )}
      <Button title="Scan for Devices" onPress={async () => {
        try {
          await scanDevices();
        } catch (error) {
          console.error('Error during scanning:', error);
        }
      }} />
    </View>
  );
};

export default BLEConnection;
