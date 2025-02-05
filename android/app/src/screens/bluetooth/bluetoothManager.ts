import { Alert } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import saveToFile from './fileHandler';

export const connectToDevice = async (
  manager: BleManager,
  targetDeviceName: string,
  targetDeviceId: string,
  setConnectedDevice: (device: Device | null) => void,
  sendData: (device: Device) => Promise<void>
): Promise<void> => {
  console.log('Starting Bluetooth connection process...');
  manager.startDeviceScan(null, null, async (error, device) => {
    if (error) {
      Alert.alert('Error', 'Bluetooth 장치 검색 중 오류가 발생했습니다.');
      manager.stopDeviceScan();
      return;
    }

    console.log(`Device found: ${device?.name || 'Unknown'} (${device?.id || 'Unknown ID'})`);

    if (device && (device.name === targetDeviceName || device.id === targetDeviceId)) {
      manager.stopDeviceScan();
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
    manager.stopDeviceScan();
    console.log('Scanning stopped due to timeout.');
  }, 1000);
};

export const disconnectDevice = async (
  connectedDevice: Device | null,
  setConnectedDevice: (device: Device | null) => void
): Promise<void> => {
  if (connectedDevice) {
    try {
      console.log('Bluetooth 연결 해제 중...');
      await connectedDevice.cancelConnection(); // BLE 연결 해제
      setConnectedDevice(null); // 상태 초기화
      Alert.alert('Disconnected', 'Bluetooth 연결이 해제되었습니다.');
    } catch (error: any) {
      console.error('Bluetooth 연결 해제 중 오류 발생:', error);
      Alert.alert('Error', 'Bluetooth 연결 해제 실패.');
    }
  } else {
    console.log('연결된 장치가 없습니다.');
    Alert.alert('No Device Connected', '현재 연결된 장치가 없습니다.');
  }
};
export const receiveData = async (
  device: Device,
  serviceUUID: string,
  characteristicUUID: string
): Promise<void> => {
  try {
    console.log('데이터 수신 대기 중...');
    let completeData: number[] = []; // 수신된 전체 데이터를 저장할 배열

    const subscription = device.monitorCharacteristicForService(
      serviceUUID,
      characteristicUUID,
      async (error, characteristic) => {
        if (error) {
          console.error('Error while monitoring:', error);
          return;
        }

        if (characteristic?.value) {
          try {
            const decodedString = base64.decode(characteristic.value); // Base64 디코딩
            console.log(`Received data: ${decodedString}`);

            // **EOF 체크 (문자열 비교 유지)**
            if (decodedString === 'EOF') {
              console.log('파일 수신 완료:', completeData);

              // Uint8Array로 변환 후 저장
              const fullData = new Uint8Array(completeData);
              await saveToFile(fullData, 16000);

              subscription.remove();
              return;
            }

            // **데이터를 바이트 배열로 변환**
            const decodedData = new Uint8Array([...decodedString].map((char) => char.charCodeAt(0)));

            // **16비트 데이터 변환**
            for (let i = 0; i < decodedData.length; i += 2) {
              if (i + 1 < decodedData.length) {
                const uint16Value = (decodedData[i] | (decodedData[i + 1] << 8)); // 16비트 데이터 조합
                completeData.push(uint16Value);
              }
            }
          } catch (decodeError) {
            console.error('Base64 변환 오류:', decodeError);
          }
        }
      }
    );

    setTimeout(() => {
      console.log('Monitoring timed out. Stopping subscription.');
      subscription.remove();
    }, 40000);
  } catch (err) {
    console.error('Error receiving data:', err);
  }
};/*
export const receiveData = async (
    device: Device,
    serviceUUID: string,
    characteristicUUID: string
  ): Promise<void> => {
    try {
      console.log('데이터 수신 대기 중...');
      let completeData: number[] = []; // 수신된 데이터를 저장

      const subscription = device.monitorCharacteristicForService(
        serviceUUID,
        characteristicUUID,
        async (error, characteristic) => {
          if (error) {
            console.error('Error while monitoring:', error);
            return;
          }

          if (characteristic?.value) {
            const decodedData = base64.decode(characteristic.value); // Base64 디코딩
            console.log(`Received data: ${decodedData}`);

            if (decodedData === 'EOF') {
              console.log('파일 수신 완료:', completeData);
              await saveToFile(completeData, 16000);
              subscription.remove();
              return;
            }

            const buffer = new Uint8Array([...decodedData].map((char) => char.charCodeAt(0))).buffer;
            const dataView = new DataView(buffer);

            for (let i = 0; i < dataView.byteLength; i += 2) {
              const uint16Value = dataView.getUint16(i, true);
              completeData.push(uint16Value);
            }
            console.log(completeData);
          }
        }
      );

      setTimeout(() => {
        console.log('Monitoring timed out. Stopping subscription.');
        subscription.remove();
      }, 40000);
    } catch (err) {
      console.error('Error receiving data:', err);
    }
};
*/

export const sendData = async (device: Device, serviceUUID: string, characteristicUUID: string): Promise<void> => {
  try {
    const services = await device.services();
    for (const service of services) {
      const characteristics = await service.characteristics();
      for (const characteristic of characteristics) {
        if (characteristic.isWritableWithResponse) {
          console.log('Sending start recording signal...');
          await characteristic.writeWithResponse(base64.encode('r'));
          Alert.alert('Data Sent', 'The data "r" has been successfully sent.');

          // 약간의 지연을 주어 아두이노가 녹음할 준비 시간을 확보할 수 있도록 함
          setTimeout(async () => {
            await receiveData(device, serviceUUID, characteristicUUID);
          }, 500);
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
