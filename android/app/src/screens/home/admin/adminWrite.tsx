import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../css/AdminWriteScreen';

type AdminWriteScreenProps = {
  navigation: any;
};

const AdminWrite = ({ navigation }: AdminWriteScreenProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    // 여기에 저장 로직 추가
    console.log('제목:', title);
    console.log('내용:', content);
    navigation.goBack(); // 저장 후 이전 화면으로 이동
  };

  return (
    <View style={styles.container}>
      {/* 제목 입력 */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.titleInput}
          placeholder="제목을 입력해주세요."
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* 내용 입력 */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.contentInput}
          placeholder="내용을 입력해주세요."
          placeholderTextColor="#999"
          multiline
          value={content}
          onChangeText={setContent}
        />
      </View>

      {/* 저장 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminWrite;
