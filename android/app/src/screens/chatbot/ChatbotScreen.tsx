import React from 'react';
import { View, Text, Button, Image, ImageBackground } from 'react-native';
import styles from '../css/ChatbotScreen';

type ChatbotScreenProps = {
  navigation: any; // React Navigation의 navigation 객체
};

const ChatbotScreen = ({ navigation }: ChatbotScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>


      </View>
    </View>
  );
};

export default ChatbotScreen;
