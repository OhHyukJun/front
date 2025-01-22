import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './css/MainScreen';
import useBluetooth from './bluetooth/useBlutooth';

type MainScreenProps = {
  navigation: any;
};

const MainScreen = ({ navigation }: MainScreenProps) => {
  // const { findDeviceAndSendData, disconnectDevice } = useBluetooth();
  const { connectToDevice } = useBluetooth();

  /* const handleBluetooth = async () => {
    try {
      await findDeviceAndSendData('r'); // Attempt to find, connect, and send data
    } catch (error) {
      console.error('Error during Bluetooth handling:', error.message || error);
    }
  };

    const handleDisconnect = async () => {
    try {
      await disconnectDevice(); // Bluetooth 연결 해제
    } catch (error) {
      console.error('Error during Bluetooth disconnection:', error.message || error);
    }
  };
  */
  const handleBluetooth = async () => {
    try {
      await connectToDevice(); // Attempt to find, connect, and send data
    } catch (error: any) {
      console.error('Error during Bluetooth handling:', error.message || error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <ImageBackground source={require('./img/thought_balloon.png')} style={styles.balloon}>
          <Text style={styles.balloonText}>
            아이를 클릭해{'\n'}녹음해주세요 :)
          </Text>
        </ImageBackground>
        <TouchableOpacity onPress={handleBluetooth}>
          <Image source={require('./img/baby_profile.jpg')} style={styles.baby} />
        </TouchableOpacity>
        {/* chatbot 이미지에 TouchableOpacity 추가 */}
        <TouchableOpacity
          style={styles.chatbot}
          onPress={() => navigation.navigate('Chatbot')} // Chatbot 페이지로 이동
        >
          <Image source={require('./img/chatbot.png')} style={styles.chatbot} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;
