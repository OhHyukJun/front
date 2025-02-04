import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker'; // ✅ DatePicker 추가
import Slider from 'react-native-simple-slider';
import styles from '../css/SettingScreen';

const screenWidth = Dimensions.get('window').width;

type SettingScreenProps = {
  navigation: any;
};

const SettingScreen = ({ navigation }: SettingScreenProps) => {
  const [notification, setNotification] = useState('동의'); // 알림 설정 상태
  const [childName, setChildName] = useState(''); // 아이 이름 상태
  const [deleteMonths, setDeleteMonths] = useState(12); // 데이터 삭제 기한 (개월 단위)

  // ✅ DatePicker 관련 상태 추가
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const thumbButtonSize = 20;
  const sliderWidth = screenWidth * 0.65;
  const sliderPadding = thumbButtonSize / 2;

  const handleSave = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <View style={styles.profileDetails}>
          <Image source={require('../img/profile_placeholder.png')} style={styles.profileImage} />
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
            <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
              <Text style={styles.input}>{selectedDate.toISOString().split('T')[0]}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={isDatePickerVisible}
              date={selectedDate}
              mode="date"
              locale="ko"
              onConfirm={(date) => {
                setIsDatePickerVisible(false);
                setSelectedDate(date);
              }}
              onCancel={() => setIsDatePickerVisible(false)}
            />
          </View>
        </View>

        {/* 데이터 삭제 기한 */}
        <View style={styles.row}>
          <Text style={styles.label}>데이터 삭제 기한</Text>
          <View style={styles.sliderRow}>
            <View style={styles.sliderContent}>
              <Slider
                value={deleteMonths}
                minimumValue={3} // 최소값 3개월
                maximumValue={24} // 최대값 24개월
                step={1}
                onValueChange={(value) => setDeleteMonths(value)} // 슬라이더 값 변경
                minimumTrackTintColor="#8C90D3"
                maximumTrackTintColor="#8C90D3"
                thumbButton={(
                  <Image
                    source={require('../img/thumb_button.png')} // 버튼으로 사용할 이미지
                    style={{
                      resizeMode: 'contain', // 이미지 비율 유지
                    }}
                  />
                )}
                sliderHeight={8}
                sliderBorderRadius={4}
                sliderWidth={sliderWidth - (thumbButtonSize) / 2}
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
