import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type AnnouncementDetailProps = {
  navigation: any;
  route: any;
};

const AnnouncementDetail = ({ navigation, route }: AnnouncementDetailProps) => {
  const { post } = route.params;

  const handlePrev = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.date}</Text>
      <Text>공지사항 상세 내용이 여기에 표시됩니다.</Text>
      <TouchableOpacity onPress={handlePrev}><Text>뒤로</Text></TouchableOpacity>
    </View>
    
  );
};

export default AnnouncementDetail;
