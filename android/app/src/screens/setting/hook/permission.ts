import { PermissionsAndroid, Platform } from 'react-native';

const requestPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    console.log('Requesting Bluetooth permissions...');
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    const permissionsGranted =
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED;

    console.log(`Bluetooth permissions granted: ${permissionsGranted ? 'Yes' : 'No'}`);
    return permissionsGranted;
  }
  console.log('No permission request needed for this platform.');
  return true;
};

export default requestPermissions;
