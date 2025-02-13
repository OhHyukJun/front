import { useState } from 'react';
import { Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useRecoilState } from 'recoil';
import { userImageState } from '../../atom/userImage';

const useImageUpload = () => {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useRecoilState(userImageState);

  const requestCameraPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      console.log('카메라 권한 허용됨.');
      return true;
    } else {
      Alert.alert('카메라 권한이 필요합니다.');
      return false;
    }
  };

  const pickImageFromLibrary = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          console.log('사용자가 이미지 선택을 취소했습니다.');
        } else if (response.errorMessage) {
          console.error('이미지 선택 오류:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri || null);
        }
        setIsImageModalVisible(false);
      }
    );
  };

  const captureImageWithCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('사용자가 카메라 촬영을 취소했습니다.');
        } else if (response.errorMessage) {
          console.error('카메라 오류:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri || null);
        }
        setIsImageModalVisible(false);
      }
    );
  };

  return {
    profileImage,
    isImageModalVisible,
    setIsImageModalVisible,
    pickImageFromLibrary,
    captureImageWithCamera,
  };
};

export default useImageUpload;
