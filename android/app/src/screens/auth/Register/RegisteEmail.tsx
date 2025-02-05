import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { emailState } from '../../../atom/Register';
import axiosInstance from '../../../api/axios';
import styles from '../../css/auth/Register/Register';
import constants from '../ConstantAuth';


type NameProps = {
  navigation: any;
};

const RegisterEmail = ({ navigation }: NameProps) => {
  const [email, setEmail] = useRecoilState(emailState);
  const [verificationCode, setVerificationCode] = useState('');
  const [inputVerificationCode, setInputVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handlePrev = () => {
    navigation.goBack();
  };

  const handleValid = (): boolean => {
    const emailRegex = constants.EMAIL.PATTERN;

    if (!email) {
      Alert.alert('오류', '이메일을 입력해주세요.');
      return false;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('오류', '올바른 이메일 형식을 입력해주세요.');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!isEmailVerified) {
      Alert.alert('이메일 인증 필요', '이메일 인증을 완료해주세요.');
      return;
    }
    if (!handleValid()) {
      return;
    }

    navigation.navigate('Name');
  };

  const handleSendVerificationCode = async () => {
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
      const response = await axiosInstance.post('/auth/sendVerificationCode', { email });
      if (response.status === 200) {
        const data = response.data as { code: string };
        setVerificationCode(data.code);
        Alert.alert('성공', '인증 코드가 이메일로 발송되었습니다.');
      } else {
        Alert.alert('오류', '인증 코드 발송에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '서버와의 연결이 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleVerifyCode = () => {
    if (String(inputVerificationCode) === String(verificationCode)) {
      setIsEmailVerified(true);
    } else {
      Alert.alert('오류', '인증 코드가 올바르지 않습니다.');
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
          <Text style={styles.title}>가입하기(1/4)</Text>
          <Text style={styles.subtitle}>이메일 설정</Text>
          <Text style={styles.smallSubtitle}>가입하실 이메일을 입력해주세요:)</Text>
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
          {!isEmailVerified && (
            <TouchableOpacity onPress={handleSendVerificationCode}>
              <Text style={styles.verificationButton}>인증 코드 보내기</Text>
            </TouchableOpacity>
          )}
        </View>

        {!isEmailVerified && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>인증 코드 입력</Text>
            <TextInput
              style={styles.inputField}
              placeholder="인증 코드를 입력해주세요"
              placeholderTextColor="#BDBDBD"
              value={inputVerificationCode}
              onChangeText={setInputVerificationCode}
            />
            <TouchableOpacity onPress={handleVerifyCode}>
              <Text style={styles.verificationButton}>인증 코드 확인</Text>
            </TouchableOpacity>
          </View>
        )}

        {isEmailVerified && <Text style={styles.inputHelper}>이메일 인증이 완료되었습니다.</Text>}
        <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
          <Text style={styles.continueButtonText}>계속하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterEmail;
