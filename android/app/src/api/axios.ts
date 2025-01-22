import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ToastAndroid, Platform, Alert } from 'react-native';

// const baseURL = 'http://172.21.122.160:3000/api';
const baseURL = 'https://ai-aivle-bigp-18-swagger-bvdjenf2axdmhpdw.koreacentral-01.azurewebsites.net/api';
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
    console.error('요청 에러:', error.message);
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
    console.error('응답 에러:', error.message);

    // 상세 에러 로그
    if (error.response) {
      console.error('응답 상태 코드:', error.response.status);
      console.error('응답 헤더:', error.response.headers);
      console.error('응답 데이터:', error.response.data);
    } else if (error.request) {
      console.error('요청 데이터:', error.request);
    } else {
      console.error('설정 중 에러:', error.message);
    }

    if (Platform.OS === 'android') {
      ToastAndroid.show('에러 발생: ' + error.message, ToastAndroid.LONG);
    } else {
      Alert.alert('에러 발생', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
