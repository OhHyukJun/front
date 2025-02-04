import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';
import { userIdState, userPwState, accessTokenState, refreshTokenState, loginState } from '../../../atom/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../css/auth/Login/LoginScreen';
import axiosInstance from '../../../api/axios';
import constants from '../ConstantAuth';
import { adminState } from '../../../atom/admin';
import { ADMIN_EMAIL } from '@env';

type RootParamList = {
  MainScreen: undefined;
  RegisterScreen: undefined;
  Info: undefined;
  IdFind: undefined;
  PasswordFind: undefined;
  Home: undefined;
};

const LoginScreen = () => {
  const [email, setUserId] = useRecoilState(userIdState);
  const [password, setUserPw] = useRecoilState(userPwState);
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [, setRefreshToken] = useRecoilState(refreshTokenState);
  const [, setLoginState] = useRecoilState(loginState);
  const [admin, setAdmin] = useRecoilState(adminState);
  const userIdInputRef = useRef<TextInput>(null);
  const userPwInputRef = useRef<TextInput>(null);

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then((token) => {
      if (token) {
        setLoginState(true);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      }
    });
  }, [navigation]);

  const validateInputs = (): boolean => {
    const emailRegex = constants.EMAIL.PATTERN;
    if (!email) {
      Alert.alert('로그인 실패', constants.EMAIL.EMPTY_MESSAGE);
      userIdInputRef.current?.focus();
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('로그인 실패', constants.EMAIL.CHECK_MESSAGE);
      userIdInputRef.current?.focus();
      return false;
    }
    if (!password) {
      Alert.alert('로그인 실패', constants.PASSWORD.REQUIRED_MESSAGE);
      userPwInputRef.current?.focus();
      return false;
    }
    if (password.length < constants.PASSWORD.MIN_LENGTH || password.length > constants.PASSWORD.MAX_LENGTH) {
      Alert.alert('로그인 실패', constants.PASSWORD.LENGTH_MESSAGE);
      userPwInputRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axiosInstance.post<{ accessToken: string; refreshToken: string }>('/auth/login', { email, password });
      await AsyncStorage.setItem('email', email);

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        const isAdmin = email === ADMIN_EMAIL;

        await AsyncStorage.setItem('accessToken', accessToken);
        setAccessToken(accessToken);

        if (!isAdmin) {
          await AsyncStorage.setItem('refreshToken', refreshToken);
          setRefreshToken(refreshToken);
        }

        setAdmin(isAdmin);
        setLoginState(true);

        console.log('Admin:', isAdmin);
        console.log('Access Token:', accessToken);

        // 상태 업데이트 후 네비게이션 수행
        setTimeout(() => {
          Alert.alert('로그인 성공', constants.SUCCESS.Login);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          );
        }, 100);
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
          placeholder={constants.EMAIL.REQUIRED_MESSAGE}
          placeholderTextColor="#292929"
          value={email}
          onChangeText={setUserId}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={userPwInputRef}
          style={styles.inputPwField}
          placeholder={constants.PASSWORD.LENGTH_MESSAGE}
          placeholderTextColor="#292929"
          secureTextEntry
          maxLength={constants.PASSWORD.MAX_LENGTH}
          value={password}
          onChangeText={setUserPw}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

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
        <TouchableOpacity onPress={() => navigation.navigate('Info')}>
          <Text style={styles.footerText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText} onPress={() => navigation.navigate('IdFind')}>아이디 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText} onPress={() => navigation.navigate('PasswordFind')}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
