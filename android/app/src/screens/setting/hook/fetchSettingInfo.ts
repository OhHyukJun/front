import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../api/axios';

export interface SettingInfoResponse {
  alarm: boolean;
  babyName: string;
  babyBirth: string;
  dataEliminateDuration: number;
}

export const fetchSettingInfo = async (): Promise<SettingInfoResponse | null> => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const response = await axiosInstance.get<SettingInfoResponse>('/config/getSettingInfo', {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      withCredentials: true,
    });

    console.log('기존 설정 불러오기:', response.data);

    return {
      alarm: response.data.alarm,
      babyName: response.data.babyName,
      babyBirth: response.data.babyBirth,
      dataEliminateDuration: response.data.dataEliminateDuration ?? 12,
    };
  } catch (error) {
    console.error('설정 불러오기 오류:', error);
    return null;
  }
};
