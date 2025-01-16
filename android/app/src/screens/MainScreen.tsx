import React from 'react';
import { View, Text, Button, Image, ImageBackground } from 'react-native';
import styles from './css/MainScreen';

type MainScreenProps = {
  navigation: any; // React Navigation의 navigation 객체
};

const MainScreen = ({ navigation }: MainScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <ImageBackground source={require('./img/thought_balloon.png')} style={styles.balloon}>
          <Text style={styles.balloonText}>
            아이를 클릭해{'\n'}녹음해주세요 :)
          </Text>
        </ImageBackground>
        <Image source={require('./img/baby_profile.jpg')} style={styles.baby} />
        <Image source={require('./img/chatbot.png')} style={styles.chatbot} />
      </View>
    </View>
  );
};

export default MainScreen;
