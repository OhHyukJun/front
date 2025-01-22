import { useRef, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import base64 from 'react-native-base64'; // Base64 인코딩을 위해 사용
import RNFS from 'react-native-fs';

//HC-06 (98:DA:60:0D:B5:74)
const targetDeviceName = 'AivleBigPAudio';
const targetDeviceId = '8C:BF:EA:0E:E1:41';
const serviceUUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const characteristicUUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

interface useBluetooth {
  connectedDevice: Device | null;
  connectToDevice: () => Promise<void>;
}

const useBluetooth = (): useBluetooth => {
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
      return;
    }

    managerRef.current.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.error('Error during device scan:', error);
        Alert.alert('Error', 'Bluetooth 장치 검색 중 오류가 발생했습니다.');
        managerRef.current.stopDeviceScan();
        return;
      }

      console.log(`Device found: ${device?.name || 'Unknown'} (${device?.id || 'Unknown ID'})`);

      if (device && (device.name === targetDeviceName || device.id === targetDeviceId)) {
        managerRef.current.stopDeviceScan();
        try {
          const deviceConnection = await device.connect();
          await deviceConnection.discoverAllServicesAndCharacteristics();
          setConnectedDevice(deviceConnection);
          Alert.alert('Success', `Connected to ${deviceConnection.name}`);

          await sendData(deviceConnection);

        } catch (err) {
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
      const services = await device.services();
      for (const service of services) {
        const characteristics = await service.characteristics();
        for (const characteristic of characteristics) {
          if (characteristic.isWritableWithResponse) {
            const encodedData = base64.encode('r');
            await characteristic.writeWithResponse(encodedData);
            Alert.alert('Data Sent', 'The data "r" has been successfully sent.');
            return;
          }
        }
      }
      Alert.alert('Error', 'No writable characteristic found on the device.');
    } catch (err) {
      console.error('Failed to send data:', err);
      Alert.alert('Error', 'Failed to send data to the device.');
    }
  };

  const receiveData = async (device: Device): Promise<void> => {
    try {
      console.log('Starting to monitor for data...');
      device.monitorCharacteristicForService(
        serviceUUID,
        characteristicUUID,
        (error, characteristic) => {
          if (error) {
            console.error('Error while monitoring:', error);
            return;
          }

          if (characteristic?.value) {
            const decodedData = base64.decode(characteristic.value); // Base64로 디코딩
            console.log(`Received data: ${decodedData}`);
            // 데이터를 파일로 저장하거나 화면에 출력 가능
          }
        }
      );
    } catch (err) {
      console.error('Error receiving data:', err);
    }
  };

  const saveToFile = async (data: string) => {
    try {
      const path = `${RNFS.DocumentDirectoryPath}/receivedFile.wav`;
      await RNFS.writeFile(path, data, 'base64');
      console.log(`File saved to: ${path}`);
      Alert.alert('File Saved', `The file has been saved to ${path}`);
    } catch (err) {
      console.error('Failed to save file:', err);
      Alert.alert('Error', 'Failed to save the file.');
    }
  };

  return { connectedDevice, connectToDevice };
};

export default useBluetooth;
