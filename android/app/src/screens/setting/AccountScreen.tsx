import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../css/AccountScreenn';

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <View style={styles.profileDetails}>
          <Image
            source={require('./img/profile_placeholder.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.profileChangeButton}>
            <Image
              source={require('./img/profile_change.png')}
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
          <Text style={styles.infoValue}>aaa123@gmail.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <Text style={styles.infoValue}>김나박이</Text>
        </View>
      </View>

      {/* 계정 관리 컨테이너 */}
      <View style={styles.infoContainer}>
        <Text style={styles.containerTitle}>계정 관리</Text>
        <Text style={styles.containerSubtitle}>
          서비스에서 사용하는 내 계정 정보를 관리할 수 있습니다.
        </Text>
        <TouchableOpacity style={styles.actionRow}>
          <Text style={styles.actionLabel}>비밀번호 변경</Text>
          <Image
            source={require('./img/right_arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionRow}>
          <Text style={styles.actionLabel}>로그아웃</Text>
          <Image
            source={require('./img/right_arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionRow}>
          <Text style={styles.actionLabel}>회원 탈퇴</Text>
          <Image
            source={require('./img/right_arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;
