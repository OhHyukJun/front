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
  characteristicUUID: string,
  setProcessing: (status: boolean) => void,
  setResult: (result: string) => void
): Promise<void> => {
  try {
    console.log('데이터 수신 대기 중...');

    let aiResult = '';
    let waitingForResult = false;
    const EOF_MARKER = 'EOF';

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
            const decodedData = base64.decode(characteristic.value).trim();
            console.log(`수신된 데이터: ${decodedData}`);

            // Step 1: "w" 수신 → AI 모델 실행 시작
            if (!waitingForResult && decodedData === 'w') {
              console.log('AI 분석 진행 중... 결과 대기');
              waitingForResult = true;
              setProcessing(true);
              return;
            }

            if (waitingForResult && aiResult === '') {
              console.log('AI 결과 수신 완료');
              aiResult = decodedData;
              if (!setResult) {
                console.error('setResult is undefined! 사용 전에 확인이 필요합니다.');
              } else {
                setResult(aiResult);
              }
              return;
            }

            if (decodedData === EOF_MARKER) {
              console.log('EOF 수신, 데이터 모니터링 종료');
              subscription.remove();
              setProcessing(false);

              // Alert.alert('AI 결과', `예측 결과: ${aiResult.trim()}`);
              return;
            }
          } catch (decodeError) {
            console.error('데이터 변환 오류:', decodeError);
          }
        }
      }
    );
  } catch (err) {
    console.error('데이터 수신 중 오류 발생:', err);
    setProcessing(false);
  }
};

export const sendData = async (
  device: Device, 
  serviceUUID: string, characteristicUUID: string,
  setProcessing: (status: boolean) => void,
  setResult: (result: string) => void
): Promise<void> => {
  try {
    const services = await device.services();
    for (const service of services) {
      const characteristics = await service.characteristics();
      for (const characteristic of characteristics) {
        if (characteristic.isWritableWithResponse) {
          console.log('Sending start recording signal...');
          await characteristic.writeWithResponse(base64.encode('r'));

          setProcessing(true);
          // 약간의 지연을 주어 아두이노가 녹음할 준비 시간을 확보할 수 있도록 함
          setTimeout(async () => {
            if (!setResult) {
              console.error('setResult is undefined');
              return;
            }
            await receiveData(device, serviceUUID, characteristicUUID, setProcessing, setResult);
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
function setProcessing(arg0: boolean) {
  throw new Error('Function not implemented.');
}

