import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import Slider from 'react-native-simple-slider';
import DatePicker from 'react-native-date-picker';
import styles from '../css/SettingScreen';
import { fetchSettingInfo } from './hook/fetchSettingInfo';
import { saveSettings } from './hook/saveSettings';
import { useRecoilValue } from 'recoil';
import { userImageState } from '../../atom/userImage';
import { userNameState } from '../../atom/userInfo';

const screenWidth = Dimensions.get('window').width;

type SettingScreenProps = {
  navigation: any;
};

const SettingScreen = ({ navigation }: SettingScreenProps) => {
  const [notification, setNotification] = useState('동의'); // 알림 설정 상태
  const [childName, setChildName] = useState<string | null>(null); // ✅ 기본값 null
  const [childBirthDate, setChildBirthDate] = useState<Date | null>(null); // ✅ 기본값 null
  const [deleteMonths, setDeleteMonths] = useState(12); // ✅ 기본값 12개월
  const [open, setOpen] = useState(false); // Date Picker 모달 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const userImage = useRecoilValue(userImageState);
  const userName = useRecoilValue(userNameState);

  // ✅ 설정 정보 불러오기
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const data = await fetchSettingInfo();
      if (data) {
        setNotification(data.alarm ? '동의' : '비동의'); // ✅ true면 '동의', false면 '비동의'
        setChildName(data.babyName || null); // ✅ 빈 문자열이면 null
        setChildBirthDate(data.babyBirth ? new Date(data.babyBirth) : null); // ✅ 빈 문자열이면 null
        setDeleteMonths(data.dataEliminateDuration ?? 12); // ✅ 기본값 12개월
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    console.log('✅ 저장 버튼 클릭됨');
    
    const success = await saveSettings({
      alarm: notification === '동의', // ✅ "동의" → true, "비동의" → false 변환
      babyName: childName || '', // ✅ 기본값이 null이면 빈 문자열로 저장
      babyBirth: childBirthDate ? childBirthDate.toISOString().split('T')[0] : '', // ✅ 기본값이 null이면 빈 문자열로 저장
      dataEliminateDuration: deleteMonths, // ✅ 필드명 일치
    });
  
    if (success) {
      Alert.alert('저장 완료', '설정이 성공적으로 저장되었습니다.');
    } else {
      Alert.alert('저장 실패', '설정을 저장하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <View style={styles.profileDetails}>
          <Image source={userImage ? { uri: userImage } : require('../img/profile_placeholder.png')} style={styles.profileImage} />
          <Text style={styles.usernameText}>{userName || '사용자'}</Text>
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

        {/* 아이 이름과 생년월일 */}
        <View style={styles.rowHorizontal}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>아이 이름</Text>
            <TextInput
              style={styles.input}
              placeholder="이름"
              placeholderTextColor="#BBBBBB"
              value={childName || ''} // ✅ 기본값 null이면 빈 문자열
              onChangeText={setChildName}
            />
          </View>

          {/* 📌 생년월일 입력 */}
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

        {/* 날짜 선택기 */}
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

        {/* 데이터 삭제 기한 */}
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
                sliderWidth={screenWidth * 0.65 - 10} // ✅ 해결된 부분
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
