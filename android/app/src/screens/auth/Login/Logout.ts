import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState,useRecoilValue } from 'recoil';
import { accessTokenState, refreshTokenState, userIdState, userPwState, loginState } from '../../../atom/login';
import { Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import axiosInstance from '../../../api/axios';

type RootParamList = {
  LoginScreen: undefined;
};

export const useLogout = (navigate: NavigationProp<RootParamList>['navigate']) => {
  const [, setUserId] = useRecoilState(userIdState);
  const [, setUserPw] = useRecoilState(userPwState);
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [, setRefreshToken] = useRecoilState(refreshTokenState);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/config/logout');

      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');

      setUserId('');
      setUserPw('');
      setAccessToken('');
      setRefreshToken('');

      Alert.alert('로그아웃 성공', '성공적으로 로그아웃되었습니다.');
      navigate('LoginScreen');
    } catch (error) {
      console.error('로그아웃 오류:', error);
      Alert.alert('로그아웃 실패', '로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return handleLogout;
};
