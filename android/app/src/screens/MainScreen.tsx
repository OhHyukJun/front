import React from 'react';
import { View, Text, Button, Image, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './css/MainScreen';
import useBluetooth from './bluetooth/useBlutooth';

type MainScreenProps = {
  navigation: any;
};

const MainScreen = ({ navigation }: MainScreenProps) => {
  const { connectToDevice, connectedDevice } = useBluetooth();

  const handleBluetooth = () => {
    connectToDevice();
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
        <Text style={styles.connectionStatus}>
          {connectedDevice
            ? `Connected to ${connectedDevice.name}`
            : ''}
        </Text>
        <Image source={require('./img/chatbot.png')} style={styles.chatbot} />
      </View>
    </View>
  );
};

export default MainScreen;
