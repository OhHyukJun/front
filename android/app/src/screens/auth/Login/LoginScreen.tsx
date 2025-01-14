import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { userIdState, userPwState } from '../../../atom/login';
import styles from '../../css/auth/Login/LoginScreen';
import axiosInstance from '../../../api/axios';
import constants from '../ConstantAuth';

type RootParamList = {
  MainScreen: undefined;
  RegisterScreen: undefined;
};

const LoginScreen = () => {
  const [userId, setUserId] = useRecoilState(userIdState);
  const [userPw, setUserPw] = useRecoilState(userPwState);
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  const userIdInputRef = useRef<TextInput>(null);
  const userPwInputRef = useRef<TextInput>(null);

  // 유효성 검사 함수
  const validateInputs = (): boolean => {
    if (!userId) {
      Alert.alert('로그인 실패', constants.USERNAME.REQUIRED_MESSAGE);
      userIdInputRef.current?.focus();
      return false;
    }
    if (userId.length < constants.USERNAME.MIN_LENGTH || userId.length > constants.USERNAME.MAX_LENGTH) {
      Alert.alert('로그인 실패', constants.USERNAME.LENGTH_MESSAGE);
      userIdInputRef.current?.focus();
      return false;
    }
    if (!userPw) {
      Alert.alert('로그인 실패', constants.PASSWORD.REQUIRED_MESSAGE);
      userPwInputRef.current?.focus();
      return false;
    }
    if (userPw.length < constants.PASSWORD.MIN_LENGTH || userPw.length > constants.PASSWORD.MAX_LENGTH) {
      Alert.alert('로그인 실패', constants.PASSWORD.LENGTH_MESSAGE);
      userPwInputRef.current?.focus();
      return false;
    }
    return true;
  };

  // 로그인 처리
  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axiosInstance.post('/auth/login', { userId, userPw });

      if (response.status === 200) {
        Alert.alert('로그인 성공', constants.SUCCESS.Login);
        navigation.navigate('MainScreen');
      } else {
        Alert.alert('로그인 실패', constants.FAIL.Login);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      Alert.alert('로그인 실패', '서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  // SNS 로그인 처리
  const handleKaKaoLogin = async () => {
    Alert.alert('카카오 로그인', '카카오 로그인 로직을 추가하세요.');
  };

  const handleNaverLogin = async () => {
    Alert.alert('네이버 로그인', '네이버 로그인 로직을 추가하세요.');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../img/logo.png')} style={styles.titleImg} />
      <Text style={styles.title}>나비잠</Text>

      <View style={styles.inputContainer}>
        <TextInput
          ref={userIdInputRef}
          style={styles.inputField}
          placeholder="아이디 입력"
          placeholderTextColor="#292929"
          value={userId}
          onChangeText={setUserId}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={userPwInputRef}
          style={styles.inputPwField}
          placeholder="비밀번호 8~40자"
          placeholderTextColor="#292929"
          secureTextEntry
          maxLength={constants.PASSWORD.MAX_LENGTH}
          value={userPw}
          onChangeText={setUserPw}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.rememberContainer}>
        <Text style={styles.rememberText}>로그인 상태 유지</Text>
      </View>

      <View style={styles.divider} />
      <Text style={styles.snsText}>SNS 간편 로그인</Text>

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.socialContainer} onPress={handleKaKaoLogin}>
          <Image source={require('../../img/kakao.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialContainer} onPress={handleNaverLogin}>
          <Image source={require('../../img/naver.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText} onPress={() => navigation.navigate('Info')}>회원가입</Text>
        <Text style={styles.footerText}>아이디 찾기</Text>
        <Text style={styles.footerText}>비밀번호 찾기</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
