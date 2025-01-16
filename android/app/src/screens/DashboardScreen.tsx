import React from 'react';
import { View, Text, Button, Image, ImageBackground } from 'react-native';
import styles from './css/DashboardScreen';

type DashboardScreenProps = {
  navigation: any; // React Navigation의 navigation 객체
};

const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>


      </View>
    </View>
  );
};

export default DashboardScreen;
