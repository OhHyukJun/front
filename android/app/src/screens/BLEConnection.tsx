import React, { useRef, useState } from 'react';
import { View, Text, Button, Alert, PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import styles from './css/BLEConnection';

const targetDeviceName = 'AivleBigPAudio';
const targetDeviceId = '8C:BF:EA:0E:E1:41';

const BLEConnection = () => {
  const managerRef = useRef(new BleManager());
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      return (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true;
  };

  const connectToDevice = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) {
      Alert.alert('Permission Denied', 'Bluetooth permissions are required.');
      return;
    }

    managerRef.current.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.error(error);
        managerRef.current.stopDeviceScan();
        return;
      }

      if (device && (device.name === targetDeviceName || device.id === targetDeviceId)) {
        managerRef.current.stopDeviceScan();
        try {
          const deviceConnection = await device.connect();
          await deviceConnection.discoverAllServicesAndCharacteristics();
          setConnectedDevice(deviceConnection);
          Alert.alert('Success', `Connected to ${deviceConnection.name}`);
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

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
