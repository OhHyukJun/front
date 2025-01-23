import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import styles from '../css/SettingScreen';

type SettingScreenProps = {
  navigation: any;
};

const SettingScreen = ({ navigation }: SettingScreenProps) => {
  // 상태 관리
  const [notification, setNotification] = useState('동의'); // 알림 설정 상태
  const [childName, setChildName] = useState(''); // 아이 이름 상태
  const [childBirthDate, setChildBirthDate] = useState(''); // 아이 생년월일 상태

  // 저장 버튼 클릭 시 동작
  const handleSave = () => {
    Alert.alert(
      '저장 완료',
      `알림 설정: ${notification}\n아이 이름: ${childName}\n아이 생년월일: ${childBirthDate}`,
    );
    // 여기에서 서버로 데이터를 전송하거나 추가 로직 작성 가능
  };

  return (
    <View style={styles.container}>
      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <Image source={require('../img/profile_placeholder.png')} style={styles.profileImage} />
        <Text style={styles.usernameText}>사용자</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Text style={styles.accountManagementText}>계정관리</Text>
        </TouchableOpacity>
      </View>

      {/* 설정 카드 */}
      <View style={styles.settingCard}>
        {/* 알림 설정 */}
        <View style={styles.row}>
          <Text style={styles.label}>알림 설정</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setNotification('동의')}
            >
              <View
                style={[
                  styles.radioCircle,
                  notification === '동의' && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioText}>동의</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setNotification('비동의')}
            >
              <View
                style={[
                  styles.radioCircle,
                  notification === '비동의' && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioText}>비동의</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 아이 이름 입력 */}
        <View style={styles.row}>
          <Text style={styles.label}>아이 이름</Text>
          <TextInput
            style={styles.input}
            placeholder="이름"
            placeholderTextColor="#BBBBBB"
            value={childName}
            onChangeText={setChildName}
          />
        </View>

        {/* 아이 생년월일 입력 */}
        <View style={styles.row}>
          <Text style={styles.label}>아이 생년 월일</Text>
          <TextInput
            style={styles.input}
            placeholder="20xx.xx.xx"
            placeholderTextColor="#BBBBBB"
            value={childBirthDate}
            onChangeText={setChildBirthDate}
          />
        </View>
      </View>

      {/* 저장 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;
