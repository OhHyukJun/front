import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
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
  const handlePrev = () => {
    navigation.goBack();
  };
  const handleLogout = useLogout(navigation.navigate);
  const handleDeleteAccount = useDeleteAccount(navigation.navigate);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [userInfo, setUserInfo] = useState<{ email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <View style={styles.container}>
      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <View style={styles.profileDetails}>
          <Image
            source={require('../img/profile_placeholder.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.profileChangeButton}>
            <Image
              source={require('../img/profile_change.png')}
              style={styles.profileChangeIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>사용자</Text>
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
