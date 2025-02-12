import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../api/axios';

export interface DashboardInfoResponse {
  babyName: string | null;
  babyBirth: string | null;
}

/**
 * 대시보드 정보 가져오기 API
 * @returns {Promise<DashboardInfoResponse | null>} 아기 이름과 생년월일 반환
 */
export const fetchDashboardInfo = async (): Promise<DashboardInfoResponse | null> => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token is missing');
      }
  
      const response = await axiosInstance.get('/config/getSettingInfo', {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        withCredentials: true,
      });
  
      console.log('대시보드 정보 불러오기:', response.data);
  
      return response.data as DashboardInfoResponse;
    } catch (error) {
      console.log('대시보드 정보 불러오기 오류:', error);
      return null;
    }
  };
  
