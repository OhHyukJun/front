import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

// Type definition for a Bluetooth device
type Device = {
  name?: string;
  address?: string;
  isConnected?: () => Promise<boolean>; // Optional method to check connection status
};

// Interface for the custom hook's return values
interface UseBluetoothClassic {
  scannedDevices: Device[];
  scanDevices: () => Promise<void>;
  findDeviceAndSendData: (data: string) => Promise<void>;
  disconnectDevice: () => Promise<void>;
  isConnected: boolean;
}

const useBluetoothClassic = (): UseBluetoothClassic => {
  const [scannedDevices, setScannedDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Request permissions for Bluetooth operations
  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      return Object.values(granted).every((result) => result === PermissionsAndroid.RESULTS.GRANTED);
    }
    return true;
  };

  const scanDevices = async (): Promise<void> => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) {
      Alert.alert('Permission Denied', 'Bluetooth permissions are required.');
      return;
    }

    try {
      console.log('Scanning for Bluetooth devices...');
      const devices: Device[] = await RNBluetoothClassic.startDiscovery();
      setScannedDevices(devices);
      console.log('Discovered devices:', devices);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Failed to scan devices:', errorMessage);
    }
  };

  const findDeviceAndSendData = async (data: string): Promise<void> => {
    try {
      console.log('Searching for HC-06...');
      const devices: Device[] = await RNBluetoothClassic.startDiscovery();
      setScannedDevices(devices);
      console.log('Discovered devices:', devices);

      const targetDevice = devices.find(
        (device) => device.address === '98:DA:60:0D:B5:74' || device.name === 'HC-06'
      );

      if (targetDevice) {
        console.log(`HC-06 found: ${targetDevice.address}`);
        const connected = await RNBluetoothClassic.connectToDevice(targetDevice.address!);
        if (connected) {
          console.log('Successfully connected to HC-06.');
          setConnectedDevice(connected);
          setIsConnected(true);

          // Send data to the connected device
          const dataWithTerminator = data + '\\r\\n';
          console.log(`Preparing to send data: ${dataWithTerminator}`);
          try {
            await RNBluetoothClassic.writeToDevice(targetDevice.address!, dataWithTerminator);
            console.log('Data sent successfully.');
          } catch (sendError) {
            const errorMessage = sendError instanceof Error ? sendError.message : String(sendError);
            console.error('Failed to send data:', errorMessage);
          }
        } else {
          console.log('Failed to connect to HC-06.');
        }
      } else {
        console.log('HC-06 not found.');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error during device search or data sending:', errorMessage);
    }
  };

  // Disconnect from the currently connected device
  const disconnectDevice = async (): Promise<void> => {
    if (!connectedDevice) {
      console.log('No device is currently connected.');
      return;
    }

    try {
      console.log(`Disconnecting from device: ${connectedDevice.name || connectedDevice.address}`);
      await RNBluetoothClassic.disconnectFromDevice(connectedDevice.address!);
      setConnectedDevice(null);
      setIsConnected(false);
      console.log('Device disconnected successfully.');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Failed to disconnect device:', errorMessage);
    }
  };

  // Monitor the connection status of the device
  useEffect(() => {
    const interval = setInterval(async () => {
      if (connectedDevice && connectedDevice.isConnected) {
        try {
          const status = await connectedDevice.isConnected();
          setIsConnected(status);
          console.log(`Connection status: ${status ? 'Connected' : 'Disconnected'}`);
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error('Error checking connection status:', errorMessage);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [connectedDevice]);

  return { scannedDevices, scanDevices, findDeviceAndSendData, disconnectDevice, isConnected };
};

export default useBluetoothClassic;
