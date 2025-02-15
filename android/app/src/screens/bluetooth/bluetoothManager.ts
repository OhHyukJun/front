import { Alert } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import saveToFile from './fileHandler';
import Snackbar from 'react-native-snackbar';

export const connectToDevice = async (
  manager: BleManager,
  targetDeviceName: string,
  targetDeviceId: string,
  setConnectedDevice: (device: Device | null) => void,
  sendData: (device: Device) => Promise<void>
): Promise<void> => {
  console.log('Starting Bluetooth connection process...');
  manager.startDeviceScan(null, null, async (error, device) => {
    Snackbar.show({
      text: '블루투스 스캔 중 입니다. 잠시만 기다려주세요.',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#616161', // 회색 (정보)
    });
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
        Snackbar.show({
          text:  `${deviceConnection.name}에 연결되었습니다.`,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#616161', // 회색 (정보)
        });
        await sendData(deviceConnection);
      } catch (err) {
        Alert.alert('Connection Failed', '장치 연결에 실패했습니다. 다시 시도해주세요.');
      }
    }
  });

  setTimeout(() => {
    manager.stopDeviceScan();
    console.log('Scanning stopped due to timeout.');
  }, 5000);
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
      Snackbar.show({
        text: 'Bluetooth 연결이 해제되었습니다.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#616161', // 초록색 (성공)
      });
      // Alert.alert('Disconnected', 'Bluetooth 연결이 해제되었습니다.');
    } catch (error: any) {
      Snackbar.show({
        text: 'Bluetooth 연결 해제 실패',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#616161', // 회색 (정보)
      });
      console.log('Bluetooth 연결 해제 중 오류 발생:', error);
    }
  } else {
    console.log('연결된 장치가 없습니다.');
    Snackbar.show({
      text: '현재 연결된 장치가 없습니다.',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#616161', // 회색 (정보)
    });
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
          console.log('Error while monitoring:', error);
          return;
        }

        if (characteristic?.value) {
          try {
            console.log(characteristic?.value);
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
                console.log('setResult is undefined! 사용 전에 확인이 필요합니다.');
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
            console.log('데이터 변환 오류:', decodeError);
          }
        }
      }
    );
  } catch (err:any) {
    Snackbar.show({
      text: err.message || '데이터 수신 중 오류가 발생했습니다.',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#616161',
    });
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
          setProcessing(true);

          // 데이터 전송 후 즉시 receiveData 호출 receiveDat를 호출해서 데이터 수신 준비를 마친 뒤 r 을 전송해야했다..
          await receiveData(device, serviceUUID, characteristicUUID, setProcessing, setResult);
          const encodedData = Buffer.from('r', 'utf-8').toString('base64');
          await device.writeCharacteristicWithResponseForService(serviceUUID, characteristicUUID, encodedData); // 전송 시 UUID를 함꼐 보내줘야 아두이노에서 인식
          console.log('r 전송 완료');
          return;
        }
      }
    }
    Snackbar.show({
      text: '전송 가능한 BLE 특성이 없습니다.',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#616161',
    });

  } catch (err: any) {
    Snackbar.show({
      text: `데이터 전송 실패: ${err.message || '알 수 없는 오류'}`,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#616161',
    });
  }
};

function setProcessing(arg0: boolean) {
  throw new Error('Function not implemented.');
}