import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './css/SettingScreen';

type SettingScreenProps = {
  navigation: any;
};

const SettingScreen = ({ navigation }: SettingScreenProps) => {
  const [notification, setNotification] = useState('동의'); // 알림 설정 상태
  const [childName, setChildName] = useState(''); // 아이 이름 상태
  const [childBirthDate, setChildBirthDate] = useState(''); // 아이 생년월일 상태
  const [deleteDays, setDeleteDays] = useState(12); // 데이터 삭제 기한 상태

  const handleSave = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <View style={styles.profileDetails}>
          <Image source={require('./img/profile_placeholder.png')} style={styles.profileImage} />
          <Text style={styles.usernameText}>사용자</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Text style={styles.accountManagementText}>계정관리</Text>
        </TouchableOpacity>
      </View>

      {/* 구분선 */}
      <View style={styles.divider} />

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
                  styles.radioOuterCircle,
                  notification === '동의' && styles.radioOuterCircleSelected,
                ]}
              >
                {notification === '동의' && <View style={styles.radioInnerCircle} />}
              </View>
              <Text style={styles.radioText}>동의</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setNotification('비동의')}
            >
              <View
                style={[
                  styles.radioOuterCircle,
                  notification === '비동의' && styles.radioOuterCircleSelected,
                ]}
              >
                {notification === '비동의' && <View style={styles.radioInnerCircle} />}
              </View>
              <Text style={styles.radioText}>비동의</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 아이 이름과 생년월일 */}
        <View style={styles.rowHorizontal}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>아이 이름</Text>
            <TextInput
              style={styles.input}
              placeholder="이름"
              placeholderTextColor="#BBBBBB"
              value={childName}
              onChangeText={setChildName}
            />
          </View>
          <View style={styles.inputContainer}>
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

        {/* 데이터 삭제 기한 */}
        <View style={styles.row}>
          <Text style={styles.label}>데이터 삭제 기한</Text>
          <View style={styles.sliderWrapper}>
            <View style={styles.sliderDummy} />
            <View
              style={[
                styles.sliderReal,
                { width: `${(deleteDays / 60) * 100}%` }, // 활성화된 슬라이더 바의 너비 계산
              ]}
            />
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={60}
              step={1}
              value={deleteDays}
              onValueChange={(value) => setDeleteDays(value)}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor="#6D73C6"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelLeft}>0</Text>
              <Text style={styles.sliderLabelRight}>60</Text>
            </View>
            <Text style={styles.sliderValue}>{deleteDays} 일</Text>
          </View>
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
