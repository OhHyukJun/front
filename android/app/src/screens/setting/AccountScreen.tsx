import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity,Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import styles from '../css/AccountScreen';
import { useLogout } from '../auth/Login/Logout';
import LogoutModal from './LogoutModal';
import { useDeleteAccount } from '../auth/Login/DeleteAccount';
import DeleteAccountModal from './DeleteAccountModal';
import { fetchUserInfo } from '../auth/Login/FetchUserInfo';

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

  const [userInfo, setUserInfo] = useState<{ email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('사용자 정보를 불러오는 중 오류 발생:', error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  const handleImageUpload = () => {
    Alert.alert(
      '프로필 사진 변경',
      '이미지를 선택하는 방법을 선택하세요.',
      [
        {
          text: '갤러리에서 선택',
          onPress: () => pickImageFromLibrary(),
        },
        {
          text: '카메라로 촬영',
          onPress: () => captureImageWithCamera(),
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ]
    );
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
      }
    );
  };

  const captureImageWithCamera = async () => {
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
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <View style={styles.profileDetails}>
          <Image
             source={profileImage ? { uri: profileImage } : require('../img/profile_placeholder.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.profileChangeButton} onPress={handleImageUpload}>
            <Image
              source={require('../img/profile_change.png')}
              style={styles.profileChangeIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{userInfo?.name || '사용자'}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* 개인정보 컨테이너 */}
      <View style={styles.infoContainer}>
        <Text style={styles.containerTitle}>개인 정보</Text>
        <Text style={styles.containerSubtitle}>
          서비스에서 사용하는 내 계정 정보를 확인할 수 있습니다.
        </Text>
        <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>이메일</Text>
              <Text style={styles.infoValue}>{userInfo?.email || '이메일 없음'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>이름</Text>
              <Text style={styles.infoValue}>{userInfo?.name || '이름 없음'}</Text>
            </View>
      </View>

      {/* 계정 관리 컨테이너 */}
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

    </View>
  );
};

export default AccountScreen;
