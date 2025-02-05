import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { accessTokenState, refreshTokenState, userIdState, userPwState, loginState } from '../../../atom/login';
import { Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import axiosInstance from '../../../api/axios';

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
      console.log('🔥 회원 탈퇴 요청 시작');

      if (!accessToken) {
        throw new Error('Access token is missing');
      }

      const response = await axiosInstance.post('/config/deleteUser', {
        accessToken,
      });

      const data = response.data as { success: boolean; message?: string };

      if (!data.success) {
        throw new Error(data.message || '회원 탈퇴 실패');
      }

      console.log('🎉 회원 탈퇴 성공!');

      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');

      setUserId('');
      setUserPw('');
      setAccessToken(null);
      setRefreshToken(null);
      setLoginState(false);

      Alert.alert('회원 탈퇴 완료', '정상적으로 탈퇴되었습니다.');
      navigate('Login');
    } catch (error: any) {
      console.error('❌ 회원 탈퇴 오류:', error.response?.data || error.message);

      Alert.alert(
        '회원 탈퇴 실패',
        error.response?.data?.message || '서버와의 통신 중 문제가 발생했습니다.'
      );
    }
  };

  return handleDeleteAccount;
};
