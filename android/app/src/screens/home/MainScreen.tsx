import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../css/MainScreen';
import useBluetooth from '../bluetooth/useBlutooth';
import { emotionTexts } from './emotionData';

type MainScreenProps = {
  navigation: any;
};

const MainScreen = ({ navigation }: MainScreenProps) => {
  // const { findDeviceAndSendData, disconnectDevice } = useBluetooth();
  const {  connectToDevice, disconnectToDevice, isProcessing, result } = useBluetooth();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isScanning, setIsScanning] = useState(false); 
  /* const handleBluetooth = async () => {
    try {
      await findDeviceAndSendData('r'); // Attempt to find, connect, and send data
    } catch (error) {
      console.error('Error during Bluetooth handling:', error.message || error);
    }
  };
  */
  const getEmotionMessage = (emotion: string | null) => {
    if (emotion && emotion in emotionTexts) {
      return emotionTexts[emotion];
    }
    return '아이를 클릭해\n녹음해주세요 :)';
  };
  

  const handleDisconnect = async () => {
    try {
      console.log('Attempting to disconnect Bluetooth device...');
      await disconnectToDevice(); // Bluetooth 연결 해제
    } catch (error: any) {
      console.log('Error during Bluetooth disconnection:', error.message || error);
    }
  };

  const handleBluetooth = async () => {
    if (isButtonDisabled || isScanning) return;
    try {
      console.log('Attempting to connect to Bluetooth device...');
      setIsButtonDisabled(true);
      setIsScanning(true);
      await connectToDevice(); // Bluetooth 연결 시도
    } catch (error: any) {
      console.log('Error during Bluetooth handling:', error.message || error);
    } finally {
      setTimeout(() => {
        setIsButtonDisabled(false); // 3초 후 버튼 활성화
      }, 3000);
      setIsScanning(false);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <ImageBackground source={require('../img/thought_balloon.png')} style={styles.balloon}>
        <Text style={styles.balloonText}>
            {isProcessing ? '응답을 생성 중입니다...' : getEmotionMessage(result)}
          </Text>
        </ImageBackground>
        <TouchableOpacity onPress={handleBluetooth}>
          <Image source={require('../img/baby_profile.png')} style={styles.baby} />
        </TouchableOpacity>
        {/* chatbot 이미지에 TouchableOpacity 추가 */}
        <TouchableOpacity
          style={styles.chatbot}
          onPress={() => navigation.navigate('Chatbot')} // Chatbot 페이지로 이동
        >
          <Image source={require('../img/chatbot.png')} style={styles.chatbot} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDisconnect}>
          <Text>해제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;
