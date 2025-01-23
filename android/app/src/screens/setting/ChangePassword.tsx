import React, {useState, useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  userPwState,
  accessTokenState,
  refreshTokenState,
  userIdState,
} from '../../atom/login';
import styles from '../css/auth/Register/Register';
import axiosInstance from '../../api/axios'; // Axios 인스턴스 가져오기
import constants from '../auth/ConstantAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NameProps = {
  navigation: any;
};

const ChangePassword = ({navigation}: NameProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPasswordState] = useRecoilState(userPwState); // 비밀번호 상태 관리
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [, setRefreshToken] = useRecoilState(refreshTokenState);
  const userPwInputRef = useRef<TextInput>(null);
  const email = useRecoilValue(userIdState);

  const handlePrev = () => {
    navigation.goBack();
  };

  const validateInputs = (): boolean => {
    if (!password) {
      Alert.alert('인증 실패', constants.PASSWORD.REQUIRED_MESSAGE);
      userPwInputRef.current?.focus();
      return false;
    }
    if (
      password.length < constants.PASSWORD.MIN_LENGTH ||
      password.length > constants.PASSWORD.MAX_LENGTH
    ) {
      Alert.alert('인증 실패', constants.PASSWORD.LENGTH_MESSAGE);
      userPwInputRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleConfirm = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axiosInstance.post<{
        accessToken: string;
        refreshToken: string;
      }>('/auth/login', {email, password});

      if (response.status === 200) {
        setIsChecked(prev => !prev);
        const {accessToken, refreshToken} = response.data;

        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
      } else {
        Alert.alert('인증 실패', constants.PASSWORD.CHECK_MESSAGE);
      }
    } catch (error) {
      console.error('인증 오류:', error);
      Alert.alert(
        '인증 실패',
        '서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.',
      );
    }
  };

  const handleChange = async () => {
    try {
      const response = await axiosInstance.post('/config/setPass', {
        accessToken,
        password,
      });
      if (response.status === 200) {
        Alert.alert('인증 완료', '비밀번호 변경이 완료되었습니다.');
      } else {
        Alert.alert('인증 실패', constants.PASSWORD.CHECK_MESSAGE);
      }
    } catch (error) {
      console.error('인증 오류:', error);
      Alert.alert(
        '인증 실패',
        '서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.',
      );
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
          <Text style={styles.title}>사용자</Text>
          {isChecked ? (
            <Text style={styles.subtitle}>새 비밀번호 입력</Text>
          ) : (
            <Text style={styles.subtitle}>비밀번호 확인</Text>
          )}
          {isChecked ? (
            <Text style={styles.smallSubtitle}>
              현재 비밀번호를 입력해주세요 :)
            </Text>
          ) : (
            <Text style={styles.smallSubtitle}>
              새 비밀번호를 입력해주세요 :)
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>비밀번호 입력</Text>
          <TextInput
            style={styles.inputField}
            placeholder="비밀번호를 입력해주세요"
            placeholderTextColor="#BDBDBD"
            value={password}
            onChangeText={setPasswordState}
            secureTextEntry
          />
        </View>
        {isChecked && (
          <Text style={styles.inputHelper}>비밀번호가 일치합니다.</Text>
        )}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={isChecked ? handleConfirm : handleChange}>
          <Text style={styles.continueButtonText}>계속하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;
