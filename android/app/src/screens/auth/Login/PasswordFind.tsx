import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRecoilState,useRecoilValue } from 'recoil';
import { emailState } from '../../../atom/Register';
import { accessTokenState } from '../../../atom/login';
import styles from '../../css/auth/Register/Register';
import constants from '../ConstantAuth';
import axiosInstance from '../../../api/axios';
import Cookies from 'js-cookie';

type NameProps = {
  navigation: any;
};

const PasswordFind = ({ navigation }: NameProps) => {
  const [email, setEmail] = useRecoilState(emailState);
  const [message, setMessage] = useState(''); // 메시지 상태 추가
  const accessToken = useRecoilValue(accessTokenState);

  const handlePrev = () => {
    navigation.goBack();
  };

  const handleFind = async () => {
    const emailRegex = constants.EMAIL.PATTERN;

    if (!email) {
      setMessage('이메일을 입력해주세요.');
      return;
    }

    if (!emailRegex.test(email)) {
      setMessage('이메일 형식으로 입력해주세요.');
      return;
    }

    if (!accessToken) {
      setMessage('유효하지 않은 토큰입니다.');
      return;
    }

    try {
      Cookies.set('accessToken', accessToken, { path: '/' });

      const response = await axiosInstance.get('/auth/findPass', {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        withCredentials: true,
      });

      const data = response.data as { message?: string; success: boolean };
      setMessage(data.message || '임시 비밀번호가 이메일로 전송되었습니다.');
    } catch (error: any) {
      console.error('비밀번호 찾기 오류:', error);

      const errorMessage =
        error.response?.data?.message || '서버와의 연결이 실패했습니다. 다시 시도해주세요.';
      setMessage('');
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
          <Text style={styles.subtitle}>가입된 이메일을 확인해주세요</Text>
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

export default PasswordFind;
