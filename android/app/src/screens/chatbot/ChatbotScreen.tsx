import React from 'react';
import { View, Text, Button, Image, ImageBackground,TouchableOpacity } from 'react-native';
import styles from '../css/ChatbotScreen';

type ChatbotScreenProps = {
  navigation: any; // React Navigation의 navigation 객체
};

const ChatbotScreen = ({ navigation }: ChatbotScreenProps) => {
  const handlePrev = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <TouchableOpacity onPress={handlePrev}>
          <Text>뒤로</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default ChatbotScreen;
