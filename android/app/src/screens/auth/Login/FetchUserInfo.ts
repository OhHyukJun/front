import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../api/axios';
// 🔹 응답 데이터 인터페이스
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

    // 🔹 제네릭을 사용해 자동으로 타입을 지정
    const response = await axiosInstance.get<UserInfoResponse>('/config/getPersonalInfo', {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    console.log('🔹 API 응답 데이터:', response.data); // ✅ 응답 데이터 확인

    return {
      email: response.data.email ?? '이메일 없음',  // 🔹 기본값 설정
      name: response.data.name ?? '이름 없음',      // 🔹 기본값 설정
    };
  } catch (error: any) {
    console.error('❌ 사용자 정보 불러오기 오류:', error.response?.data || error.message);
    throw error;
  }
};
