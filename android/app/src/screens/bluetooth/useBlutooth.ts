import { useRef, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import base64 from 'react-native-base64'; // Base64 인코딩을 위해 사용

const targetDeviceName = 'AivleBigPAudio';
const targetDeviceId = '8C:BF:EA:0E:E1:41';
const targetServiceUUID = 'your-service-uuid';
const targetCharacteristicUUID = 'your-characteristic-uuid';

interface UseBluetooth {
  connectedDevice: Device | null;
  connectToDevice: () => Promise<void>;
}

const useBluetooth = (): UseBluetooth => {
  const managerRef = useRef(new BleManager());
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      console.log('Requesting Bluetooth permissions...');
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      const permissionsGranted =
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED;

      console.log(`Bluetooth permissions granted: ${permissionsGranted ? 'Yes' : 'No'}`);
      return permissionsGranted;
    }
    console.log('No permission request needed for this platform.');
    return true;
  };

  const connectToDevice = async (): Promise<void> => {
    console.log('Starting Bluetooth connection process...');  
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) {
      Alert.alert('Permission Denied', 'Bluetooth 권한이 필요합니다.');
      console.log('Bluetooth permissions denied.');
      return; 
    }

    console.log('Scanning for Bluetooth devices...');
    managerRef.current.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.error('Error during device scan:', error);
        Alert.alert('Error', 'Bluetooth 장치 검색 중 오류가 발생했습니다.');
        managerRef.current.stopDeviceScan();
        return;
      }

      console.log(`Device found: ${device?.name || 'Unknown'} (${device?.id || 'Unknown ID'})`);

      if (device && (device.name === targetDeviceName || device.id === targetDeviceId)) {
        console.log(`Target device found: ${device.name} (${device.id})`);
        managerRef.current.stopDeviceScan();
        try {
          console.log('Attempting to connect to the device...');
          const deviceConnection = await device.connect();
          console.log('Device connected. Discovering services and characteristics...');
          await deviceConnection.discoverAllServicesAndCharacteristics();
          setConnectedDevice(deviceConnection);
          Alert.alert('Success', `Connected to ${deviceConnection.name}`);
          console.log(`Connected to device: ${deviceConnection.name}`);

          await sendData(deviceConnection);

        } catch (err) {
          console.error('Failed to connect to the device:', err);
          Alert.alert('Connection Failed', '장치 연결에 실패했습니다. 다시 시도해주세요.');
        }
      }
    });

    setTimeout(() => {
      managerRef.current.stopDeviceScan();
      console.log('Scanning stopped due to timeout.');
    }, 10000);
  };

  const sendData = async (device: Device): Promise<void> => {
    try {
      console.log('Sending data to the device...');
      const encodedData = base64.encode('r'); // 'r' 데이터를 Base64로 인코딩
      await device.writeCharacteristicWithResponseForService(
        targetServiceUUID,
        targetCharacteristicUUID,
        encodedData
      );
      console.log('Data sent successfully: r');
      Alert.alert('Data Sent', 'The data "r" has been successfully sent.');
    } catch (err) {
      console.error('Failed to send data:', err);
      Alert.alert('Error', 'Failed to send data to the device.');
    }
  };

  return { connectedDevice, connectToDevice };
};

export default useBluetooth;
