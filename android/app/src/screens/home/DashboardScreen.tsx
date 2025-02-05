import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // ✅ 추가
import styles from '../css/DashboardScreen';
import { fetchDashboardInfo } from './fetchDashboardInfo';

type DashboardScreenProps = {
  navigation: any;
};

const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  const [babyName, setBabyName] = useState<string | null>(null);
  const [babyBirth, setBabyBirth] = useState<string | null>(null);
  
  // ✅ 최신 데이터 가져오는 함수
  const loadDashboardData = async () => {
    const data = await fetchDashboardInfo();
    if (data) {
      setBabyName(data.babyName);
      setBabyBirth(data.babyBirth);
    }
  };

  // ✅ 화면이 포커스될 때마다(뒤로 가거나, 다시 돌아왔을 때) 실행
  useFocusEffect(
    React.useCallback(() => {
      loadDashboardData();
    }, [])
  );

  // ✅ 생년월일을 기준으로 며칠 지났는지 계산하는 함수
  const calculateDaysSinceBirth = (birthDate: string | null): number | null => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    const diffTime = today.getTime() - birth.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // 밀리초 → 일 변환 후 +1
  };

  // ✅ 텍스트 조건에 따라 다르게 표시
  let displayText;
  let isDefaultMessage = false; // 기본 메시지 여부 체크

  if (!babyName && !babyBirth) {
    displayText = '아이 이름과 생년월일을 입력해주세요';
    isDefaultMessage = true;
  } else if (!babyName) {
    displayText = '아이이름을 입력해주세요';
    isDefaultMessage = true;
  } else if (!babyBirth) {
    displayText = '생년월일을 입력해주세요';
    isDefaultMessage = true;
  } else {
    const daysOld = calculateDaysSinceBirth(babyBirth);
    displayText = `${babyName}이, 태어난지 ${daysOld}일`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <View style={styles.headerRow}>
          <Text 
            style={[
              styles.headerText, 
              isDefaultMessage && styles.defaultMessageText // ✅ 기본 메시지 스타일 적용
            ]}
          >
            {displayText}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Image source={require('../img/setting.png')} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DashboardScreen;
