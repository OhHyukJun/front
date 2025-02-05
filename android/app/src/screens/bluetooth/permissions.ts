import { PermissionsAndroid, Platform } from 'react-native';

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

export default requestPermissions;
