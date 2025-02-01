import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnnouncementDetail = ({ route }: any) => {
  const { post } = route.params;

  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.date}</Text>
      <Text>공지사항 상세 내용이 여기에 표시됩니다.</Text>
    </View>
  );
};

export default AnnouncementDetail;
