import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userPwState } from '../../atom/login';
import styles from '../css/auth/Register/Register';
import axiosInstance from '../../api/axios'; // Axios 인스턴스 가져오기
import constants from '../auth/ConstantAuth';

type NameProps = {
  navigation: any;
};

const ChangePassword = ({ navigation }: NameProps) => {
  const [password, setPasswordState] = useRecoilState(userPwState); // 비밀번호 상태 관리
    console.log(password);
  const handlePrev = () => {
    navigation.goBack();
  };


  const handleChange = async () => {
    try {

    } catch (error) {
      console.error('회원가입 오류:', error);
      const errorMessage = error.response?.data?.message || '서버와의 통신 중 문제가 발생했습니다. 다시 시도해주세요.';

      Alert.alert('오류', errorMessage);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handlePrev} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerMini}>
        <View style={styles.content}>
          <Text style={styles.title}>사용자</Text>
          <Text style={styles.subtitle}>비밀번호 변경</Text>
          <Text style={styles.smallSubtitle}>현재 비밀번호를 입력해주세요 :)</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>비밀번호 입력</Text>
          <TextInput
            style={styles.inputField}
            placeholder="비밀번호를 입력해주세요"
            placeholderTextColor="#BDBDBD"
            value={''}
            onChangeText={''}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleChange}>
          <Text style={styles.continueButtonText}>걔속하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;
