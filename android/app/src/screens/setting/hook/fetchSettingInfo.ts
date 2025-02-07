import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../api/axios';

// ✅ 백엔드에서 받을 데이터의 타입을 정의
export interface SettingInfoResponse {
  alarm: boolean;
  babyName: string; // ✅ 기존 유지
  babyBirth: string; // ✅ 기존 유지
  dataEliminateDuration: number;
}

export const fetchSettingInfo = async (): Promise<SettingInfoResponse | null> => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    // ✅ 응답 타입을 명확히 지정하여 'unknown' 오류 해결
    const response = await axiosInstance.get<SettingInfoResponse>('/config/getSettingInfo', {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      withCredentials: true,
    });

    console.log('✅ 기존 설정 불러오기:', response.data);

    return {
      alarm: response.data.alarm,
      babyName: response.data.babyName, // ✅ 기존 코드 유지
      babyBirth: response.data.babyBirth, // ✅ 기존 코드 유지
      dataEliminateDuration: response.data.dataEliminateDuration ?? 12, // ✅ 기본값 유지
    };
  } catch (error) {
    console.error('❌ 설정 불러오기 오류:', error);
    return null;
  }
};
