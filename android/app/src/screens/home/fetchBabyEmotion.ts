import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../api/axios';

// 감정 기록 타입 정의
export interface BabyEmotionData {
  babyEmotionNum: number; // 감정 번호 (1~6)
  babyEmotionTime: string; // 감정 기록 시간 (YYYY-MM-DD HH:mm:ss)
}

export interface BabyEmotionByTimeData {
  hour: number;
  maxEmotion: number;
  ratio: number;
}

// ✅ API 응답 타입 정의
interface BabyEmotionResponse {
  success: boolean;
  babyRecently?: BabyEmotionData[]; // ✅ 최신 15개 감정 데이터
  babyEmotionOrderByTime?: BabyEmotionByTimeData[]; // ✅ 시간별 감정 데이터
}

export const fetchBabyEmotion = async (): Promise<BabyEmotionResponse | null> => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('❌ Access Token이 없습니다.');
      return null;
    }

    console.log('✅ 저장된 Access Token:', accessToken);

    // ✅ `Cookie` 인증 방식 사용
    const response = await axiosInstance.get<BabyEmotionResponse>('/dashboard/getBabyEmotionInfo', {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      withCredentials: true,
    });

    console.log('✅ 감정 기록 불러오기 성공:', response.data);

    return response.data; 
  } catch (error: any) {
    console.error('❌ 감정 기록 불러오기 오류:', error.response?.data || error.message);
    return null;
  }
};

// ✅ 감정 번호에 따른 .gif 이미지 반환
export const getEmotionImage = (babyEmotionNum: number): any => {
  const emotionImages: { [key: number]: any } = {
    0: require('../img/pain.gif'),
    1: require('../img/awake.gif'),
    2: require('../img/diaper.gif'),
    3: require('../img/hug.gif'),
    4: require('../img/hungry.gif'),
    5: require('../img/sleepy.gif'),
  };
  return emotionImages[babyEmotionNum] || require('../img/pain.gif');
};

