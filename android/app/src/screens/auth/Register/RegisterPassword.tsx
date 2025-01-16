import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { passwordState } from '../../../atom/Register'; // passwordState 가져오기
import styles from '../../css/auth/Register/Register';
import constants from '../ConstantAuth';

type NameProps = {
  navigation: any;
};

const RegisterPassword = ({ navigation }: NameProps) => {
  const [password, setPassword] = useRecoilState(passwordState);

  const handlePrev = () => {
    navigation.goBack();
  };

  const validatePassword = (password: string): boolean => {
    if (!constants.PASSWORD.PATTERN.test(password)) {
      Alert.alert('오류', constants.PASSWORD.VALIDATION_MESSAGE);
      return false;
    }
    return true;
  };

  const handleValid = (): boolean => {
    if (!password) {
      Alert.alert('오류', '비밀번호를 입력해주세요.');
      return false;
    }

    if (!validatePassword(password)) {
      return false;
    }

    if (password.length < constants.PASSWORD.MIN_LENGTH || password.length > constants.PASSWORD.MAX_LENGTH) {
      Alert.alert('오류', `비밀번호는 ${constants.PASSWORD.MIN_LENGTH}~${constants.PASSWORD.MAX_LENGTH}자 사이여야 합니다.`);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!handleValid()) {
      return;
    }

    navigation.navigate('ConfirmPassword');
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handlePrev} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerMini}>
        <View style={styles.content}>
          <Text style={styles.title}>가입하기(3/4)</Text>
          <Text style={styles.subtitle}>비밀번호 입력</Text>
          <Text style={styles.smallSubtitle}>비밀번호를 입력해주세요 :)</Text>
        </View>

        {/* 비밀번호 입력 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>비밀번호 입력</Text>
          <TextInput
            style={styles.inputField}
            placeholder="비밀번호 8~20자"
            placeholderTextColor="#BDBDBD"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
          <Text style={styles.continueButtonText}>계속하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterPassword;
