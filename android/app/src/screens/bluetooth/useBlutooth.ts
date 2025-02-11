import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import requestPermissions from './permissions';
import { connectToDevice, sendData, receiveData, disconnectDevice } from './bluetoothManager';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../atom/login';
import axiosInstance from '../../api/axios';
import Snackbar from 'react-native-snackbar';

const targetDeviceName = 'bigAivleAudio';
const targetDeviceId = '8C:BF:EA:0E:E1:41';
const serviceUUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const characteristicUUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

interface useBluetooth {
  connectedDevice: Device | null;
  connectToDevice: () => Promise<void>;
  disconnectToDevice: () => Promise<void>;
  isProcessing: boolean;
  result: string;
}

const useBluetooth = (): useBluetooth => {
  const managerRef = useRef(new BleManager());
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [isManuallyDisconnected, setIsManuallyDisconnected] = useState(false); // 수동 해제 상태 플래그
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const connectToDeviceWrapper = async () => {
    if (isManuallyDisconnected) {
      console.log('수동으로 해제된 상태에서 연결 시도 차단.');
      return;
    }

    const hasPermissions = await requestPermissions();
    if (!hasPermissions) {
      Alert.alert('Permission Denied', 'Bluetooth 권한이 필요합니다.');
      return;
    }

    await connectToDevice(
      managerRef.current,
      targetDeviceName,
      targetDeviceId,
      setConnectedDevice,
      async (device) => {
        await sendData(device, serviceUUID, characteristicUUID, setProcessing, setResult);
        console.log('setResult:', setResult);
      }
    );
  };

  const disconnectToDevice = async () => {
    setIsManuallyDisconnected(true); // 플래그 활성화
    await disconnectDevice(connectedDevice, setConnectedDevice);
    setTimeout(() => {
      setIsManuallyDisconnected(false); // 일정 시간 후 플래그 초기화
      console.log('수동 연결 해제 플래그 초기화됨.');
    }, 1000);
  };
  const postEmotion = async () => {
    if (result === null || result === undefined) {
      Snackbar.show({
        text: '감정 결과가 없습니다.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#616161', // 회색 (정보)
      });
      return;
    }
  
    try {
      await axiosInstance.post('/emotion/postEmotion', {
        accessToken,
        emotion: result,
      })
    } catch (error: any) {
      console.error('Error sending emotion data:', error);
      Snackbar.show({
        text: '감정 데이터 전송 실패',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#616161', // 회색 (오류)
      });
    }
  };
  useEffect(() => {
    if (result !== null) {
      postEmotion();
    }
  },[result]);

  return { connectedDevice, connectToDevice: connectToDeviceWrapper, disconnectToDevice, isProcessing, result };
};

export default useBluetooth;
