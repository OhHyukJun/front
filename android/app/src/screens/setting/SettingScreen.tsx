import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import Slider from 'react-native-simple-slider';
import DatePicker from 'react-native-date-picker';
import styles from '../css/SettingScreen';
import { fetchSettingInfo } from './hook/fetchSettingInfo';
import { saveSettings } from './hook/saveSettings';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userImageState } from '../../atom/userImage';
import { userEmailState, userNameState } from '../../atom/userInfo';
import { fetchUserInfo } from '../auth/Login/FetchUserInfo';

const screenWidth = Dimensions.get('window').width;

type SettingScreenProps = {
  navigation: any;
};

const SettingScreen = ({ navigation }: SettingScreenProps) => {
  const [notification, setNotification] = useState('동의');
  const [childName, setChildName] = useState<string | null>(null);
  const [childBirthDate, setChildBirthDate] = useState<Date | null>(null);
  const [deleteMonths, setDeleteMonths] = useState(12);
  const [open, setOpen] = useState(false);
  const [, setLoading] = useState(true);
  const userImage = useRecoilValue(userImageState);
  const [userName, setuserName] = useRecoilState(userNameState);
  const [userEmail, setuserEmail] = useRecoilState(userEmailState);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const settingsData = await fetchSettingInfo();
  
        if (settingsData && typeof settingsData === 'object') {
          setNotification(settingsData.alarm ? '동의' : '비동의');
          setChildBirthDate(settingsData.babyBirth ? new Date(settingsData.babyBirth) : null);
          setChildName(settingsData.babyName || '');
          setDeleteMonths(settingsData.dataEliminateDuration ?? 12);
        } else {
          console.error('설정 데이터 형식이 올바르지 않습니다.', settingsData);
        }
      } catch (error) {
        console.error('설정 정보를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadSettings();
  }, []);
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserInfo();
        if (userData) {
          setuserName(userData.name || '사용자');
          setuserEmail(userData.email || '');
        }
      } catch (error) {
        console.error('사용자 정보를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadUserData();
  }, []);
  
  
  const handleSave = async () => {
    console.log('저장 버튼 클릭');

    const success = await saveSettings({
      alarm: notification === '동의',
      babyName: childName || '',
      babyBirth: childBirthDate ? childBirthDate.toISOString().split('T')[0] : '',
      dataEliminateDuration: deleteMonths,
    });

    if (success) {
      Alert.alert('저장 완료', '설정이 성공적으로 저장되었습니다.');
    } else {
      Alert.alert('저장 실패', '설정을 저장하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileDetails}>
          <Image source={userImage ? { uri: userImage } : require('../img/profile_placeholder.png')} style={styles.profileImage} />
          <Text style={styles.usernameText}>{userName || '사용자'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Text style={styles.accountManagementText}>계정관리</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.settingCard}>
        <View style={styles.row}>
          <Text style={styles.label}>알림 설정</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity style={styles.radioOption} onPress={() => setNotification('동의')}>
              <View style={[styles.radioOuterCircle, notification === '동의' && styles.radioOuterCircleSelected]}>
                {notification === '동의' && <View style={styles.radioInnerCircle} />}
              </View>
              <Text style={styles.radioText}>동의</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radioOption} onPress={() => setNotification('비동의')}>
              <View style={[styles.radioOuterCircle, notification === '비동의' && styles.radioOuterCircleSelected]}>
                {notification === '비동의' && <View style={styles.radioInnerCircle} />}
              </View>
              <Text style={styles.radioText}>비동의</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowHorizontal}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>아이 이름</Text>
            <TextInput
              style={styles.input}
              placeholder="이름"
              placeholderTextColor="#BBBBBB"
              value={childName || ''}
              onChangeText={setChildName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>아이 생년 월일</Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#BBBBBB"
                value={childBirthDate ? childBirthDate.toISOString().split('T')[0] : ''}
                editable={false} // 직접 입력 방지
              />
            </TouchableOpacity>
          </View>
        </View>

        <DatePicker
          modal
          open={open}
          date={childBirthDate || new Date()}
          mode="date"
          locale="ko"
          title="날짜 선택"
          confirmText="확인"
          cancelText="취소"
          onConfirm={(selectedDate) => {
            setOpen(false);
            setChildBirthDate(selectedDate);
          }}
          onCancel={() => setOpen(false)}
        />

        <View style={styles.row}>
          <Text style={styles.label}>데이터 삭제 기한</Text>
          <View style={styles.sliderRow}>
            <View style={styles.sliderContent}>
              <Slider
                value={deleteMonths}
                minimumValue={3}
                maximumValue={24}
                step={1}
                onValueChange={(value) => setDeleteMonths(value)}
                minimumTrackTintColor="#8C90D3"
                maximumTrackTintColor="#8C90D3"
                thumbButton={<Image source={require('../img/thumb_button.png')} style={{ resizeMode: 'contain' }} />}
                sliderHeight={8}
                sliderBorderRadius={4}
                sliderWidth={screenWidth * 0.65 - 10}
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabelLeft}>3</Text>
                <Text style={styles.sliderLabelRight}>24</Text>
              </View>
            </View>
            <Text style={styles.sliderValue}>{deleteMonths} 개월</Text>
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
