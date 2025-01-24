import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState,useRecoilValue } from 'recoil';
import { accessTokenState, refreshTokenState, userIdState, userPwState, loginState } from '../../../atom/login';
import { Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import axiosInstance from '../../../api/axios';
type RootParamList = {
  Login: undefined;
};

export const useLogout = (navigate: NavigationProp<RootParamList>['navigate']) => {
  const [, setUserId] = useRecoilState(userIdState);
  const [, setUserPw] = useRecoilState(userPwState);
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [, setRefreshToken] = useRecoilState(refreshTokenState);
  const [, setLoginState] = useRecoilState(loginState);

  const handleLogout = async () => {
    try {
      // AsyncStorage에서 accessToken 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Access Token:', accessToken);

      if (!accessToken) {
        throw new Error('Access token is missing');
      }

      // 서버에 로그아웃 요청
      const response = await axiosInstance.post('/config/logout', {
        accessToken, // 요청 본문에 전달
      });

      console.log('로그아웃 응답:', response.data);

      // AsyncStorage에서 토큰 삭제
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');

      // Recoil 상태 초기화
      setUserId('');
      setUserPw('');
      setAccessToken(null);
      setRefreshToken(null);
      setLoginState(false);

      Alert.alert('로그아웃 성공', '성공적으로 로그아웃되었습니다.');
      navigate('Login');
    } catch (error: any) {
      console.error('로그아웃 오류:', error.response?.data || error.message);

      Alert.alert(
        '로그아웃 실패',
        error.response?.data?.message || '서버와의 통신 중 문제가 발생했습니다.'
      );
    }
  };

  return handleLogout;
};