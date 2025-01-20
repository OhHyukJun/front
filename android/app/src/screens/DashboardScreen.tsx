import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './css/DashboardScreen';

type DashboardScreenProps = {
  navigation: any; // React Navigation의 navigation 객체
};

const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <View style={styles.headerRow}>
          {/* 텍스트는 왼쪽에 고정 */}
          <Text style={styles.headerText}>@@이, 태어난지 777일</Text>
          {/* 설정 이미지를 오른쪽 끝에 배치 */}
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Image source={require('./img/setting.png')} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DashboardScreen;
