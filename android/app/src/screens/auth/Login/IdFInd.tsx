import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { emailState } from '../../../atom/Register';
import styles from '../../css/auth/Register/Register';
import constants from '../ConstantAuth';
import axiosInstance from '../../../api/axios';

type NameProps = {
  navigation: any;
};

const IdFind = ({ navigation }: NameProps) => {
  const [email, setEmail] = useRecoilState(emailState);
  const [message, setMessage] = useState(''); // 메시지 상태 추가

  const handlePrev = () => {
    navigation.goBack();
  };

  const handleFind = async () => {
    const emailRegex = constants.EMAIL.PATTERN;

    if (!email) {
      Alert.alert('오류', '이메일을 입력해주세요.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('오류', '올바른 이메일 형식을 입력해주세요.');
      return;
    }

    try {
      const response = await axiosInstance.get(`/auth/findEmail?email=${email}`);
      const data = response.data;

      if (data.success) {
        setMessage('일치하는 아이디입니다.');
      } else {
        setMessage('아이디를 찾을 수 없습니다.');
      }
    } catch (error: any) {
      console.error('아이디 찾기 오류:', error);

      const errorMessage =
        error.response?.data?.message || '서버와의 연결이 실패했습니다. 다시 시도해주세요.';
      setMessage(''); // 에러가 발생하면 메시지를 초기화
      Alert.alert('오류', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handlePrev} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerMini}>
        <View style={styles.content}>
          <Text style={styles.title}>아이디 찾기</Text>
          <Text style={styles.subtitle}>이메일 확인하기</Text>
          <Text style={styles.smallSubtitle}>가입하신 이메일을 입력해주세요</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>이메일 입력</Text>
          <TextInput
            style={styles.inputField}
            placeholder="abcd@google.com"
            placeholderTextColor="#BDBDBD"
            value={email}
            onChangeText={setEmail}
          />
          {/* 메시지 출력 */}
          {message ? <Text style={styles.messageText}>{message}</Text> : null}
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleFind}>
          <Text style={styles.continueButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IdFind;
