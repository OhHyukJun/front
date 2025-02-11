import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import styles from '../css/DashboardScreen';
import { fetchDashboardInfo } from './fetchDashboardInfo';
import { fetchBabyEmotion, getEmotionImage } from './fetchBabyEmotion';

type DashboardScreenProps = {
  navigation: any;
};

const emotionColors: { [key: number]: string } = {
  0: '#D2E0FB', // 아파요
  1: '#B1DFA0', // 일어났어요
  2: '#B8B6FF', // 볼 일 봤어요
  3: '#D9D9D9', // 안아줘요
  4: '#FFF79A', // 배고파요
  5: '#FFD3D3', // 졸려요
};

const emotionLabels: { [key: number]: string } = {
  0: '아파요',
  1: '일어났어요',
  2: '볼 일 봤어요',
  3: '안아줘요',
  4: '배고파요',
  5: '졸려요',
};

const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  const [babyName, setBabyName] = useState<string | null>(null);
  const [babyBirth, setBabyBirth] = useState<string | null>(null);
  const [babyEmotions, setBabyEmotions] = useState<any[]>([]);
  const [babyEmotionByTime, setBabyEmotionByTime] = useState<any[]>([]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const loadDashboardData = async () => {
    const data = await fetchDashboardInfo();
    if (data) {
      setBabyName(data.babyName);
      setBabyBirth(data.babyBirth);
    }

    const emotions = await fetchBabyEmotion();
    if (emotions.success) {
      setBabyEmotions(emotions.babyRecently.slice(0, 15)); // ✅ 이미 빈 배열이므로 `?.` 필요 없음
      setBabyEmotionByTime(emotions.babyEmotionOrderByTime);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadDashboardData();
    }, [])
  );


  const calculateDaysSinceBirth = (birthDate: string | null): number | null => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    const diffTime = today.getTime() - birth.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

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

  const currentHour = new Date().getHours();
  const displayedHours = Array.from({ length: 7 }, (_, i) => currentHour - 3 + i);

  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.headerText, isDefaultMessage && styles.defaultMessageText]}>
            {displayText}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <FastImage source={require('../img/setting.png')} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.recordTitle}>
        {babyName ? `${babyName}이 기록` : '우리 아기 기록'}
      </Text>
      <View style={styles.emotionContainer}>
        <FlatList
          data={babyEmotions.length > 0 ? babyEmotions : [{}]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item, index }) =>
            babyEmotions.length > 0 ? (
              <View style={styles.emotionWrapper}>
                <View style={styles.emotionItem}>
                  <Text style={styles.emotionDate}>{formatDate(item.babyEmotionTime)}</Text>
                  <FastImage source={getEmotionImage(item.babyEmotionNum)} style={styles.emotionImage} resizeMode={FastImage.resizeMode.contain} />
                  <Text style={styles.emotionText}>{['아파요', '일어났어요', '볼 일 봤어요', '안아줘요', '배고파요', '졸려요'][item.babyEmotionNum]}</Text>
                </View>
                {index !== babyEmotions.length - 1 && <View style={styles.separator} />}
              </View>
            ) : (
              <Text style={styles.noDataText}>감정 기록이 없습니다.</Text>
            )
          }
        />
      </View>

      {/* ✅ 수정된 시간별 감정 막대 그래프 */}
      <Text style={styles.chartTitle}>{babyName ? `이 시간에 우리 ${babyName}이는?` : '이 시간에 우리 아기는?'}</Text>
      <View style={styles.outerChartContainer}>
        <View style={styles.innerChartContainer}>
          {displayedHours.map((hour, index) => {
            const emotionData = babyEmotionByTime.find((item) => item.hour === hour);
            return (
              <View key={index} style={styles.chartBarContainer}>
                {emotionData ? (
                  <View style={[styles.chartBar, { height: emotionData.ratio * 100 + 10, backgroundColor: emotionColors[emotionData.maxEmotion] }]}>
                    <FastImage source={getEmotionImage(emotionData.maxEmotion)} style={styles.chartEmoji} />
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
        <View style={styles.chartHourContainer}>
          {displayedHours.map((hour, index) => (
            <Text key={index} style={styles.chartHour}>{`${hour}시`}</Text>
          ))}
        </View>
      </View>
      <View style={styles.emotionDescriptionContainer}>
        {Object.keys(emotionLabels).map((key) => (
          <View key={key} style={styles.emotionDescriptionItem}>
            <FastImage source={getEmotionImage(Number(key))} style={styles.emotionIcon} />
            <Text style={styles.emotionDescriptionText}>{emotionLabels[Number(key)]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DashboardScreen;
