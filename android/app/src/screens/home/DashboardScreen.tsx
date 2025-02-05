import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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

  // ✅ 화면이 포커스될 때마다 실행
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
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // ✅ 태어난 날 포함하여 +1
  };

  // ✅ 텍스트 조건에 따라 다르게 표시
  let displayText;
  let isDefaultMessage = false;

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
      {/* 태어난지 N일 컨테이너 */}
      <View style={styles.roundedContainer}>
        <View style={styles.headerRow}>
          <Text 
            style={[
              styles.headerText, 
              isDefaultMessage && styles.defaultMessageText
            ]}
          >
            {displayText}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Image source={require('../img/setting.png')} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 🆕 아이 기록 섹션 */}
      <Text style={styles.recordTitle}>
        {babyName ? `${babyName}이 기록` : '우리 아기 기록'}
      </Text>

      {/* 🆕 보라색 컨테이너 (가로 스크롤 가능) */}
      <View style={styles.recordContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* 여기에 백엔드에서 불러온 데이터 출력 예정 */}
          <View style={styles.recordItem}>
            <Text style={styles.recordText}>데이터 1</Text>
          </View>
          <View style={styles.recordItem}>
            <Text style={styles.recordText}>데이터 2</Text>
          </View>
          <View style={styles.recordItem}>
            <Text style={styles.recordText}>데이터 3</Text>
          </View>
          {/* ✅ 백엔드 연동 시, .map() 사용하여 동적으로 데이터 출력 */}
        </ScrollView>
      </View>
    </View>
  );
};

export default DashboardScreen;
