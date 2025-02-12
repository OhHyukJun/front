import React, { useState,useEffect } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../css/MainScreen';
import useBluetooth from '../bluetooth/useBlutooth';
import { emotionTexts } from './emotionData';
import { accessTokenState } from '../../atom/login';
import axiosInstance from '../../api/axios';
import { userImageState } from '../../atom/userImage';

type MainScreenProps = {
  navigation: any;
};

const MainScreen = ({ navigation }: MainScreenProps) => {
  // const { findDeviceAndSendData, disconnectDevice } = useBluetooth();
  const {  connectToDevice, disconnectToDevice, isProcessing, result } = useBluetooth();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const accessToken = useRecoilValue(accessTokenState);
  const [profileImage, setProfileImage] = useRecoilState(userImageState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/config/getProfileImage', {
          headers: {
            Cookie: `accessToken=${accessToken}`,
          },
          withCredentials: true,
        });

        if (response.data?.profileImage) {
          setProfileImage(response.data.profileImage); // 서버에서 받은 이미지 URL 설정
        }
      } catch (error) {
        console.error('프로필 이미지 불러오기 실패:', error);
        setProfileImage('');
      }
    };

    fetchProfileImage();
  }, []);

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
        <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../img/baby_profile.png') // 기본 이미지
            }
            style={styles.baby}
          />

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
