import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ToastAndroid, Platform, Alert } from 'react-native';

// const baseURL = 'http://172.21.122.160:3000/api';
const baseURL = 'https://ai-aivle-18-bigp-back-f4gud0d5hedhh8gj.koreacentral-01.azurewebsites.net/api';
// const baseURL = 'http://10.0.2.2:3000/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log('요청 데이터:', config);
    return config;
  },
  (error: AxiosError) => {
    console.log('요청 에러:', error.message);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('응답 데이터:', response.data);
    return response;
  },
  (error: AxiosError) => {
    console.log('응답 에러:', error.message);

    if (error.response?.config?.url?.includes('/config/getProfileImage') && error.response?.status === 400) {
      console.log('프로필 이미지가 존재하지 않음 (400), 경고창 표시 안함');
      return Promise.reject(error);
    }

    // 상세 에러 로그
    if (error.response) {
      console.log('응답 상태 코드:', error.response.status);
      console.log('응답 헤더:', error.response.headers);
      Alert.alert('오류', error.response?.data?.message || '알 수 없는 오류가 발생했습니다.');
    } else if (error.request) {
      console.log('요청 데이터:', error.request);
    } else {
      console.log('설정 중 에러:', error.message);
    }

    if (Platform.OS === 'android') {
      console.log('에러 발생: ' + error.message, ToastAndroid.LONG);
    } else {
      Alert.alert('에러 발생', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
