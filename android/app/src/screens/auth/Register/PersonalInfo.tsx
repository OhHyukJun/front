import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../css/auth/Register/PersonalInfo';
import TERMS from '../Terms';

type PersonalInfoProps = {
  navigation: any;
};

const PersonalInfo = ({ navigation }: PersonalInfoProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedOne, setIsCheckedOne] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);

  useEffect(() => {
    // 모든 개별 체크박스가 true인 경우만 "모두 동의"를 true로 설정
    if (isCheckedOne && isCheckedTwo) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    }, [isCheckedOne, isCheckedTwo]);

  const handleCheck = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    setIsCheckedOne(newChecked);
    setIsCheckedTwo(newChecked);
  };

  const isButtonEnabled = isCheckedOne && isCheckedTwo;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>약관 동의서</Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.title}>나비잠에 오신 것을 환영합니다.</Text>
      <Text style={styles.subtitle}>약관에 동의 후 이용이 가능합니다.</Text>

      <TouchableOpacity style={styles.descriptionContainer} onPress={handleCheck}>
        <Image
          source={
            isChecked
              ? require('../../img/checkbox_on.png')
              : require('../../img/checkbox_off.png')
          }
          style={styles.checkIcon}
        />
        <Text style={styles.description}>모두 동의하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.descriptionContainer}
        onPress={() => setIsCheckedOne((prev) => !prev)}
      >
        <Image
          source={
            isCheckedOne
              ? require('../../img/checkbox_on.png')
              : require('../../img/checkbox_off.png')
          }
          style={styles.checkIcon}
        />
        <Text style={styles.description}>개인정보 이용/제공/활용 동의</Text>
        <Text style={styles.descriptionMini}>(필수)</Text>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.infoText}>{TERMS.PRIVACY_POLICY}</Text>
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.descriptionContainer}
        onPress={() => setIsCheckedTwo((prev) => !prev)}
      >
        <Image
          source={
            isCheckedTwo
              ? require('../../img/checkbox_on.png')
              : require('../../img/checkbox_off.png')
          }
          style={styles.checkIcon}
        />
        <Text style={styles.description}>이용 약관 동의</Text>
        <Text style={styles.descriptionMini}>(필수)</Text>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.infoText}>{TERMS.SERVICE_TERMS}</Text>
        </ScrollView>
      </View>

      <TouchableOpacity
        style={[styles.responseButton, !isButtonEnabled && styles.disabledButton]}
        onPress={() => {
          if (isButtonEnabled) navigation.navigate('Email');
        }}
        disabled={!isButtonEnabled}
      >
        <Text
          style={[
            styles.responseButtonText,
            !isButtonEnabled && styles.disabledButtonText,
          ]}
        >
          다음으로
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PersonalInfo;
