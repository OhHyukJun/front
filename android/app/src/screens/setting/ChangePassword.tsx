import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  userPwState,
  accessTokenState,
  refreshTokenState,
  userIdState,
} from '../../atom/login';
import styles from '../css/auth/Register/Register';
import axiosInstance from '../../api/axios';
import constants from '../auth/ConstantAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

type NameProps = {
  navigation: any;
};

const ChangePassword = ({navigation}: NameProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);
  const [password, setPasswordState] = useRecoilState(userPwState);
  const [newPassword, setNewPassword] = useState('');
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [, setRefreshToken] = useRecoilState(refreshTokenState);
  const userPwInputRef = useRef<TextInput>(null);
  const email = useRecoilValue(userIdState);

  const handlePrev = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setPasswordState('');
  },[]);

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
    console.log(email);
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
        setNewPassword(password);
        setPasswordState('');
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

  const handleNext = () => {
    if (!validateInputs()) return;
    if (password !== newPassword) {
      setIsCheckedTwo(true);
      setNewPassword('');
    }
    else {
      Alert.alert('비밀번호 오류', '기존 비밀번호와 일치하는 비밀번호 입니다.');
    }

  };

  const handleChange = async () => {
    if (password !== newPassword) {
      Alert.alert('인증 실패', '새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axiosInstance.post('/config/setPass', {
        accessToken,
        password,
      });

      if (response.status === 200) {
        Snackbar.show({
          text: '비밀번호 변경이 완료되었습니다.',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#616161',
        });
        setPasswordState('');
        navigation.goBack();
      } else {
        Alert.alert('인증 실패', constants.PASSWORD.CHECK_MESSAGE);
      }
    } catch (error) {
      Alert.alert('인증 실패', '서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
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
          <Text style={styles.subtitle}>
            {isChecked
              ? isCheckedTwo
                ? '새 비밀번호 확인'
                : '새 비밀번호 입력'
              : '현재 비밀번호 입력'}
          </Text>
          <Text style={styles.smallSubtitle}>
            {isChecked ? '새 비밀번호를 입력해주세요 :)' : '현재 비밀번호를 입력해주세요 :)'}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>비밀번호 입력</Text>
          <TextInput
            style={styles.inputField}
            placeholder="비밀번호를 입력해주세요"
            placeholderTextColor="#BDBDBD"
            value={isCheckedTwo ? newPassword : password}
            onChangeText={isCheckedTwo ? setNewPassword : setPasswordState}
            secureTextEntry
          />
        </View>

        {isChecked && (
          <Text style={styles.inputHelper}>
            {isCheckedTwo ? '새 비밀번호를 다시 입력해주세요.' : '변경할 새 비밀번호를 입력해주세요.'}
          </Text>
        )}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={isChecked ? (isCheckedTwo ? handleChange : handleNext) : handleConfirm}>
          <Text style={styles.continueButtonText}>{isCheckedTwo ? '완료' : '계속하기'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;
