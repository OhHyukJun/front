import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import axiosInstance from '../../../api/axios';
import { accessTokenState } from '../../../atom/login';
import styles from '../../css/AdminWriteScreen';
import { useRecoilValue } from 'recoil';

type AdminWriteScreenProps = {
    navigation: any;
};

const AdminWrite = ({ navigation }: AdminWriteScreenProps) => {
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');
  const accessToken = useRecoilValue(accessTokenState);

  const handleSave = async () => {
    if (!header.trim() || !body.trim()) {
      Alert.alert('입력 오류', '제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axiosInstance.post('/admin/updateNotice', {
        accessToken,
        header,
        body,
        footer: '공지사항이 등록되었습니다.',
      });

      if (response.status === 200) {
        Alert.alert('성공', '공지사항이 정상적으로 등록되었습니다.', [
          { text: '확인', onPress: () => navigation.goBack() }
        ]);
      } else {
        throw new Error('서버에서 올바른 응답을 받지 못했습니다.');
      }
    } catch (error: any) {
      console.error('공지사항 작성 오류:', error);
      const errorMessage = error.response?.data?.message || '서버와의 통신 중 문제가 발생했습니다.';
      Alert.alert('오류', errorMessage);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.titleInput}
            placeholder="제목을 입력해주세요."
            placeholderTextColor="#292929"
            value={header}
            onChangeText={setHeader}
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>

        <View style={styles.inputWrapper}>
        <TextInput
            style={styles.contentInput}
            placeholder="내용을 입력해주세요."
            placeholderTextColor="#292929"
            multiline={true}
            value={body}
            onChangeText={setBody}
            returnKeyType="done"
            blurOnSubmit={false}
            onSubmitEditing={Keyboard.dismiss}
        />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AdminWrite;
