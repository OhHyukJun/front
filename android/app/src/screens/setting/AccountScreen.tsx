import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity,Alert  } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useRecoilState,useRecoilValue } from 'recoil';
import styles from '../css/AccountScreen';
import { useLogout } from '../auth/Login/Logout';
import LogoutModal from './LogoutModal';
import { useDeleteAccount } from '../auth/Login/DeleteAccount';
import DeleteAccountModal from './DeleteAccountModal';
import { userImageState } from '../../atom/userImage';
import { userNameState,userEmailState } from '../../atom/userInfo';
import ImageUploadModal from './ImageUploadModal';
import { accessTokenState } from '../../atom/login';
import axiosInstance from '../../api/axios';
import RNFS from 'react-native-fs';
import base64 from 'react-native-base64';
import { useFetchProfileImage } from '../home/fetchProfileImage';

type AccountScreenProps = {
  navigation: any;
};
const AccountScreen = ({ navigation }: AccountScreenProps) => {
  const handleChange = () => {
    navigation.navigate('ChangePassword');
  };

  const handleLogout = useLogout(navigation.navigate);
  const handleDeleteAccount = useDeleteAccount(navigation.navigate);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [userName, setuserName] = useRecoilState(userNameState);
  const [userEmail, setuserEmail] = useRecoilState(userEmailState);
  // const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useRecoilState(userImageState);
  const accessToken = useRecoilValue(accessTokenState);
  const fetchProfileImage = useFetchProfileImage();
  const uploadProfileImage = async (imageUri: string, accessToken: string) => {
    if (!accessToken) {
      console.error('Access Token이 없습니다. 업로드를 중단합니다.');
      Alert.alert('로그인이 필요합니다.');
      return;
    }

    try {
      console.log(`이미지 업로드 시작: ${imageUri}`);

      const base64Image = await RNFS.readFile(
        imageUri.replace('file://', ''),
        'base64'
      );

      const requestBody = {
        accessToken: accessToken,
        profileImage: base64Image,
      };

      const response = await axiosInstance.post('/config/setProfileImage', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200){
        console.log('프로필 이미지 업로드 성공:', response.status, '성공');
      }
      // Alert.alert('프로필 이미지가 업데이트되었습니다.');
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
      Alert.alert('프로필 이미지 업데이트에 실패했습니다.');
    }
  };


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
      async response => {
        if (response.didCancel) {
          console.log('사용자가 이미지 선택을 취소했습니다.');
        } else if (response.errorMessage) {
          console.error('이미지 선택 오류:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImageUri = response.assets[0].uri || '';
  
          // 모달을 즉시 닫기
          setIsImageModalVisible(false);
  
          // 이미지 업로드 수행
          await uploadProfileImage(selectedImageUri, accessToken);
          setProfileImage(selectedImageUri);
        }
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
      async response => {
        if (response.didCancel) {
          console.log('사용자가 카메라 촬영을 취소했습니다.');
        } else if (response.errorMessage) {
          console.error('카메라 오류:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const capturedImageUri = response.assets[0].uri || '';

          // 모달을 즉시 닫기
          setIsImageModalVisible(false);

          // 이미지 업로드 수행
          await uploadProfileImage(capturedImageUri, accessToken);
          setProfileImage(capturedImageUri);
        }
      }
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileDetails}>
          <Image
             source={profileImage ? { uri: profileImage } : require('../img/profile_placeholder.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.profileChangeButton} onPress={() => setIsImageModalVisible(true)}>
            <Image
              source={require('../img/profile_change.png')}
              style={styles.profileChangeIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{userName || '사용자'}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoContainer}>
        <Text style={styles.containerTitle}>개인 정보</Text>
        <Text style={styles.containerSubtitle}>
          서비스에서 사용하는 내 계정 정보를 확인할 수 있습니다.
        </Text>
        <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>이메일</Text>
              <Text style={styles.infoValue}>{userEmail || '이메일 없음'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>이름</Text>
              <Text style={styles.infoValue}>{userName || '이름 없음'}</Text>
            </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.containerTitle}>계정 관리</Text>
        <Text style={styles.containerSubtitle}>
          서비스에서 사용하는 내 계정 정보를 관리할 수 있습니다.
        </Text>
        <TouchableOpacity style={styles.actionRow} onPress={handleChange}>
          <Text style={styles.actionLabel}>비밀번호 변경</Text>
          <Image
            source={require('../img/right_arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionRow} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.actionLabel}>로그아웃</Text>
          <Image source={require('../img/right_arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionRow} onPress={() => setIsDeleteModalVisible(true)}>
          <Text style={styles.actionLabel}>회원 탈퇴</Text>
          <Image source={require('../img/right_arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      <LogoutModal
        isVisible={isModalVisible}
        onConfirm={() => {
          setIsModalVisible(false);
          handleLogout();
        }}
        onCancel={() => setIsModalVisible(false)}
      />

      <DeleteAccountModal
        isVisible={isDeleteModalVisible}
        onConfirm={() => {
          setIsDeleteModalVisible(false);
          handleDeleteAccount();
        }}
        onCancel={() => setIsDeleteModalVisible(false)}
      />
      <ImageUploadModal 
        isVisible={isImageModalVisible} 
        onGallery={pickImageFromLibrary}
        onCamera={captureImageWithCamera}
        onCancel={() => setIsImageModalVisible(false)}
      />

    </View>
  );
};

export default AccountScreen;
