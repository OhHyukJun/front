import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import requestPermissions from './permissions';
import { connectToDevice, sendData, receiveData, disconnectDevice } from './bluetoothManager';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../atom/login';
import axiosInstance from '../../api/axios';
import Snackbar from 'react-native-snackbar';
import { debounce } from 'lodash';
import { fetchBabyEmotion } from '../home/fetchBabyEmotion';

const SIMULATION_MODE = true; // false로 바꾸면 블루투스 통신 기능 사용 가능

const targetDeviceName = 'bigAivleAudio';
const targetDeviceId = '8C:BF:EA:0E:E1:42';
const serviceUUID = '4b9131c3-c9c5-cc8f-9e45-b51f01c2af4f';
const characteristicUUID = 'a8261b36-07ea-f5b7-8846-e1363e48b5be';

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
  const [isManuallyDisconnected, setIsManuallyDisconnected] = useState(false);
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [accessToken] = useRecoilState(accessTokenState);
  const prevResult = useRef<string | null>(null);

  const simulateBluetoothProcess = () => {
    console.log('시뮬레이션 모드 활성화! 블루투스 연결 없이 가짜 데이터 흐름을 흉내냅니다.');

    setTimeout(() => {
      setProcessing(true);
      console.log('가짜 데이터 수신 중...');

      setTimeout(() => {
        const fakeEmotions = ['0', '1', '2', '3', '4', '5'];
        const randomEmotion = fakeEmotions[Math.floor(Math.random() * fakeEmotions.length)];
        console.log(`가짜 데이터 수신 완료: ${randomEmotion}`);

        setResult(randomEmotion);
        setProcessing(false);
      }, 3000);
    }, 2000);
  };

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

    if (SIMULATION_MODE) {
      simulateBluetoothProcess();
      return;
    }

    await connectToDevice(
      managerRef.current,
      targetDeviceName,
      targetDeviceId,
      setConnectedDevice,
      async (device) => {
        await sendData(device, serviceUUID, characteristicUUID, setProcessing, setResult);
      }
    );
  };

  const disconnectToDevice = async () => {
    setIsManuallyDisconnected(true);
    if (SIMULATION_MODE) {
      console.log('[시뮬레이션] Bluetooth 연결 해제됨.');
      setConnectedDevice(null);
      return;
    }
    await disconnectDevice(connectedDevice, setConnectedDevice);
    setTimeout(() => {
      setIsManuallyDisconnected(false);
      console.log('수동 연결 해제 플래그 초기화됨.');
    }, 1000);
  };

  const postEmotion = async (emotion: string) => {
    if (!emotion || prevResult.current === emotion) {
      console.log('중복 데이터 감지: 전송 안 함', emotion);
      return;
    }

    try {
      console.log(`감정 데이터 전송: ${emotion}`);
      const response = await axiosInstance.post('/emotion/postEmotion', { accessToken, emotion });
      if (response.status === 200){
        await fetchBabyEmotion();
      }
      prevResult.current = emotion;
      
    } catch (error: any) {
      console.error('Error sending emotion data:', error);
      Snackbar.show({
        text: '감정 데이터 전송 실패',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#616161',
      });
    }
  };

  const debouncedPostEmotion = debounce(postEmotion, 500);

  useEffect(() => {
    if (result !== '' && prevResult.current !== result) {
      debouncedPostEmotion(result);
    }
  }, [result]);

  return { connectedDevice, connectToDevice: connectToDeviceWrapper, disconnectToDevice, isProcessing, result };
};

export default useBluetooth;
