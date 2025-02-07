import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../api/axios';

export interface SettingsData {
  alarm: boolean;
  babyName: string;
  babyBirth: string;
  dataEliminateDuration: number;
}

// 🔹 API 응답 타입 정의
interface SaveSettingsResponse {
  success: boolean;
}

/**
 * 사용자 설정 저장 API 요청
 * @param settingsData 설정 데이터 객체
 * @returns {Promise<boolean>} 성공 여부 반환
 */
export const saveSettings = async (settingsData: SettingsData): Promise<boolean> => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const requestData = {
      accessToken, // ✅ 액세스 토큰 포함
      ...settingsData,
    };

    console.log('🔹 전송할 설정 데이터:', requestData);

    // ✅ 수정된 부분: 헤더 추가
    const response = await axiosInstance.post<SaveSettingsResponse>(
      '/config/setSettingInfo',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',  // JSON 형식 명확히 설정
          Cookie: `accessToken=${accessToken}`, // 쿠키에 액세스 토큰 추가
        },
        withCredentials: true,  // ✅ 쿠키 인증 활성화
      }
    );

    console.log('🔹 API 응답 데이터:', response.data);

    return response.data.success; // 성공 여부 반환
  } catch (error: any) {
    console.error('❌ 설정 저장 오류:', error.response?.data || error.message);
    return false;
  }
};
