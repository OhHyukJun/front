import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ToastAndroid, Platform, Alert } from 'react-native';

const baseURL = 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 응답 데이터 처리
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          showToast('잘못된 요청입니다.');
          break;
        case 401:
          showToast('로그인이 필요합니다.');
          break;
        case 403:
          showToast('권한이 없습니다.');
          break;
        case 404:
          showToast('요청하신 페이지를 찾을 수 없습니다.');
          break;
        case 500:
          showToast('서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          break;
        default:
          showToast('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
          break;
      }
    }
    return Promise.reject(error);
  }
);

function showToast(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('알림', message);
  }
}

export default axiosInstance;
