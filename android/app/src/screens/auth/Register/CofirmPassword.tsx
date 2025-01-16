import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRecoilValue } from 'recoil';
import { emailState, nameState, passwordState } from '../../../atom/Register';
import styles from '../../css/auth/Register/Register';
import axiosInstance from '../../../api/axios'; // Axios 인스턴스 가져오기
import constants from '../ConstantAuth';

type NameProps = {
  navigation: any;
};

const ConfirmPassword = ({ navigation }: NameProps) => {
  const username = useRecoilValue(nameState); // 이메일 가져오기
  const email = useRecoilValue(emailState); // 이름 가져오기
  const password = useRecoilValue(passwordState); // 비밀번호 가져오기
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePrev = () => {
    navigation.goBack();
  };

  const handleValid = (): boolean => {
    if (!confirmPassword) {
      Alert.alert('오류', '비밀번호를 다시 입력해주세요.');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('오류', constants.PASSWORD.CHECK_MESSAGE);
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!handleValid()) {
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/register', {
        username,
        email,
        password,
        method:0,
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('성공', '회원가입이 완료되었습니다!');
        navigation.navigate('Login');
      } else {
        Alert.alert('오류', '회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      Alert.alert('오류', '서버와의 통신 중 문제가 발생했습니다. 다시 시도해주세요.');
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
          <Text style={styles.title}>가입하기(4/4)</Text>
          <Text style={styles.subtitle}>비밀번호 확인</Text>
          <Text style={styles.smallSubtitle}>입력한 비밀번호를 다시 입력해주세요 :)</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>비밀번호 확인</Text>
          <TextInput
            style={styles.inputField}
            placeholder="비밀번호를 다시 입력해주세요"
            placeholderTextColor="#BDBDBD"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleRegister}>
          <Text style={styles.continueButtonText}>가입 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmPassword;
