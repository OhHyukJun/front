import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../api/axios';

export interface UserInfoResponse {
  name: string;
  email: string;
}

export const fetchUserInfo = async (): Promise<UserInfoResponse> => {

  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const response = await axiosInstance.get<UserInfoResponse>('/config/getPersonalInfo', {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    console.log('API 응답 데이터:', response.data);

    return {
      email: response.data.email ?? '이메일 없음',
      name: response.data.name ?? '이름 없음',
    };
  } catch (error: any) {
    console.error('사용자 정보 불러오기 오류:', error.response?.data || error.message);
    throw error;
  }
};
