import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { accessTokenState, refreshTokenState, userIdState, userPwState, loginState } from '../../../atom/login';
import { Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import axiosInstance from '../../../api/axios';

const RNRestart = require('react-native-restart').default;

type RootParamList = {
  Login: undefined;
};

export const useDeleteAccount = (navigate: NavigationProp<RootParamList>['navigate']) => {
  const [, setUserId] = useRecoilState(userIdState);
  const [, setUserPw] = useRecoilState(userPwState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [, setRefreshToken] = useRecoilState(refreshTokenState);
  const [, setLoginState] = useRecoilState(loginState);

  const handleDeleteAccount = async () => {
    try {
      // 1️⃣ accessToken 확인
      console.log('회원 탈퇴 요청 Access Token:', accessToken);

      if (!accessToken) {
        throw new Error('Access token is missing');
      }

      // 2️⃣ 서버에 탈퇴 요청 보내기
      const response = await axiosInstance.post('/config/deleteUser', {
        accessToken, // 요청 본문에 accessToken 포함
      });

      console.log('회원 탈퇴 응답:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || '회원 탈퇴 실패');
      }

      // 3️⃣ AsyncStorage에서 저장된 유저 데이터 삭제
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');

      // 4️⃣ Recoil 상태 초기화
      setUserId('');
      setUserPw('');
      setAccessToken(null);
      setRefreshToken(null);
      setLoginState(false);

      Alert.alert('회원 탈퇴 완료', '정상적으로 탈퇴되었습니다.');
      RNRestart.restart();
    } catch (error: any) {
      console.error('회원 탈퇴 오류:', error.response?.data || error.message);

      Alert.alert(
        '회원 탈퇴 실패',
        error.response?.data?.message || '서버와의 통신 중 문제가 발생했습니다.'
      );
    }
  };

  return handleDeleteAccount;
};
