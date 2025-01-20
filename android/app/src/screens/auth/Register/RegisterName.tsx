import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { nameState } from '../../../atom/Register';
import styles from '../../css/auth/Register/Register';

type NameProps = {
  navigation: any;
};

const RegisterName = ({ navigation }: NameProps) => {
  const [name, setName] = useRecoilState(nameState);

  const handlePrev = () => {
    navigation.goBack();
  };

  const handleValid = (): boolean => {
    if (!name) {
      Alert.alert('오류', '이름을 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!handleValid()) {
      return;
    }

    navigation.navigate('Password');
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
          <Text style={styles.title}>가입하기(2/4)</Text>
          <Text style={styles.subtitle}>이름 입력</Text>
          <Text style={styles.smallSubtitle}>이름을 입력해주세요:)</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>이름 입력</Text>
          <TextInput
            style={styles.inputField}
            placeholder="홍길동"
            placeholderTextColor="#BDBDBD"
            value={name}
            onChangeText={setName}
          />
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
          <Text style={styles.continueButtonText}>계속하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterName;
