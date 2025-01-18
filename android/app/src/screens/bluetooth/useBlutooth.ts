import { useEffect, useRef, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';

const targetDeviceName = 'AivleBigPAudio';
const targetDeviceId = '8C:BF:EA:0E:E1:41';

const useBluetooth = () => {
  const managerRef = useRef<BleManager>(new BleManager());
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
      Alert.alert('Permission Denied', '블루투스 연결 권한이 필요합니다.');
      console.log('Bluetooth permissions are required.');
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
          console.log(`Connected to ${deviceConnection.name}`)
        } catch (err) {
          console.error(err);
          console.log('Failed to connect to the device.');
        }
      }
    });
  };

  return { connectedDevice, connectToDevice };
};

export default useBluetooth;
