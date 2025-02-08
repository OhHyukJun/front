import React from 'react';
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
      console.error('Error during Bluetooth disconnection:', error.message || error);
    }
  };

  const handleBluetooth = async () => {
    try {
      console.log('Attempting to connect to Bluetooth device...');
      await connectToDevice(); // Bluetooth 연결 시도
    } catch (error: any) {
      console.error('Error during Bluetooth handling:', error.message || error);
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

      </View>
    </View>
  );
};

export default MainScreen;
